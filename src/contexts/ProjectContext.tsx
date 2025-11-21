// contexts/ProjectContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Category, ProjectFormData } from '@/lib/supabase';
import { projectService } from '@/services/projectService';

interface ProjectContextType {
  projects: Project[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  loadProjects: () => Promise<void>;
  createProject: (projectData: ProjectFormData) => Promise<boolean>;
  updateProject: (id: number, projectData: ProjectFormData) => Promise<boolean>;
  deleteProject: (id: number) => Promise<boolean>;
  getProjectById: (id: number) => Project | undefined;
  uploadImage: (file: File) => Promise<string | null>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data automatically when provider mounts
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading projects and categories...');
      
      const [projectsData, categoriesData] = await Promise.all([
        projectService.getAllProjects(),
        projectService.getCategories()
      ]);
      
      console.log('Projects loaded:', projectsData);
      console.log('Categories loaded:', categoriesData);
      
      setProjects(projectsData);
      
      // Always ensure we have categories, use fallback if empty
      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData);
      } else {
        const fallbackCategories = [
          { id: 'web', name: 'Web Development', icon: '🌐' },
          { id: 'mobile', name: 'Mobile App', icon: '📱' },
          { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
          { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
          { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
          { id: 'enterprise', name: 'Enterprise Software', icon: '🏢' }
        ];
        console.log('Using fallback categories:', fallbackCategories);
        setCategories(fallbackCategories);
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Không thể tải dữ liệu dự án. Vui lòng thử lại.');
      
      // Set fallback categories even on error
      const fallbackCategories = [
        { id: 'web', name: 'Web Development', icon: '🌐' },
        { id: 'mobile', name: 'Mobile App', icon: '📱' },
        { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
        { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
        { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
        { id: 'enterprise', name: 'Enterprise Software', icon: '🏢' }
      ];
      setCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      return await projectService.uploadImage(file);
    } catch (err) {
      console.error('Error uploading image:', err);
      return null;
    }
  };

  const createProject = async (projectData: ProjectFormData): Promise<boolean> => {
    try {
      console.log('Creating project:', projectData);
      const newProjectId = await projectService.createProject(projectData);
      if (newProjectId) {
        await loadProjects(); // Reload to get the new project
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error creating project:', err);
      return false;
    }
  };

  const updateProject = async (id: number, projectData: ProjectFormData): Promise<boolean> => {
    try {
      console.log('Updating project:', id, projectData);
      const success = await projectService.updateProject(id, projectData);
      if (success) {
        await loadProjects(); // Reload to get updated data
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating project:', err);
      return false;
    }
  };

  const deleteProject = async (id: number): Promise<boolean> => {
    try {
      console.log('Deleting project:', id);
      const success = await projectService.deleteProject(id);
      if (success) {
        setProjects(prev => prev.filter(project => project.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error deleting project:', err);
      return false;
    }
  };

  const getProjectById = (id: number): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      categories,
      loading,
      error,
      loadProjects,
      createProject,
      updateProject,
      deleteProject,
      getProjectById,
      uploadImage
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
