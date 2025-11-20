import { supabase, Project, ProjectFormData } from '@/lib/supabase'

export const projectService = {
  // Lấy tất cả projects với các bảng liên quan
  async getAllProjects(): Promise<Project[]> {
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        return []
      }

      if (!projects) return []

      // Lấy dữ liệu từ các bảng liên quan
      const projectsWithDetails = await Promise.all(
        projects.map(async (project) => {
          const [technologies, features, results] = await Promise.all([
            this.getProjectTechnologies(project.id),
            this.getProjectFeatures(project.id),
            this.getProjectResults(project.id)
          ])

          return {
            ...project,
            technologies: technologies || [],
            features: features || [],
            results: results || []
          }
        })
      )

      return projectsWithDetails
    } catch (error) {
      console.error('Error in getAllProjects:', error)
      return []
    }
  },

  // Lấy technologies của project
  async getProjectTechnologies(projectId: number): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('project_technologies')
        .select('technology')
        .eq('project_id', projectId)

      if (error) {
        console.error('Error fetching technologies:', error)
        return []
      }

      return data ? data.map(item => item.technology) : []
    } catch (error) {
      console.error('Error in getProjectTechnologies:', error)
      return []
    }
  },

  // Lấy features của project
  async getProjectFeatures(projectId: number): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('project_features')
        .select('feature')
        .eq('project_id', projectId)

      if (error) {
        console.error('Error fetching features:', error)
        return []
      }

      return data ? data.map(item => item.feature) : []
    } catch (error) {
      console.error('Error in getProjectFeatures:', error)
      return []
    }
  },

  // Lấy results của project
  async getProjectResults(projectId: number): Promise<Array<{ key: string; value: string }>> {
    try {
      const { data, error } = await supabase
        .from('project_results')
        .select('key, value')
        .eq('project_id', projectId)

      if (error) {
        console.error('Error fetching results:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getProjectResults:', error)
      return []
    }
  },

  // Tạo project mới - FIXED: Không truyền ID, chỉ để Supabase tự generate
  async createProject(projectData: ProjectFormData): Promise<number | null> {
    try {
      console.log('Creating project with data:', projectData);

      // CHỈ insert các field không bao gồm ID
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: projectData.title,
          category: projectData.category,
          client: projectData.client || null,
          description: projectData.description,
          image: projectData.image || null,
          duration: projectData.duration || null,
          team: projectData.team || null
        })
        .select()
        .single()

      if (projectError) {
        console.error('Supabase project creation error:', projectError);
        
        // Nếu là lỗi duplicate key, thử reset sequence
        if (projectError.code === '23505') {
          console.log('Duplicate key error detected, attempting to fix sequence...');
          await this.fixSequence();
          // Thử lại sau khi fix sequence
          return this.retryCreateProject(projectData);
        }
        
        throw projectError;
      }

      if (!project) {
        console.error('No project data returned');
        return null;
      }

      const projectId = project.id;
      console.log('Project created with ID:', projectId);

      // Thêm technologies
      if (projectData.technologies && projectData.technologies.length > 0) {
        const technologiesData = projectData.technologies.map(tech => ({
          project_id: projectId,
          technology: tech
        }))

        const { error: techError } = await supabase
          .from('project_technologies')
          .insert(technologiesData)

        if (techError) {
          console.error('Error adding technologies:', techError);
          // Không throw error ở đây, vì project đã được tạo
        }
      }

      // Thêm features
      if (projectData.features && projectData.features.length > 0) {
        const featuresData = projectData.features.map(feature => ({
          project_id: projectId,
          feature: feature
        }))

        const { error: featuresError } = await supabase
          .from('project_features')
          .insert(featuresData)

        if (featuresError) {
          console.error('Error adding features:', featuresError);
        }
      }

      // Thêm results
      if (projectData.results && projectData.results.length > 0) {
        const resultsData = projectData.results.map(result => ({
          project_id: projectId,
          key: result.key,
          value: result.value
        }))

        const { error: resultsError } = await supabase
          .from('project_results')
          .insert(resultsData)

        if (resultsError) {
          console.error('Error adding results:', resultsError);
        }
      }

      return projectId
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  },

  // Retry tạo project sau khi fix sequence
  async retryCreateProject(projectData: ProjectFormData): Promise<number | null> {
    try {
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: projectData.title,
          category: projectData.category,
          client: projectData.client || null,
          description: projectData.description,
          image: projectData.image || null,
          duration: projectData.duration || null,
          team: projectData.team || null
        })
        .select()
        .single()

      if (projectError) {
        console.error('Retry failed:', projectError);
        return null;
      }

      return project?.id || null;
    } catch (error) {
      console.error('Error in retryCreateProject:', error);
      return null;
    }
  },

  // Fix sequence cho bảng projects
  async fixSequence(): Promise<void> {
    try {
      // Reset sequence để tránh duplicate key
      const { error } = await supabase.rpc('fix_projects_sequence');
      
      if (error) {
        console.log('Custom function not available, using SQL...');
        // Fallback: Nếu custom function không tồn tại
        await this.resetSequenceWithSQL();
      }
    } catch (error) {
      console.error('Error fixing sequence:', error);
    }
  },

  // Reset sequence bằng SQL trực tiếp
  async resetSequenceWithSQL(): Promise<void> {
    try {
      // Lấy ID lớn nhất hiện tại
      const { data: maxData, error: maxError } = await supabase
        .from('projects')
        .select('id')
        .order('id', { ascending: false })
        .limit(1)
        .single();

      if (maxError) {
        console.error('Error getting max ID:', maxError);
        return;
      }

      const maxId = maxData?.id || 0;
      const newSequence = maxId + 1;

      console.log(`Resetting sequence to: ${newSequence}`);

      // Reset sequence - cần quyền admin trong Supabase
      // Trong thực tế, bạn cần chạy cái này trong SQL Editor:
      // SELECT setval('projects_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM projects));
      
    } catch (error) {
      console.error('Error in resetSequenceWithSQL:', error);
    }
  },

  // Cập nhật project
  async updateProject(projectId: number, projectData: ProjectFormData): Promise<boolean> {
    try {
      // Cập nhật project chính
      const { error: projectError } = await supabase
        .from('projects')
        .update({
          title: projectData.title,
          category: projectData.category,
          client: projectData.client || null,
          description: projectData.description,
          image: projectData.image || null,
          duration: projectData.duration || null,
          team: projectData.team || null
        })
        .eq('id', projectId)

      if (projectError) {
        console.error('Error updating project:', projectError);
        throw projectError;
      }

      // Xóa và thêm lại technologies
      await supabase
        .from('project_technologies')
        .delete()
        .eq('project_id', projectId)

      if (projectData.technologies && projectData.technologies.length > 0) {
        const technologiesData = projectData.technologies.map(tech => ({
          project_id: projectId,
          technology: tech
        }))

        const { error: techError } = await supabase
          .from('project_technologies')
          .insert(technologiesData)

        if (techError) throw techError;
      }

      // Xóa và thêm lại features
      await supabase
        .from('project_features')
        .delete()
        .eq('project_id', projectId)

      if (projectData.features && projectData.features.length > 0) {
        const featuresData = projectData.features.map(feature => ({
          project_id: projectId,
          feature: feature
        }))

        const { error: featuresError } = await supabase
          .from('project_features')
          .insert(featuresData)

        if (featuresError) throw featuresError;
      }

      // Xóa và thêm lại results
      await supabase
        .from('project_results')
        .delete()
        .eq('project_id', projectId)

      if (projectData.results && projectData.results.length > 0) {
        const resultsData = projectData.results.map(result => ({
          project_id: projectId,
          key: result.key,
          value: result.value
        }))

        const { error: resultsError } = await supabase
          .from('project_results')
          .insert(resultsData)

        if (resultsError) throw resultsError;
      }

      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  },

  // Xóa project
  async deleteProject(projectId: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) {
        console.error('Error deleting project:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteProject:', error);
      return false;
    }
  },

  // Lấy categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) {
        console.error('Error fetching categories:', error);
        // Return default categories nếu bảng categories chưa có data
        return [
          { id: 'web', name: 'Web Development', icon: '🌐' },
          { id: 'mobile', name: 'Mobile App', icon: '📱' },
          { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
          { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
          { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
          { id: 'enterprise', name: 'Enterprise Software', icon: '🏢' }
        ];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getCategories:', error);
      return [
        { id: 'web', name: 'Web Development', icon: '🌐' },
        { id: 'mobile', name: 'Mobile App', icon: '📱' },
        { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
        { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
        { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
        { id: 'enterprise', name: 'Enterprise Software', icon: '🏢' }
      ];
    }
  }
}
