import { Code, Database, Shield, Globe, Smartphone, Cloud, Users, Cpu, GamepadIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  category: string;
  client: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  results: {
    [key: string]: string;
  };
  duration: string;
  team: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Korea Construction Standards Center",
    category: "enterprise",
    client: "Trung tâm Tiêu chuẩn Xây dựng Hàn Quốc",
    description: "Hệ thống cấp quốc gia tiêu chuẩn hóa, quản lý và tối ưu hóa các tiêu chuẩn xây dựng của Hàn Quốc. Nền tảng cung cấp định dạng tài liệu thống nhất với kiểm tra tự động, hệ thống tìm kiếm tích hợp và công cụ so sánh nâng cao.",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Java Spring", "React", "Oracle DB", "Elasticsearch", "Redis"],
    features: ["Định dạng tài liệu thống nhất", "Kiểm tra tự động", "Tìm kiếm tích hợp", "Theo dõi lịch sử chỉnh sửa", "Tham chiếu chéo"],
    results: {
      efficiency: "Tăng 50% hiệu suất tra cứu",
      standardization: "Chuẩn hóa 1000+ tài liệu",
      compliance: "Đáp ứng 100% tiêu chuẩn"
    },
    duration: "9 tháng",
    team: "15 developers"
  },
  {
    id: 2,
    title: "Hệ thống Digital Signage",
    category: "web-app",
    client: "Đối tác Truyền thông Hàn Quốc",
    description: "Hệ thống biển quảng cáo kỹ thuật số dựa trên nền tảng Android, cho phép quản lý và vận hành nội dung dễ dàng thông qua đăng ký subscription và tạo danh sách phát trên nền tảng web.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Android", "Node.js", "MongoDB", "WebRTC", "AWS"],
    features: ["Nền tảng Android", "Quản lý subscription", "Tạo danh sách phát web", "Set-top box integration", "Content scheduling"],
    results: {
      deployment: "Triển khai 500+ màn hình",
      engagement: "Tăng 45% tương tác",
      management: "Giảm 70% thời gian quản lý"
    },
    duration: "6 tháng",
    team: "10 developers"
  },
  {
    id: 3,
    title: "Ứng dụng Học tiếng Anh AI",
    category: "education",
    client: "Tổ chức Giáo dục Hàn Quốc",
    description: "Nền tảng giáo dục giúp học sinh nâng cao kỹ năng tiếng Anh thông qua học từ vựng, bài kiểm tra đọc hiểu và sửa lỗi viết bằng AI. Kết hợp công nghệ AI với gamification để tạo trải nghiệm học tập thú vị.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Python", "React Native", "TensorFlow", "MongoDB", "Firebase"],
    features: ["Học từ vựng tương tác", "Kiểm tra đọc hiểu", "Sửa lỗi viết AI", "Flashcard tương tác", "Báo cáo tiến độ"],
    results: {
      students: "50,000+ học sinh",
      improvement: "Cải thiện 40% điểm số",
      satisfaction: "95% hài lòng"
    },
    duration: "8 tháng",
    team: "12 developers"
  },
  {
    id: 4,
    title: "Trung tâm Đổi mới Dữ liệu Lớn Busan",
    category: "enterprise",
    client: "Thành phố Busan",
    description: "Nền tảng hỗ trợ đổi mới số dựa trên dữ liệu, tích hợp nhiều thành phần kỹ thuật để cung cấp dịch vụ hiệu quả và thúc đẩy kết nối, chia sẻ dữ liệu giữa khu vực công và tư.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Hadoop", "Spark", "Kafka", "React", "PostgreSQL"],
    features: ["Platform integration", "Data sharing", "Public-private connectivity", "Real-time analytics", "Multi-tenant architecture"],
    results: {
      users: "100,000+ người dùng",
      datasets: "500+ bộ dữ liệu",
      connections: "Kết nối 50+ tổ chức"
    },
    duration: "12 tháng",
    team: "20 developers"
  },
  {
    id: 5,
    title: "Lalatok - Mạng xã hội Toàn cầu",
    category: "mobile-app",
    client: "Công ty Khởi nghiệp Hàn Quốc",
    description: "Ứng dụng mạng xã hội kết nối bạn bè trên toàn thế giới với tính năng chia sẻ vị trí, đăng bài viết hình ảnh, poll và tham gia cộng đồng.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Flutter", "Node.js", "MongoDB", "WebSocket", "Google Maps API"],
    features: ["Chia sẻ vị trí", "Đăng bài đa phương tiện", "Tạo poll", "Nhóm cộng đồng", "Trang trí profile"],
    results: {
      users: "200,000+ người dùng",
      global: "Triển khai toàn cầu",
      engagement: "1M+ tương tác/ngày"
    },
    duration: "7 tháng",
    team: "14 developers"
  },
  {
    id: 6,
    title: "Myco - Nền tảng Tư vấn Chuyên gia",
    category: "healthcare",
    client: "Công ty Công nghệ Y tế",
    description: "Nền tảng kết nối người dùng với chuyên gia nhiều lĩnh vực như bác sĩ, tư vấn doanh nghiệp, chuyên gia tiếp thị để tham khảo ý kiến chuyên môn.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Vue.js", "Laravel", "MySQL", "WebRTC", "Stripe"],
    features: ["Kết nối chuyên gia", "Video call có phí", "Tư vấn đa lĩnh vực", "Hệ thống thanh toán", "Lịch hẹn thông minh"],
    results: {
      experts: "1,000+ chuyên gia",
      consultations: "10,000+ cuộc tư vấn",
      satisfaction: "94% hài lòng"
    },
    duration: "6 tháng",
    team: "11 developers"
  },
  {
    id: 7,
    title: "Unipet - Game Blockchain & AI",
    category: "fintech",
    client: "Công ty Game Blockchain",
    description: "Trò chơi 3D cách mạng lấy cảm hứng từ Pokémon Go, tích hợp công nghệ blockchain và AI sáng tạo, cho phép người chơi thu thập NFT độc quyền có thể sở hữu, giao dịch và kiếm tiền.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Unity", "Blockchain", "Solidity", "Node.js", "AWS"],
    features: ["Game 3D tương tác", "NFT độc quyền", "Công nghệ blockchain", "AI sáng tạo", "Play-to-earn"],
    results: {
      players: "500,000+ người chơi",
      transactions: "1M+ giao dịch NFT",
      innovation: "Giải pháp blockchain tiên phong"
    },
    duration: "10 tháng",
    team: "18 developers"
  }
];

export const categories = [
  { id: "all", name: "Tất cả dự án", icon: Code },
  { id: "enterprise", name: "Doanh nghiệp", icon: Database },
  { id: "fintech", name: "Fintech", icon: Shield },
  { id: "web-app", name: "Web Application", icon: Globe },
  { id: "healthcare", name: "Y tế", icon: Smartphone },
  { id: "mobile-app", name: "Mobile App", icon: Users },
  { id: "education", name: "Giáo dục", icon: Code },
  { id: "gaming", name: "Gaming & Blockchain", icon: GamepadIcon }
];