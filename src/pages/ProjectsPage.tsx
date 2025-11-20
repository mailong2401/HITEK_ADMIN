import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectFormModal from '@/components/ProjectFormModal';
import { projectService } from '@/services/projectService';
import type { Project, ProjectFormData, Category } from '@/lib/supabase';

const ProjectsPage = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load projects và categories từ Supabase
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [projectsData, categoriesData] = await Promise.all([
        projectService.getAllProjects(),
        projectService.getCategories()
      ]);

      setProjects(projectsData);
      
      // Nếu không có categories trong database, sử dụng mock data
      if (categoriesData.length > 0) {
        setCategories(categoriesData);
      } else {
        setCategories([
          { id: 'web', name: 'Web Development', icon: '🌐' },
          { id: 'mobile', name: 'Mobile App', icon: '📱' },
          { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
          { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
          { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
          { id: 'enterprise', name: 'Enterprise Software', icon: '🏢' }
        ]);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa dự án này?')) {
      try {
        const success = await projectService.deleteProject(id);
        if (success) {
          setProjects(projects.filter(project => project.id !== id));
        } else {
          alert('Có lỗi xảy ra khi xóa dự án');
        }
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Có lỗi xảy ra khi xóa dự án');
      }
    }
  };

  const handleSubmitProject = async (projectData: ProjectFormData) => {
    try {
      if (editingProject) {
        // Update existing project
        const success = await projectService.updateProject(editingProject.id, projectData);
        if (success) {
          await loadData(); // Reload data to get updated project
        } else {
          alert('Có lỗi xảy ra khi cập nhật dự án');
          return;
        }
      } else {
        // Create new project
        const newProjectId = await projectService.createProject(projectData);
        if (newProjectId) {
          await loadData(); // Reload data to get new project
        } else {
          alert('Có lỗi xảy ra khi tạo dự án');
          return;
        }
      }

      setShowProjectModal(false);
      setEditingProject(null);
    } catch (err) {
      console.error('Error submitting project:', err);
      alert('Có lỗi xảy ra khi lưu dự án');
    }
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Quản lý Dự án - Hitek Software</h1>
              <p className="text-muted-foreground mt-2">
                Quản lý toàn bộ dự án phần mềm với đầy đủ thông tin chi tiết
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/hitek-software" 
                className="border border-border px-4 py-2 rounded-md hover:bg-muted transition-colors"
              >
                ← Quay lại
              </Link>
              <div className="text-right">
                <p className="font-semibold">Admin User</p>
                <p className="text-sm text-muted-foreground">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Danh sách dự án ({projects.length})</h2>
            <button 
              onClick={handleCreateProject}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              + Tạo dự án mới
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold mb-2">Chưa có dự án nào</h3>
              <p className="text-muted-foreground mb-4">Hãy tạo dự án đầu tiên của bạn</p>
              <button 
                onClick={handleCreateProject}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Tạo dự án đầu tiên
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const category = categories.find(cat => cat.id === project.category);
                return (
                  <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Project Image */}
                    {project.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        {category && (
                          <span className="flex items-center text-sm text-muted-foreground">
                            {category.icon} {category.name}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        {project.client && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Khách hàng:</span>
                            <span className="font-medium">{project.client}</span>
                          </div>
                        )}
                        {project.duration && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Thời gian:</span>
                            <span className="font-medium">{project.duration}</span>
                          </div>
                        )}
                        {project.team && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Đội ngũ:</span>
                            <span className="font-medium">{project.team}</span>
                          </div>
                        )}
                      </div>

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2">Công nghệ:</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, index) => (
                              <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditProject(project)}
                          className="flex-1 border border-border py-2 px-3 rounded text-sm hover:bg-muted transition-colors"
                        >
                          Chỉnh sửa
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="flex-1 bg-destructive text-destructive-foreground py-2 px-3 rounded text-sm hover:bg-destructive/90 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground">
                © 2024 Hitek Software. Tất cả quyền được bảo lưu.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Hỗ trợ
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Tài liệu
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectFormModal
        isOpen={showProjectModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProject}
        editingProject={editingProject}
        categories={categories}
      />
    </div>
  );
};

export default ProjectsPage;
