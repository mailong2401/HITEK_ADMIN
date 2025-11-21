import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  caption?: string;
  sort_order: number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  images: ProjectImage[];
  duration: string;
  team: string;
  created_at: string;
  technologies: string[];
  features: string[];
  results: Array<{ key: string; value: string }>;
}

interface ProjectFormData {
  title: string;
  category: string;
  client: string;
  description: string;
  images: ProjectImage[];
  duration: string;
  team: string;
  technologies: string[];
  features: string[];
  results: Array<{ key: string; value: string }>;
}

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: ProjectFormData) => void;
  editingProject: Project | null;
  categories: Category[];
}

// Danh sách công nghệ có sẵn (có thể lấy từ database sau)
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

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingProject,
  categories
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
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

  // Reset form khi modal mở/đóng hoặc editingProject thay đổi
  useEffect(() => {
    if (isOpen) {
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
      } else {
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
      }
      setShowTechDropdown(new Array(formData.technologies.length).fill(false));
    }
  }, [isOpen, editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      images: formData.images.filter(img => img.image_url.trim() !== ''),
      technologies: formData.technologies.filter(tech => tech.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== ''),
      results: formData.results.filter(result => result.key.trim() !== '' && result.value.trim() !== '')
    };

    onSubmit(projectData);
  };

  const handleInputChange = (field: keyof Omit<ProjectFormData, 'images'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index).map((img, idx) => ({ ...img, sort_order: idx }))
    }));
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...formData.images];
    [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    // Cập nhật sort_order
    const updatedImages = newImages.map((img, idx) => ({ ...img, sort_order: idx }));
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const moveImageDown = (index: number) => {
    if (index === formData.images.length - 1) return;
    const newImages = [...formData.images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    // Cập nhật sort_order
    const updatedImages = newImages.map((img, idx) => ({ ...img, sort_order: idx }));
    setFormData(prev => ({ ...prev, images: updatedImages }));
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
    
    // Ẩn dropdown sau khi chọn
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
    ).slice(0, 10); // Giới hạn hiển thị 10 kết quả
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">
            {editingProject ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tiêu đề *</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  placeholder="Nhập tiêu đề dự án"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Danh mục *</label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
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
                  className="w-full p-2 border border-border rounded-md bg-background"
                  placeholder="Tên khách hàng"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Thời gian</label>
                <input 
                  type="text" 
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  placeholder="Ví dụ: 3 tháng"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mô tả</label>
              <textarea 
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background"
                rows={3}
                placeholder="Mô tả chi tiết về dự án"
              />
            </div>

            {/* Multiple Images Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Hình ảnh dự án</label>
                <button type="button" onClick={addImage} className="text-primary hover:text-primary/80">
                  + Thêm ảnh
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 bg-background/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">Ảnh #{index + 1}</span>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => moveImageUp(index)}
                          disabled={index === 0}
                          className={`p-1 rounded ${index === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImageDown(index)}
                          disabled={index === formData.images.length - 1}
                          className={`p-1 rounded ${index === formData.images.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          ↓
                        </button>
                        {formData.images.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1 text-destructive hover:text-destructive/80"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">URL hình ảnh *</label>
                        <input 
                          type="url" 
                          required
                          value={image.image_url}
                          onChange={(e) => handleImageChange(index, 'image_url', e.target.value)}
                          className="w-full p-2 border border-border rounded-md bg-background"
                          placeholder="https://example.com/image.jpg"
                        />
                        {image.image_url && (
                          <div className="mt-2">
                            <img 
                              src={image.image_url} 
                              alt={`Preview ${index + 1}`} 
                              className="h-32 w-full object-cover rounded-md border"
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Chú thích ảnh</label>
                        <textarea 
                          value={image.caption || ''}
                          onChange={(e) => handleImageChange(index, 'caption', e.target.value)}
                          className="w-full p-2 border border-border rounded-md bg-background"
                          rows={3}
                          placeholder="Mô tả về hình ảnh này..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview Grid */}
              {formData.images.some(img => img.image_url) && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Xem trước tất cả ảnh</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {formData.images
                      .filter(img => img.image_url)
                      .map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image.image_url} 
                            alt={`Preview ${index + 1}`}
                            className="h-20 w-full object-cover rounded-md border"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/150x100?text=Error';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Đội ngũ</label>
              <input 
                type="text" 
                value={formData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background"
                placeholder="Ví dụ: 5 developers, 2 designers"
              />
            </div>

            {/* Technologies với Combobox */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Công nghệ sử dụng</label>
                <button type="button" onClick={addTechnology} className="text-primary hover:text-primary/80">
                  + Thêm công nghệ
                </button>
              </div>
              {formData.technologies.map((tech, index) => (
                <div key={index} className="relative mb-2">
                  <div className="flex gap-2">
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
                        className="w-full p-2 border border-border rounded-md bg-background pr-10"
                        placeholder="Tìm kiếm hoặc chọn công nghệ"
                      />
                      <button 
                        type="button"
                        onClick={() => toggleTechDropdown(index)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        ⌄
                      </button>
                      
                      {/* Dropdown cho công nghệ */}
                      {showTechDropdown[index] && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {filteredTechnologies(index).map((availableTech, techIndex) => (
                            <div
                              key={techIndex}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleTechnologySelect(index, availableTech)}
                            >
                              {availableTech}
                            </div>
                          ))}
                          {filteredTechnologies(index).length === 0 && (
                            <div className="px-3 py-2 text-gray-500">
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
                        className="px-3 text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Tính năng chính</label>
                <button type="button" onClick={addFeature} className="text-primary hover:text-primary/80">
                  + Thêm tính năng
                </button>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 p-2 border border-border rounded-md bg-background"
                    placeholder="Mô tả tính năng"
                  />
                  {formData.features.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 text-destructive hover:text-destructive/80"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Results */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Kết quả đạt được</label>
                <button type="button" onClick={addResult} className="text-primary hover:text-primary/80">
                  + Thêm kết quả
                </button>
              </div>
              {formData.results.map((result, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <input 
                    type="text" 
                    value={result.key}
                    onChange={(e) => handleResultChange(index, 'key', e.target.value)}
                    className="p-2 border border-border rounded-md bg-background"
                    placeholder="Chỉ số (ví dụ: Tăng hiệu suất)"
                  />
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={result.value}
                      onChange={(e) => handleResultChange(index, 'value', e.target.value)}
                      className="flex-1 p-2 border border-border rounded-md bg-background"
                      placeholder="Giá trị (ví dụ: 40%)"
                    />
                    {formData.results.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeResult(index)}
                        className="px-3 text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 pt-4 border-t border-border">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 border border-border py-2 rounded-md hover:bg-muted transition-colors"
              >
                Hủy
              </button>
              <button 
                type="submit"
                className="flex-1 bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                {editingProject ? 'Cập nhật' : 'Tạo dự án'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectFormModal;
