import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectService } from '@/services/projectService';
import type { Project, Category } from '@/lib/supabase';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    navigate('/projects/new');
  };

  const handleEditProject = (project: Project) => {
    navigate(`/projects/edit/${project.id}`);
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

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from projects
  const projectCategories = [...new Set(projects.map(p => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={loadData}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Thử lại
            </button>
            <Link 
              to="/hitek-software"
              className="border border-border px-6 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Quay lại
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/hitek-software" 
                className="flex items-center space-x-2 border border-border px-4 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <span>←</span>
                <span>Quay lại</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Quản lý Dự án</h1>
                <p className="text-muted-foreground text-sm">
                  Hitek Software - Quản lý toàn bộ dự án phần mềm
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
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
        {/* Stats and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Tổng dự án</p>
                <p className="text-3xl font-bold mt-1">{projects.length}</p>
              </div>
              <div className="text-2xl">📊</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Danh mục</p>
                <p className="text-3xl font-bold mt-1">{projectCategories.length}</p>
              </div>
              <div className="text-2xl">🏷️</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đang hiển thị</p>
                <p className="text-3xl font-bold mt-1">{filteredProjects.length}</p>
              </div>
              <div className="text-2xl">👁️</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Thao tác</p>
                <button 
                  onClick={handleCreateProject}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors mt-2 w-full"
                >
                  + Dự án mới
                </button>
              </div>
              <div className="text-2xl">⚡</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tìm kiếm</label>
              <input 
                type="text"
                placeholder="Tìm theo tên, mô tả, khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-border rounded-md bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Danh mục</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-border rounded-md bg-background"
              >
                <option value="all">Tất cả danh mục</option>
                {projectCategories.map(catId => {
                  const category = categories.find(c => c.id === catId);
                  return (
                    <option key={catId} value={catId}>
                      {category ? `${category.icon} ${category.name}` : catId}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="w-full border border-border py-3 rounded-md hover:bg-muted transition-colors"
              >
                🔄 Đặt lại
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Danh sách dự án {filteredProjects.length > 0 && `(${filteredProjects.length})`}
            </h2>
            
            {filteredProjects.length === 0 && projects.length > 0 && (
              <p className="text-muted-foreground">
                Không tìm thấy dự án phù hợp với bộ lọc
              </p>
            )}
          </div>

          {filteredProjects.length === 0 && projects.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold mb-2">Chưa có dự án nào</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Bắt đầu bằng cách tạo dự án đầu tiên để quản lý thông tin dự án phần mềm của bạn
              </p>
              <button 
                onClick={handleCreateProject}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                + Tạo dự án đầu tiên
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Không tìm thấy dự án</h3>
              <p className="text-muted-foreground mb-6">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="border border-border px-6 py-3 rounded-md hover:bg-muted transition-colors"
              >
                🔄 Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => {
                const category = categories.find(cat => cat.id === project.category);
                const mainImage = project.images && project.images.length > 0 
                  ? project.images[0].image_url 
                  : null;

                return (
                  <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] group">
                    {/* Project Image */}
                    <div className="h-48 overflow-hidden relative">
                      {mainImage ? (
                        <img 
                          src={mainImage} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-4xl text-muted-foreground">
                            {category?.icon || '📁'}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        {category && (
                          <span className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                            <span>{category.icon}</span>
                            <span className="hidden sm:inline">{category.name}</span>
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {project.images?.length || 0} ảnh
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        {project.client && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">👤 Khách hàng:</span>
                            <span className="font-medium text-right">{project.client}</span>
                          </div>
                        )}
                        {project.duration && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">⏱️ Thời gian:</span>
                            <span className="font-medium">{project.duration}</span>
                          </div>
                        )}
                        {project.team && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">👥 Đội ngũ:</span>
                            <span className="font-medium text-right">{project.team}</span>
                          </div>
                        )}
                      </div>

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm mb-2 flex items-center">
                            <span className="mr-2">🛠️</span>
                            Công nghệ:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 4).map((tech, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded border"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2 border-t border-border">
                        <button 
                          onClick={() => handleEditProject(project)}
                          className="flex-1 border border-primary text-primary py-2 px-3 rounded text-sm hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center space-x-1"
                        >
                          <span>✏️</span>
                          <span>Sửa</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="flex-1 bg-destructive text-destructive-foreground py-2 px-3 rounded text-sm hover:bg-destructive/90 transition-colors flex items-center justify-center space-x-1"
                        >
                          <span>🗑️</span>
                          <span>Xóa</span>
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
              <span className="text-muted-foreground">
                {projects.length} dự án • {projectCategories.length} danh mục
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
