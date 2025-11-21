import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';

// Danh sách công nghệ có sẵn
const availableTechnologies = [
  "React", "Vue.js", "Angular", "TypeScript", "JavaScript", "Node.js",
  "Express.js", "Next.js", "Nuxt.js", "Python", "Django", "Flask",
  "Java", "Spring Boot", "C#", ".NET", "ASP.NET", "PHP", "Laravel",
  "Ruby", "Ruby on Rails", "Go", "Rust", "Swift", "Kotlin",
  "MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "Firebase",
  "AWS", "Docker", "Kubernetes", "Git", "GraphQL", "REST API",
  "Tailwind CSS", "Bootstrap", "Material-UI", "SASS", "LESS",
  "Figma", "Adobe XD", "Photoshop", "Illustrator"
];

const ProjectFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { 
    categories, 
    createProject, 
    updateProject, 
    getProjectById,
    uploadImage
  } = useProjects();

  const editingProject = id ? getProjectById(parseInt(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    client: '',
    description: '',
    images: [{ image_url: '', caption: '', sort_order: 0 }],
    duration: '',
    team: '',
    technologies: [''],
    features: [''],
    results: [{ key: '', value: '' }]
  });

  const [techSearch, setTechSearch] = useState<string[]>(['']);
  const [showTechDropdown, setShowTechDropdown] = useState<boolean[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([]);

  // Reset form khi component mount hoặc editingProject thay đổi
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        category: editingProject.category,
        client: editingProject.client,
        description: editingProject.description,
        images: editingProject.images.length > 0 ? 
          editingProject.images.map((img, index) => ({ 
            ...img, 
            sort_order: index 
          })) : 
          [{ image_url: '', caption: '', sort_order: 0 }],
        duration: editingProject.duration,
        team: editingProject.team,
        technologies: editingProject.technologies.length > 0 ? editingProject.technologies : [''],
        features: editingProject.features.length > 0 ? editingProject.features : [''],
        results: editingProject.results.length > 0 ? editingProject.results : [{ key: '', value: '' }]
      });
      setTechSearch(editingProject.technologies.length > 0 ? editingProject.technologies : ['']);
      setUploadingImages(new Array(editingProject.images.length).fill(false));
    } else {
      // Reset form khi tạo mới
      setFormData({
        title: '',
        category: '',
        client: '',
        description: '',
        images: [{ image_url: '', caption: '', sort_order: 0 }],
        duration: '',
        team: '',
        technologies: [''],
        features: [''],
        results: [{ key: '', value: '' }]
      });
      setTechSearch(['']);
      setUploadingImages([false]);
    }
    setShowTechDropdown(new Array(formData.technologies.length).fill(false));
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const projectData = {
      ...formData,
      images: formData.images.filter(img => img.image_url.trim() !== ''),
      technologies: formData.technologies.filter(tech => tech.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== ''),
      results: formData.results.filter(result => result.key.trim() !== '' && result.value.trim() !== '')
    };

    try {
      let success = false;
      if (editingProject) {
        success = await updateProject(editingProject.id, projectData);
      } else {
        success = await createProject(projectData);
      }

      if (success) {
        navigate('/projects');
      } else {
        alert('Có lỗi xảy ra khi lưu dự án');
      }
    } catch (err) {
      console.error('Error submitting project:', err);
      alert('Có lỗi xảy ra khi lưu dự án');
    } finally {
      setSubmitting(false);
    }
  };

  // Sửa lại hàm handleInputChange để xử lý đúng các trường input
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Xử lý select change riêng cho category
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  // Xử lý upload ảnh
  const handleImageUpload = async (index: number, file: File) => {
    const newUploading = [...uploadingImages];
    newUploading[index] = true;
    setUploadingImages(newUploading);

    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        const newImages = [...formData.images];
        newImages[index] = { ...newImages[index], image_url: imageUrl };
        setFormData(prev => ({ ...prev, images: newImages }));
      } else {
        alert('Có lỗi xảy ra khi upload ảnh');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Có lỗi xảy ra khi upload ảnh');
    } finally {
      newUploading[index] = false;
      setUploadingImages(newUploading);
    }
  };

  // Xử lý ảnh
  const handleImageChange = (index: number, field: 'image_url' | 'caption', value: string) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    const newSortOrder = formData.images.length;
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, { image_url: '', caption: '', sort_order: newSortOrder }] 
    }));
    setUploadingImages(prev => [...prev, false]);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index).map((img, idx) => ({ ...img, sort_order: idx }))
    }));
    setUploadingImages(prev => prev.filter((_, i) => i !== index));
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...formData.images];
    [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    const updatedImages = newImages.map((img, idx) => ({ ...img, sort_order: idx }));
    setFormData(prev => ({ ...prev, images: updatedImages }));

    const newUploading = [...uploadingImages];
    [newUploading[index], newUploading[index - 1]] = [newUploading[index - 1], newUploading[index]];
    setUploadingImages(newUploading);
  };

  const moveImageDown = (index: number) => {
    if (index === formData.images.length - 1) return;
    const newImages = [...formData.images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    const updatedImages = newImages.map((img, idx) => ({ ...img, sort_order: idx }));
    setFormData(prev => ({ ...prev, images: updatedImages }));

    const newUploading = [...uploadingImages];
    [newUploading[index], newUploading[index + 1]] = [newUploading[index + 1], newUploading[index]];
    setUploadingImages(newUploading);
  };

  // Xử lý công nghệ với combobox
  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    const newTechSearch = [...techSearch];
    
    newTechSearch[index] = value;
    newTechnologies[index] = value;
    
    setTechSearch(newTechSearch);
    setFormData(prev => ({ ...prev, technologies: newTechnologies }));
  };

  const handleTechnologySelect = (index: number, tech: string) => {
    const newTechnologies = [...formData.technologies];
    const newTechSearch = [...techSearch];
    
    newTechnologies[index] = tech;
    newTechSearch[index] = tech;
    
    setFormData(prev => ({ ...prev, technologies: newTechnologies }));
    setTechSearch(newTechSearch);
    
    const newShowDropdown = [...showTechDropdown];
    newShowDropdown[index] = false;
    setShowTechDropdown(newShowDropdown);
  };

  const addTechnology = () => {
    setFormData(prev => ({ ...prev, technologies: [...prev.technologies, ''] }));
    setTechSearch(prev => [...prev, '']);
    setShowTechDropdown(prev => [...prev, false]);
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
    setTechSearch(prev => prev.filter((_, i) => i !== index));
    setShowTechDropdown(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTechDropdown = (index: number) => {
    const newShowDropdown = [...showTechDropdown];
    newShowDropdown[index] = !newShowDropdown[index];
    setShowTechDropdown(newShowDropdown);
  };

  const filteredTechnologies = (index: number) => {
    const searchTerm = techSearch[index].toLowerCase();
    return availableTechnologies.filter(tech => 
      tech.toLowerCase().includes(searchTerm)
    ).slice(0, 10);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleResultChange = (index: number, field: 'key' | 'value', value: string) => {
    const newResults = [...formData.results];
    newResults[index] = { ...newResults[index], [field]: value };
    setFormData(prev => ({ ...prev, results: newResults }));
  };

  const addResult = () => {
    setFormData(prev => ({ ...prev, results: [...prev.results, { key: '', value: '' }] }));
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                {editingProject ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {editingProject 
                  ? 'Cập nhật thông tin dự án của bạn' 
                  : 'Thêm dự án mới vào portfolio của bạn'
                }
              </p>
            </div>
            <Link 
              to="/projects" 
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
                    placeholder="Nhập tiêu đề dự án"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Danh mục *</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className="w-full p-3 border border-border rounded-md bg-background"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Khách hàng</label>
                  <input 
                    type="text" 
                    value={formData.client}
                    onChange={(e) => handleInputChange('client', e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                    placeholder="Tên khách hàng"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Thời gian</label>
                  <input 
                    type="text" 
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full p-3 border border-border rounded-md bg-background"
                    placeholder="Ví dụ: 3 tháng"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Mô tả</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-3 border border-border rounded-md bg-background"
                  rows={4}
                  placeholder="Mô tả chi tiết về dự án"
                />
              </div>
            </section>

            {/* Multiple Images Section */}
            <section>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                <h2 className="text-xl font-semibold">Hình ảnh dự án</h2>
                <button type="button" onClick={addImage} className="text-primary hover:text-primary/80 font-medium">
                  + Thêm ảnh
                </button>
              </div>
              
              <div className="space-y-6">
                {formData.images.map((image, index) => (
                  <div key={index} className="border border-border rounded-lg p-6 bg-background/50">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium">Ảnh #{index + 1}</span>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => moveImageUp(index)}
                          disabled={index === 0}
                          className={`p-2 rounded ${index === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImageDown(index)}
                          disabled={index === formData.images.length - 1}
                          className={`p-2 rounded ${index === formData.images.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          ↓
                        </button>
                        {formData.images.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-2 text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload hình ảnh *</label>
                        <div className="space-y-3">
                          <input 
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                await handleImageUpload(index, file);
                              }
                            }}
                            className="w-full p-3 border border-border rounded-md bg-background"
                            disabled={uploadingImages[index]}
                          />
                          {uploadingImages[index] && (
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                              <span>Đang upload ảnh...</span>
                            </div>
                          )}
                        </div>
                        
                        {image.image_url && !uploadingImages[index] && (
                          <div className="mt-3">
                            <img 
                              src={image.image_url} 
                              alt={`Preview ${index + 1}`} 
                              className="h-48 w-full object-cover rounded-md border"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                              }}
                            />
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {image.image_url.substring(0, 50)}...
                              </span>
                              <button
                                type="button"
                                onClick={() => handleImageChange(index, 'image_url', '')}
                                className="text-destructive hover:text-destructive/80 text-sm"
                              >
                                Xóa ảnh
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Chú thích ảnh</label>
                        <textarea 
                          value={image.caption || ''}
                          onChange={(e) => handleImageChange(index, 'caption', e.target.value)}
                          className="w-full p-3 border border-border rounded-md bg-background"
                          rows={5}
                          placeholder="Mô tả về hình ảnh này..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Grid */}
              {formData.images.some(img => img.image_url && !uploadingImages[formData.images.indexOf(img)]) && (
                <div className="mt-6 p-4 border border-border rounded-lg">
                  <label className="block text-sm font-medium mb-3">Xem trước tất cả ảnh</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {formData.images
                      .filter(img => img.image_url)
                      .map((image, index) => (
                        !uploadingImages[index] && (
                          <div key={index} className="relative group">
                            <img 
                              src={image.image_url} 
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full object-cover rounded-md border"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/150x100?text=Error';
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {index + 1}
                              </span>
                            </div>
                          </div>
                        )
                      ))
                    }
                  </div>
                </div>
              )}
            </section>

            {/* Team Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-border">Thông tin đội ngũ</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Đội ngũ tham gia</label>
                <input 
                  type="text" 
                  value={formData.team}
                  onChange={(e) => handleInputChange('team', e.target.value)}
                  className="w-full p-3 border border-border rounded-md bg-background"
                  placeholder="Ví dụ: 5 developers, 2 designers, 1 project manager"
                />
              </div>
            </section>

            {/* Technologies với Combobox */}
            <section>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                <h2 className="text-xl font-semibold">Công nghệ sử dụng</h2>
                <button type="button" onClick={addTechnology} className="text-primary hover:text-primary/80 font-medium">
                  + Thêm công nghệ
                </button>
              </div>
              {formData.technologies.map((tech, index) => (
                <div key={index} className="relative mb-3">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input 
                        type="text" 
                        value={techSearch[index]}
                        onChange={(e) => handleTechnologyChange(index, e.target.value)}
                        onFocus={() => {
                          const newShowDropdown = [...showTechDropdown];
                          newShowDropdown[index] = true;
                          setShowTechDropdown(newShowDropdown);
                        }}
                        className="w-full p-3 border border-border rounded-md bg-background pr-10"
                        placeholder="Tìm kiếm hoặc chọn công nghệ"
                      />
                      <button 
                        type="button"
                        onClick={() => toggleTechDropdown(index)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        ⌄
                      </button>
                      
                      {/* Dropdown cho công nghệ */}
                      {showTechDropdown[index] && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {filteredTechnologies(index).map((availableTech, techIndex) => (
                            <div
                              key={techIndex}
                              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleTechnologySelect(index, availableTech)}
                            >
                              {availableTech}
                            </div>
                          ))}
                          {filteredTechnologies(index).length === 0 && (
                            <div className="px-4 py-3 text-gray-500 text-center">
                              Không tìm thấy công nghệ
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {formData.technologies.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="px-4 text-destructive hover:text-destructive/80 font-medium"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* Features */}
            <section>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                <h2 className="text-xl font-semibold">Tính năng chính</h2>
                <button type="button" onClick={addFeature} className="text-primary hover:text-primary/80 font-medium">
                  + Thêm tính năng
                </button>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input 
                    type="text" 
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 p-3 border border-border rounded-md bg-background"
                    placeholder="Mô tả tính năng nổi bật của dự án"
                  />
                  {formData.features.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-4 text-destructive hover:text-destructive/80 font-medium"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </section>

            {/* Results */}
            <section>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
                <h2 className="text-xl font-semibold">Kết quả đạt được</h2>
                <button type="button" onClick={addResult} className="text-primary hover:text-primary/80 font-medium">
                  + Thêm kết quả
                </button>
              </div>
              {formData.results.map((result, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <input 
                    type="text" 
                    value={result.key}
                    onChange={(e) => handleResultChange(index, 'key', e.target.value)}
                    className="p-3 border border-border rounded-md bg-background"
                    placeholder="Chỉ số (ví dụ: Tăng hiệu suất, Giảm chi phí...)"
                  />
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={result.value}
                      onChange={(e) => handleResultChange(index, 'value', e.target.value)}
                      className="flex-1 p-3 border border-border rounded-md bg-background"
                      placeholder="Giá trị (ví dụ: 40%, 2 giờ...)"
                    />
                    {formData.results.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeResult(index)}
                        className="px-4 text-destructive hover:text-destructive/80 font-medium"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </section>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-border">
              <Link 
                to="/projects"
                className="flex-1 border border-border py-3 rounded-md hover:bg-muted transition-colors text-center"
              >
                Hủy
              </Link>
              <button 
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Đang xử lý...' : editingProject ? 'Cập nhật dự án' : 'Tạo dự án mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormPage;
