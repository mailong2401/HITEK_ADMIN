import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBlogs } from '@/contexts/BlogContext';

// Danh sách tags có sẵn
const availableTags = [
  "React", "Vue.js", "Angular", "TypeScript", "JavaScript", "Node.js",
  "Next.js", "Nuxt.js", "Python", "Django", "Flask", "Java",
  "Spring Boot", "C#", ".NET", "PHP", "Laravel", "Ruby",
  "Ruby on Rails", "Go", "Rust", "Swift", "Kotlin",
  "Database", "API", "Microservices", "DevOps", "Cloud",
  "AWS", "Docker", "Kubernetes", "Git", "CI/CD",
  "UI/UX", "Performance", "Security", "Testing", "Best Practices",
  "Tutorial", "Guide", "Case Study", "News", "Update"
];

const BlogFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { 
    categories, 
    authors,
    createBlog, 
    updateBlog, 
    getBlogById,
    uploadImage
  } = useBlogs();

  const editingBlog = id ? getBlogById(id) : null;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    content: '',
    thumbnail_url: '',
    cover_image_url: '',
    event_date: '',
    location: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    meta_title: '',
    meta_description: '',
    author_id: ''
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        slug: editingBlog.slug,
        subtitle: editingBlog.subtitle || '',
        excerpt: editingBlog.excerpt || '',
        content: editingBlog.content,
        thumbnail_url: editingBlog.thumbnail_url || '',
        cover_image_url: editingBlog.cover_image_url || '',
        event_date: editingBlog.event_date || '',
        location: editingBlog.location || '',
        status: editingBlog.status,
        meta_title: editingBlog.meta_title || '',
        meta_description: editingBlog.meta_description || '',
        author_id: editingBlog.author_id || ''
      });
    }
  }, [editingBlog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      console.log('🔄 Submitting blog form...', formData);
      
      let success = false;
      
      // Chuẩn hóa data trước khi gửi - chuyển empty strings thành null
      const blogData = {
        ...formData,
        subtitle: formData.subtitle || null,
        excerpt: formData.excerpt || null,
        thumbnail_url: formData.thumbnail_url || null,
        cover_image_url: formData.cover_image_url || null,
        event_date: formData.event_date || null,
        location: formData.location || null,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        author_id: formData.author_id || null,
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      };

      console.log('📦 Blog data to submit:', blogData);

      if (editingBlog) {
        success = await updateBlog(editingBlog.id, blogData);
      } else {
        success = await createBlog(blogData);
      }

      if (success) {
        console.log('✅ Blog saved successfully');
        navigate('/blogs');
      } else {
        console.error('❌ Failed to save blog');
        alert('Có lỗi xảy ra khi lưu bài viết. Kiểm tra console để biết chi tiết.');
      }
    } catch (err) {
      console.error('❌ Error submitting blog:', err);
      alert('Có lỗi xảy ra khi lưu bài viết');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Tự động generate slug từ title
    if (field === 'title' && !editingBlog) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    setUploadingThumbnail(true);
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setFormData(prev => ({ ...prev, thumbnail_url: imageUrl }));
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('Có lỗi xảy ra khi upload ảnh thumbnail');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleCoverUpload = async (file: File) => {
    setUploadingCover(true);
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setFormData(prev => ({ ...prev, cover_image_url: imageUrl }));
      }
    } catch (error) {
      console.error('Error uploading cover:', error);
      alert('Có lỗi xảy ra khi upload ảnh cover');
    } finally {
      setUploadingCover(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                {editingBlog ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {editingBlog 
                  ? 'Cập nhật thông tin bài viết của bạn' 
                  : 'Thêm bài viết mới vào blog của bạn'
                }
              </p>
            </div>
            <Link 
              to="/blogs" 
              className="border border-border px-6 py-2 rounded-md hover:bg-muted transition-colors"
            >
              ← Quay lại
            </Link>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-card border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Tiêu đề *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                    placeholder="Nhập tiêu đề bài viết"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                    placeholder="URL-friendly slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tác giả</label>
                  <select 
                    value={formData.author_id}
                    onChange={(e) => handleInputChange('author_id', e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                  >
                    <option value="">Chọn tác giả</option>
                    {authors.map(author => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Trạng thái</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value as any)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="published">Đã xuất bản</option>
                    <option value="archived">Đã lưu trữ</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input 
                  type="text" 
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-border rounded-md bg-background"
                  placeholder="Tiêu đề phụ"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Mô tả ngắn</label>
                <textarea 
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  className="w-full p-3 border border-border rounded-md bg-background"
                  rows={3}
                  placeholder="Mô tả ngắn về bài viết"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Ngày sự kiện</label>
                <input 
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => handleInputChange('event_date', e.target.value)}
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Địa điểm</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full p-3 border border-border rounded-md bg-background"
                  placeholder="Địa điểm tổ chức sự kiện"
                />
              </div>
            </section>

            {/* Images */}
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                Hình ảnh
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thumbnail Image */}
                <div>
                  <label className="block text-sm font-medium mb-2">Ảnh thumbnail *</label>
                  <div className="space-y-3">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleThumbnailUpload(file);
                        }
                      }}
                      className="w-full p-3 border border-border rounded-md bg-background"
                      disabled={uploadingThumbnail}
                    />
                    {uploadingThumbnail && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span>Đang upload ảnh thumbnail...</span>
                      </div>
                    )}
                  </div>
                  
                  {formData.thumbnail_url && !uploadingThumbnail && (
                    <div className="mt-3">
                      <img 
                        src={formData.thumbnail_url} 
                        alt="Thumbnail preview" 
                        className="h-48 w-full object-cover rounded-md border"
                        onError={(e) => {
                          console.error('Error loading thumbnail image');
                          e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                        }}
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground truncate">
                          {formData.thumbnail_url.substring(0, 50)}...
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, thumbnail_url: '' }))}
                          className="text-destructive hover:text-destructive/80 text-sm"
                        >
                          Xóa ảnh
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium mb-2">Ảnh cover</label>
                  <div className="space-y-3">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleCoverUpload(file);
                        }
                      }}
                      className="w-full p-3 border border-border rounded-md bg-background"
                      disabled={uploadingCover}
                    />
                    {uploadingCover && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span>Đang upload ảnh cover...</span>
                      </div>
                    )}
                  </div>
                  
                  {formData.cover_image_url && !uploadingCover && (
                    <div className="mt-3">
                      <img 
                        src={formData.cover_image_url} 
                        alt="Cover preview" 
                        className="h-48 w-full object-cover rounded-md border"
                        onError={(e) => {
                          console.error('Error loading cover image');
                          e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Error';
                        }}
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground truncate">
                          {formData.cover_image_url.substring(0, 50)}...
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, cover_image_url: '' }))}
                          className="text-destructive hover:text-destructive/80 text-sm"
                        >
                          Xóa ảnh
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Content */}
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                Nội dung bài viết
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2">Nội dung *</label>
                <textarea 
                  required
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className="w-full p-3 border border-border rounded-md bg-background"
                  rows={12}
                  placeholder="Nhập nội dung bài viết của bạn..."
                />
              </div>
            </section>

            {/* SEO Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-border">
                Thông tin SEO
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <input 
                    type="text" 
                    value={formData.meta_title}
                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                    placeholder="Tiêu đề SEO (tối đa 60 ký tự)"
                    maxLength={60}
                  />
                  <div className="text-xs text-muted-foreground mt-1 text-right">
                    {formData.meta_title.length}/60 ký tự
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <textarea 
                    value={formData.meta_description}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                    rows={3}
                    placeholder="Mô tả SEO (tối đa 160 ký tự)"
                    maxLength={160}
                  />
                  <div className="text-xs text-muted-foreground mt-1 text-right">
                    {formData.meta_description.length}/160 ký tự
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-border">
              <Link 
                to="/blogs"
                className="flex-1 border border-border py-3 rounded-md hover:bg-muted transition-colors text-center"
              >
                Hủy
              </Link>
              <button 
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Đang xử lý...' : editingBlog ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogFormPage;