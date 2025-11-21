// services/projectService.ts
import { supabase } from '@/lib/supabase';
import { Project, Category, ProjectFormData } from '@/lib/supabase';

export const projectService = {
  getAllProjects: async (): Promise<Project[]> => {
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_technologies(technology),
          project_features(feature),
          project_results(key, value),
          project_images(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return [];
      }

      // Transform data to match Project interface
      return projects.map(project => ({
        id: project.id,
        title: project.title,
        category: project.category,
        client: project.client,
        description: project.description,
        duration: project.duration,
        team: project.team,
        created_at: project.created_at,
        technologies: project.project_technologies?.map((t: any) => t.technology) || [],
        features: project.project_features?.map((f: any) => f.feature) || [],
        results: project.project_results?.map((r: any) => ({ key: r.key, value: r.value })) || [],
        images: project.project_images?.map((img: any) => ({
          id: img.id,
          project_id: img.project_id,
          image_url: img.image_url,
          caption: img.caption,
          sort_order: img.sort_order
        })) || []
      }));
    } catch (error) {
      console.error('Error in getAllProjects:', error);
      return [];
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }

      console.log('Categories from database:', data);
      return data || [];
    } catch (error) {
      console.error('Error in getCategories:', error);
      return [];
    }
  },

  uploadImage: async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `project-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images') // Make sure this bucket exists in your Supabase storage
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      return null;
    }
  },

  createProject: async (projectData: ProjectFormData): Promise<number | null> => {
    try {
      // First, create the main project
      const { data: project, error } = await supabase
        .from('projects')
        .insert({
          title: projectData.title,
          category: projectData.category,
          client: projectData.client,
          description: projectData.description,
          duration: projectData.duration,
          team: projectData.team
        })
        .select()
        .single();

      if (error) throw error;

      const projectId = project.id;

      // Insert technologies
      if (projectData.technologies.length > 0) {
        const technologies = projectData.technologies.map(tech => ({
          project_id: projectId,
          technology: tech
        }));
        await supabase.from('project_technologies').insert(technologies);
      }

      // Insert features
      if (projectData.features.length > 0) {
        const features = projectData.features.map(feature => ({
          project_id: projectId,
          feature: feature
        }));
        await supabase.from('project_features').insert(features);
      }

      // Insert results
      if (projectData.results.length > 0) {
        const results = projectData.results.map(result => ({
          project_id: projectId,
          key: result.key,
          value: result.value
        }));
        await supabase.from('project_results').insert(results);
      }

      // Insert images
      if (projectData.images.length > 0) {
        const images = projectData.images.map(image => ({
          project_id: projectId,
          image_url: image.image_url,
          caption: image.caption,
          sort_order: image.sort_order
        }));
        await supabase.from('project_images').insert(images);
      }

      return projectId;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  },

  updateProject: async (id: number, projectData: ProjectFormData): Promise<boolean> => {
    try {
      // Update main project
      const { error: projectError } = await supabase
        .from('projects')
        .update({
          title: projectData.title,
          category: projectData.category,
          client: projectData.client,
          description: projectData.description,
          duration: projectData.duration,
          team: projectData.team
        })
        .eq('id', id);

      if (projectError) throw projectError;

      // Delete existing related data
      await Promise.all([
        supabase.from('project_technologies').delete().eq('project_id', id),
        supabase.from('project_features').delete().eq('project_id', id),
        supabase.from('project_results').delete().eq('project_id', id),
        supabase.from('project_images').delete().eq('project_id', id)
      ]);

      // Insert updated data
      if (projectData.technologies.length > 0) {
        const technologies = projectData.technologies.map(tech => ({
          project_id: id,
          technology: tech
        }));
        await supabase.from('project_technologies').insert(technologies);
      }

      if (projectData.features.length > 0) {
        const features = projectData.features.map(feature => ({
          project_id: id,
          feature: feature
        }));
        await supabase.from('project_features').insert(features);
      }

      if (projectData.results.length > 0) {
        const results = projectData.results.map(result => ({
          project_id: id,
          key: result.key,
          value: result.value
        }));
        await supabase.from('project_results').insert(results);
      }

      if (projectData.images.length > 0) {
        const images = projectData.images.map(image => ({
          project_id: id,
          image_url: image.image_url,
          caption: image.caption,
          sort_order: image.sort_order
        }));
        await supabase.from('project_images').insert(images);
      }

      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  },

  deleteProject: async (id: number): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }
};
