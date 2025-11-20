const Footer = () => {
  return (
    <footer className="bg-tech-dark text-foreground py-12 border-t border-border/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-tech-blue-light"></div>
              </div>
              <span className="text-2xl font-bold">HITEK</span>
            </div>
            <p className="text-muted-foreground">
              Thúc đẩy sáng tạo, tăng tốc đổi mới, đồng hành phát triển, nâng tầm thành công
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  Về HITEK
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Dịch vụ
                </a>
              </li>
              <li>
                <a href="#technology" className="text-muted-foreground hover:text-primary transition-colors">
                  Công nghệ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>+84 123 456 789</li>
              <li>contact@hitek.com.vn</li>
              <li>Quận 7, TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 HITEK. Bản quyền thuộc về công ty HITEK.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
