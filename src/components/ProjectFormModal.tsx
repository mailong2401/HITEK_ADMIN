import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
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
  image: string;
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
    image: '',
    duration: '',
    team: '',
    technologies: [''],
    features: [''],
    results: [{ key: '', value: '' }]
  });

  // Reset form when modal opens/closes or editingProject changes
  useEffect(() => {
    if (isOpen) {
      if (editingProject) {
        setFormData({
          title: editingProject.title,
          category: editingProject.category,
          client: editingProject.client,
          description: editingProject.description,
          image: editingProject.image,
          duration: editingProject.duration,
          team: editingProject.team,
          technologies: editingProject.technologies.length > 0 ? editingProject.technologies : [''],
          features: editingProject.features.length > 0 ? editingProject.features : [''],
          results: editingProject.results.length > 0 ? editingProject.results : [{ key: '', value: '' }]
        });
      } else {
        setFormData({
          title: '',
          category: '',
          client: '',
          description: '',
          image: '',
          duration: '',
          team: '',
          technologies: [''],
          features: [''],
          results: [{ key: '', value: '' }]
        });
      }
    }
  }, [isOpen, editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.filter(tech => tech.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== ''),
      results: formData.results.filter(result => result.key.trim() !== '' && result.value.trim() !== '')
    };

    onSubmit(projectData);
  };

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData(prev => ({ ...prev, technologies: newTechnologies }));
  };

  const addTechnology = () => {
    setFormData(prev => ({ ...prev, technologies: [...prev.technologies, ''] }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
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

            <div>
              <label className="block text-sm font-medium mb-2">URL hình ảnh</label>
              <input 
                type="url" 
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background"
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <img src={formData.image} alt="Preview" className="h-32 object-cover rounded-md" />
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

            {/* Technologies */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Công nghệ sử dụng</label>
                <button type="button" onClick={addTechnology} className="text-primary hover:text-primary/80">
                  + Thêm công nghệ
                </button>
              </div>
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    value={tech}
                    onChange={(e) => handleTechnologyChange(index, e.target.value)}
                    className="flex-1 p-2 border border-border rounded-md bg-background"
                    placeholder="Tên công nghệ"
                  />
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