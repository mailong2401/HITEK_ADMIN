
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ChatbotPage = () => {
  const [chatbots, setChatbots] = useState([
    {
      id: 1,
      name: "CSKH - Hitek Software",
      status: "active",
      conversations: 1247,
      satisfaction: 92,
      description: "Chatbot hỗ trợ khách hàng và tư vấn dịch vụ"
    },
    {
      id: 2,
      name: "Tư vấn dự án",
      status: "active",
      conversations: 893,
      satisfaction: 88,
      description: "Chatbot tư vấn và giới thiệu dự án phần mềm"
    },
    {
      id: 3,
      name: "Hỗ trợ kỹ thuật",
      status: "inactive",
      conversations: 456,
      satisfaction: 85,
      description: "Chatbot hỗ trợ kỹ thuật và xử lý sự cố"
    }
  ]);

  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [editingChatbot, setEditingChatbot] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  const handleCreateChatbot = () => {
    setEditingChatbot(null);
    setFormData({
      name: '',
      description: '',
      status: 'active'
    });
    setShowChatbotModal(true);
  };

  const handleEditChatbot = (chatbot: any) => {
    setEditingChatbot(chatbot);
    setFormData({
      name: chatbot.name,
      description: chatbot.description,
      status: chatbot.status
    });
    setShowChatbotModal(true);
  };

  const handleSubmitChatbot = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingChatbot) {
      setChatbots(chatbots.map(cb => 
        cb.id === editingChatbot.id 
          ? { ...cb, ...formData }
          : cb
      ));
    } else {
      const newChatbot = {
        ...formData,
        id: Date.now(),
        conversations: 0,
        satisfaction: 0
      };
      setChatbots([...chatbots, newChatbot]);
    }
    
    setShowChatbotModal(false);
    setEditingChatbot(null);
  };

  const ChatbotModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">
            {editingChatbot ? 'Chỉnh sửa Chatbot' : 'Tạo Chatbot mới'}
          </h3>
          
          <form onSubmit={handleSubmitChatbot} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tên Chatbot *</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-border rounded-md bg-background"
                placeholder="Nhập tên chatbot"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mô tả</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 border border-border rounded-md bg-background"
                rows={3}
                placeholder="Mô tả chức năng của chatbot"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trạng thái</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Ngừng hoạt động</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-border">
              <button 
                type="button"
                onClick={() => {
                  setShowChatbotModal(false);
                  setEditingChatbot(null);
                }}
                className="flex-1 border border-border py-2 rounded-md hover:bg-muted transition-colors"
              >
                Hủy
              </button>
              <button 
                type="submit"
                className="flex-1 bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                {editingChatbot ? 'Cập nhật' : 'Tạo Chatbot'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Quản lý Chatbot - Hitek Software</h1>
              <p className="text-muted-foreground mt-2">
                Quản lý và cấu hình hệ thống chatbot thông minh
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
            <h2 className="text-2xl font-bold">Danh sách Chatbot ({chatbots.length})</h2>
            <button 
              onClick={handleCreateChatbot}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              + Tạo Chatbot mới
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chatbots.map((chatbot) => (
              <div key={chatbot.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{chatbot.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    chatbot.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {chatbot.status === 'active' ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{chatbot.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cuộc hội thoại:</span>
                    <span className="font-semibold">{chatbot.conversations.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Độ hài lòng:</span>
                    <span className="font-semibold text-green-600">{chatbot.satisfaction}%</span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-6">
                  <button 
                    onClick={() => handleEditChatbot(chatbot)}
                    className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded text-sm hover:bg-primary/90 transition-colors"
                  >
                    {chatbot.status === 'active' ? 'Quản lý' : 'Kích hoạt'}
                  </button>
                  <button className="flex-1 border border-border py-2 px-3 rounded text-sm hover:bg-muted transition-colors">
                    Cấu hình
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-6">Thống kê Chatbot</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2,598</div>
                <div className="text-muted-foreground">Tổng hội thoại</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                <div className="text-muted-foreground">Độ hài lòng TB</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                <div className="text-muted-foreground">Chatbot hoạt động</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
                <div className="text-muted-foreground">Tự động hóa</div>
              </div>
            </div>
          </div>
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

      {/* Chatbot Modal */}
      {showChatbotModal && <ChatbotModal />}
    </div>
  );
};

export default ChatbotPage;