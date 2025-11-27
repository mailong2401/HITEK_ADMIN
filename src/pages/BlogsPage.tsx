import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogs } from '@/contexts/BlogContext';

const BlogsPage = () => {
  const navigate = useNavigate();
  const { blogs, authors, deleteBlog, loading } = useBlogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleCreateBlog = () => {
    navigate('/blogs/new');
  };

  const handleEditBlog = (blog: any) => {
    navigate(`/blogs/edit/${blog.id}`);
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      try {
        await deleteBlog(id);
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Có lỗi xảy ra khi xóa bài viết');
      }
    }
  };

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || blog.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Get status counts for stats
  const publishedCount = blogs.filter(b => b.status === 'published').length;
  const draftCount = blogs.filter(b => b.status === 'draft').length;

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
                <h1 className="text-2xl font-bold">Quản lý Bài viết</h1>
                <p className="text-muted-foreground text-sm">
                  Hitek Software - Quản lý blog và nội dung
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
                <p className="text-muted-foreground text-sm">Tổng bài viết</p>
                <p className="text-3xl font-bold mt-1">{blogs.length}</p>
              </div>
              <div className="text-2xl">📝</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đã xuất bản</p>
                <p className="text-3xl font-bold mt-1">{publishedCount}</p>
              </div>
              <div className="text-2xl">📢</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Bản nháp</p>
                <p className="text-3xl font-bold mt-1">{draftCount}</p>
              </div>
              <div className="text-2xl">📄</div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Thao tác</p>
                <button 
                  onClick={handleCreateBlog}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors mt-2 w-full"
                >
                  + Bài viết mới
                </button>
              </div>
              <div className="text-2xl">✏️</div>
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
                placeholder="Tìm theo tiêu đề, mô tả, tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-border rounded-md bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Trạng thái</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 border border-border rounded-md bg-background"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
                <option value="archived">Đã lưu trữ</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                }}
                className="w-full border border-border py-3 rounded-md hover:bg-muted transition-colors"
              >
                🔄 Đặt lại
              </button>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Danh sách bài viết {filteredBlogs.length > 0 && `(${filteredBlogs.length})`}
            </h2>
            
            {filteredBlogs.length === 0 && blogs.length > 0 && (
              <p className="text-muted-foreground">
                Không tìm thấy bài viết phù hợp với bộ lọc
              </p>
            )}
          </div>

          {filteredBlogs.length === 0 && blogs.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Chưa có bài viết nào</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Bắt đầu bằng cách tạo bài viết đầu tiên để chia sẻ kiến thức và kinh nghiệm
              </p>
              <button 
                onClick={handleCreateBlog}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                + Tạo bài viết đầu tiên
              </button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Không tìm thấy bài viết</h3>
              <p className="text-muted-foreground mb-6">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                }}
                className="border border-border px-6 py-3 rounded-md hover:bg-muted transition-colors"
              >
                🔄 Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredBlogs.map((blog) => {
                const statusConfig = {
                  published: { label: '📢 Đã xuất bản', color: 'bg-green-100 text-green-800' },
                  draft: { label: '📄 Bản nháp', color: 'bg-yellow-100 text-yellow-800' },
                  archived: { label: '📦 Đã lưu trữ', color: 'bg-gray-100 text-gray-800' }
                };
                const status = statusConfig[blog.status as keyof typeof statusConfig] || statusConfig.draft;

                return (
                  <div key={blog.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] group">
                    {/* Blog Image */}
                    <div className="h-48 overflow-hidden relative">
                      {blog.cover_image_url ? (
                        <img 
                          src={blog.cover_image_url} 
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-4xl text-muted-foreground">📝</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={`${status.color} px-2 py-1 rounded text-sm font-medium`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {blog.views || 0} lượt xem
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
                        {blog.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 min-h-[4rem]">
                        {blog.excerpt || 'Chưa có mô tả...'}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">👤 Tác giả:</span>
                          <span className="font-medium text-right">
                            {blog.author?.name || 'Chưa có tác giả'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">📅 Ngày tạo:</span>
                          <span className="font-medium">{formatDate(blog.created_at)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">👁️ Lượt xem:</span>
                          <span className="font-medium">{blog.views || 0}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2 border-t border-border">
                        <button 
                          onClick={() => handleEditBlog(blog)}
                          className="flex-1 border border-primary text-primary py-2 px-3 rounded text-sm hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center space-x-1"
                        >
                          <span>✏️</span>
                          <span>Sửa</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(blog.id)}
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
                {blogs.length} bài viết • {publishedCount} đã xuất bản • {draftCount} bản nháp
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogsPage;