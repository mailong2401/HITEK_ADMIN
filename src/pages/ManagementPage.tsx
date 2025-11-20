import { Link } from 'react-router-dom';

const ManagementPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Hitek Software Management</h1>
              <p className="text-muted-foreground mt-2">
                Hệ thống quản lý toàn diện cho dịch vụ phát triển phần mềm
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="border border-border px-4 py-2 rounded-md hover:bg-muted transition-colors"
              >
                ← Trang chủ
              </Link>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Chào mừng đến với Hệ thống Quản lý</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lựa chọn module bạn muốn quản lý
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Projects Card */}
          <Link 
            to="/projects" 
            className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-2xl font-semibold mb-4">Quản lý Dự án</h3>
              <p className="text-muted-foreground mb-6">
                Quản lý toàn bộ dự án phần mềm với đầy đủ thông tin chi tiết, 
                công nghệ sử dụng, tính năng và kết quả đạt được.
              </p>
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-md inline-block hover:bg-primary/90 transition-colors">
                Truy cập Module
              </div>
            </div>
          </Link>

          {/* Chatbot Card */}
          <Link 
            to="/chatbot" 
            className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="text-2xl font-semibold mb-4">Quản lý Chatbot</h3>
              <p className="text-muted-foreground mb-6">
                Quản lý và cấu hình hệ thống chatbot thông minh, 
                theo dõi hiệu suất và tương tác với khách hàng.
              </p>
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-md inline-block hover:bg-primary/90 transition-colors">
                Truy cập Module
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="bg-card border border-border rounded-lg p-8 mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Tổng quan Hệ thống</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Dự án</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3</div>
              <div className="text-muted-foreground">Chatbot</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
              <div className="text-muted-foreground">Module chính</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-muted-foreground">Hiệu suất</div>
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
    </div>
  );
};

export default ManagementPage;
