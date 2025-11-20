export interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  image: string;
}

export const services: Service[] = [
  {
    id: "custom-software",
    iconName: "Code2",
    title: "Dịch vụ custom phần mềm",
    description: "Là một công ty phát triển phần mềm custom hàng đầu Việt Nam, chúng tôi đã hoàn thành xuất sắc hàng trăm dự án cho các khách hàng trên toàn thế giới.",
    fullDescription: "Thành lập từ năm 2017, Hitek luôn áp dụng các phương pháp mới một cách thuần thục. Chúng tôi cung cấp giải pháp phần mềm tùy chỉnh phù hợp với nhu cầu kinh doanh cụ thể của từng khách hàng. Với đội ngũ kỹ sư giàu kinh nghiệm, chúng tôi cam kết mang đến sản phẩm chất lượng cao, đáp ứng mọi yêu cầu khắt khe nhất.",
    features: [
      "Phát triển phần mềm theo yêu cầu riêng biệt",
      "Tích hợp hệ thống hiện có",
      "Bảo trì và nâng cấp liên tục",
      "Hỗ trợ kỹ thuật 24/7",
      "Tư vấn giải pháp tối ưu",
      "Bảo mật thông tin tuyệt đối"
    ],
    technologies: [".NET", "Java", "Python", "Node.js", "React", "Angular", "Vue.js"],
    image: "https://techvccloud.mediacdn.vn/thumb_w/650/2018/11/26/mainframe-image-shutterstock746652745-e1525253151433-15431997497441692234940.jpg"
  },
  {
    id: "long-term-software",
    iconName: "BarChart3",
    title: "Dịch vụ phát triển phần mềm dài hạn",
    description: "Phát triển phần mềm dài hạn là một quá trình xây dựng phức tạp, đòi hỏi kiến thức chuyên sâu và kinh nghiệm.",
    fullDescription: "Không phải ai cũng được đào tạo bài bản và có kiến thức chuyên sâu để tự mình xử lý các dự án phát triển phần mềm dài hạn. Chúng tôi cung cấp đội ngũ chuyên gia cam kết lâu dài, đồng hành cùng doanh nghiệp trong suốt quá trình phát triển và vận hành.",
    features: [
      "Đội ngũ chuyên gia dedicated",
      "Lộ trình phát triển rõ ràng",
      "Báo cáo tiến độ định kỳ",
      "Tối ưu chi phí dài hạn",
      "Linh hoạt thay đổi yêu cầu",
      "Đảm bảo chất lượng sản phẩm"
    ],
    technologies: ["Agile", "Scrum", "CI/CD", "Microservices", "DevOps", "Cloud Native"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop"
  },
  {
    id: "web-development",
    iconName: "Globe",
    title: "Dịch vụ phát triển web",
    description: "Gần 10 năm kinh nghiệm trong nghề, chúng tôi luôn phát triển web bằng các công nghệ nổi trội bậc nhất.",
    fullDescription: "Chúng tôi sử dụng các công nghệ front-end hiện đại (Angular, ReactJS, Jquery, HTML5, CSS3…) kết hợp với các framework backend mạnh mẽ để tạo ra các ứng dụng web chất lượng cao. Từ website giới thiệu doanh nghiệp đến các hệ thống web application phức tạp.",
    features: [
      "Thiết kế Responsive đa nền tảng",
      "Tối ưu hóa SEO",
      "Hiệu suất cao",
      "Bảo mật toàn diện",
      "Trải nghiệm người dùng tốt nhất",
      "Tích hợp thanh toán đa dạng"
    ],
    technologies: ["React", "Angular", "Vue.js", "Node.js", ".NET", "PHP", "Laravel"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&h=400&fit=crop"
  },
  {
    id: "cloud-migration",
    iconName: "Cloud",
    title: "Dịch vụ Cloud Migration",
    description: "Tận dụng đám mây và cơ sở hạ tầng để thúc đẩy tăng trưởng kinh doanh.",
    fullDescription: "Chúng tôi giúp doanh nghiệp chuyển đổi hệ thống lên cloud một cách an toàn và hiệu quả, tối ưu hóa chi phí và nâng cao khả năng mở rộng. Dịch vụ bao gồm tư vấn, lập kế hoạch, thực hiện và vận hành hệ thống trên nền tảng cloud.",
    features: [
      "Chiến lược Migration tối ưu",
      "Tối ưu hóa chi phí",
      "Bảo mật & Tuân thủ",
      "Giám sát 24/7",
      "Sao lưu và phục hồi",
      "Tự động hóa hệ thống"
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=400&fit=crop"
  },
  {
    id: "mobile-app",
    iconName: "Smartphone",
    title: "Dịch vụ phát triển mobile app",
    description: "Là một công ty phát triển ứng dụng di động hàng đầu, chúng tôi có nhiều năm kinh nghiệm trong việc tạo ra các ứng dụng sáng tạo.",
    fullDescription: "Chúng tôi phát triển ứng dụng di động cho cả iOS và Android, đảm bảo trải nghiệm người dùng tốt nhất và hiệu suất tối ưu. Từ ý tưởng đến sản phẩm hoàn chỉnh, chúng tôi đồng hành cùng bạn ở mọi bước.",
    features: [
      "Native & Cross-platform",
      "UI/UX Excellence",
      "Tối ưu App Store",
      "Bảo trì & Hỗ trợ",
      "Tích hợp API",
      "Push Notification"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Java", "Objective-C"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=400&fit=crop"
  },
  {
    id: "software-testing",
    iconName: "TestTube2",
    title: "Dịch vụ kiểm thử phần mềm",
    description: "Là một trong những công ty phát triển phần mềm hàng đầu tại Việt Nam, Hitek vượt trội trong việc kiểm thử chất lượng.",
    fullDescription: "Đội ngũ QA/QC chuyên nghiệp của chúng tôi đảm bảo chất lượng sản phẩm thông qua các quy trình kiểm thử nghiêm ngặt và tự động hóa. Chúng tôi cung cấp dịch vụ kiểm thử toàn diện từ đơn vị, tích hợp đến hệ thống.",
    features: [
      "Kiểm thử tự động",
      "Kiểm thử hiệu năng",
      "Kiểm thử bảo mật",
      "Đảm bảo chất lượng",
      "Kiểm thử tích hợp",
      "Kiểm thử hồi quy"
    ],
    technologies: ["Selenium", "Jest", "Cypress", "JMeter", "Postman", "TestRail"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=400&fit=crop"
  },
  {
    id: "outsourcing",
    iconName: "Users",
    title: "Dịch vụ outsourcing theo dự án",
    description: "Đã và đang có nhiều cơ hội thực hiện những dự án Outsourcing cho các quốc gia phát triển trên thế giới.",
    fullDescription: "Với kinh nghiệm xử lý những dự án phức tạp nhất cho các thị trường Mỹ, Canada, Hàn Quốc,... chúng tôi tự tin mang đến giải pháp outsourcing chất lượng. Đội ngũ chuyên gia của chúng tôi sẵn sàng tham gia vào mọi giai đoạn của dự án.",
    features: [
      "Đội ngũ chuyên dụng",
      "Mô hình hợp tác linh hoạt",
      "Hiệu quả chi phí",
      "Chất lượng bàn giao",
      "Quản lý dự án chuyên nghiệp",
      "Bảo mật thông tin"
    ],
    technologies: ["Project Management", "Team Building", "Quality Control", "Agile", "Scrum"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
  },
  {
    id: "offshore-center",
    iconName: "Building",
    title: "Dịch vụ xây dựng offshore center",
    description: "Được tích lũy kinh nghiệm từ các dự án xây dựng offshore center với các khách hàng từ khắp nơi trên thế giới.",
    fullDescription: "Hitek tự tin rằng chúng tôi là một trong số ít những nhà cung cấp dịch vụ xây dựng offshore center phù hợp và hiện đại nhất. Chúng tôi cung cấp giải pháp toàn diện từ thiết lập cơ sở hạ tầng đến tuyển dụng và quản lý đội ngũ.",
    features: [
      "Thiết lập hạ tầng",
      "Tuyển dụng đội ngũ",
      "Thiết lập quy trình",
      "Quan hệ đối tác lâu dài",
      "Đào tạo nhân sự",
      "Quản lý vận hành"
    ],
    technologies: ["HR Management", "Infrastructure", "Operations", "Training", "Process Optimization"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=400&fit=crop"
  },
  {
    id: "nearshore-software",
    iconName: "Server",
    title: "Dịch vụ phát triển phần mềm tại các quốc gia lân cận",
    description: "Phát triển phần mềm tại các quốc gia gần với thị trường tiêu thụ và thường có múi giờ tương tự.",
    fullDescription: "Sự khác biệt sẽ luôn nằm ở mức tối thiểu khi bạn chọn phát triển phần mềm tại các quốc gia lân cận với đội ngũ Hitek. Chúng tôi cung cấp giải pháp phát triển phần mềm hiệu quả với chi phí tối ưu và giao tiếp thuận lợi.",
    features: [
      "Múi giờ tương đồng",
      "Gần gũi văn hóa",
      "Hiệu quả chi phí",
      "Giao tiếp dễ dàng",
      "Quản lý thuận tiện",
      "Chất lượng đảm bảo"
    ],
    technologies: ["Nearshore Model", "Communication Tools", "Collaboration", "Project Management"],
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&h=400&fit=crop"
  },
  {
    id: "blockchain",
    iconName: "Lock",
    title: "Dịch vụ ứng dụng Blockchain cho doanh nghiệp",
    description: "Chúng tôi giúp bạn phát triển công nghệ Blockchain cho doanh nghiệp mọi lĩnh vực.",
    fullDescription: "Công nghệ Blockchain có thể cung cấp cho bạn những hồ sơ giao dịch dễ dàng và an toàn, minh bạch và không thể thay đổi. Chúng tôi cung cấp giải pháp Blockchain toàn diện từ tư vấn, phát triển đến triển khai và bảo trì.",
    features: [
      "Hợp đồng thông minh",
      "Ứng dụng phi tập trung",
      "Token hóa tài sản",
      "Bảo mật & Minh bạch",
      "Ví điện tử",
      "Giải pháp thanh toán"
    ],
    technologies: ["Ethereum", "Solidity", "Web3", "Smart Contracts", "Hyperledger", "IPFS"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=400&fit=crop"
  },
  {
    id: "ai-ml",
    iconName: "Cpu",
    title: "Dịch vụ AI & Machine Learning",
    description: "Ứng dụng trí tuệ nhân tạo và học máy để tối ưu hóa quy trình kinh doanh.",
    fullDescription: "Chúng tôi phát triển các giải pháp AI và Machine Learning giúp doanh nghiệp tự động hóa quy trình, tối ưu hóa vận hành và đưa ra quyết định thông minh. Từ xử lý ngôn ngữ tự nhiên đến thị giác máy tính và dự báo.",
    features: [
      "Xử lý ngôn ngữ tự nhiên",
      "Thị giác máy tính",
      "Dự báo và phân tích",
      "Tự động hóa quy trình",
      "Hệ thống đề xuất",
      "Xử lý dữ liệu lớn"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&h=400&fit=crop"
  },
  {
    id: "devops",
    iconName: "Zap",
    title: "Dịch vụ DevOps",
    description: "Tối ưu hóa quy trình phát triển và vận hành phần mềm với DevOps.",
    fullDescription: "Chúng tôi cung cấp dịch vụ DevOps toàn diện giúp doanh nghiệp tự động hóa quy trình phát triển, tích hợp và triển khai phần mềm. Tăng tốc độ phát hành sản phẩm và đảm bảo chất lượng.",
    features: [
      "CI/CD Pipeline",
      "Infrastructure as Code",
      "Containerization",
      "Monitoring & Logging",
      "Auto Scaling",
      "Security Integration"
    ],
    technologies: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "Terraform", "Ansible"],
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&h=400&fit=crop"
  }
];

export const stats = [
  { number: "200+", label: "Dự án thành công" },
  { number: "100+", label: "Khách hàng tin tưởng" },
  { number: "7+", label: "Năm kinh nghiệm" },
  { number: "99%", label: "Tỷ lệ hài lòng" }
];

export const process = [
  {
    step: "01",
    title: "Tư vấn & Phân tích",
    description: "Phân tích yêu cầu và tư vấn giải pháp tối ưu nhất cho doanh nghiệp"
  },
  {
    step: "02",
    title: "Lập kế hoạch",
    description: "Xây dựng kế hoạch chi tiết, timeline và ngân sách rõ ràng"
  },
  {
    step: "03",
    title: "Phát triển",
    description: "Triển khai phát triển với đội ngũ chuyên gia giàu kinh nghiệm"
  },
  {
    step: "04",
    title: "Bàn giao & Hỗ trợ",
    description: "Bàn giao sản phẩm và hỗ trợ kỹ thuật sau triển khai"
  }
];
