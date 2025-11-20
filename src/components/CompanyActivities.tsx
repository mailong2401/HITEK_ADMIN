// components/CompanyActivities.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import các hình ảnh - thay thế bằng đường dẫn thực tế của bạn
import SoftwareDevelopmentImg from "@/assets/activities/activitie_1.jpg";
import TechConsultingImg from "@/assets/activities/activitie_2.jpg";
import MaintenanceSupportImg from "@/assets/activities/activitie_3.jpg";
import TrainingImg from "@/assets/activities/activitie_4.jpg";
import InternationalCooperationImg from "@/assets/activities/activitie_5.jpg";
import ResearchInnovationImg from "@/assets/activities/activitie_6.jpg";

const CompanyActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      title: "Phát Triển Phần Mềm",
      description: "Nghiên cứu và phát triển các giải pháp phần mềm tùy chỉnh đáp ứng nhu cầu đa dạng của khách hàng trong nước và quốc tế.",
      image: SoftwareDevelopmentImg,
      color: "accent"
    },
    {
      id: 2,
      title: "Tư Vấn Công Nghệ",
      description: "Cung cấp dịch vụ tư vấn công nghệ chuyên sâu, giúp khách hàng tối ưu hóa quy trình và nâng cao hiệu suất.",
      image: TechConsultingImg,
      color: "primary"
    },
    {
      id: 3,
      title: "Bảo Trì & Hỗ Trợ",
      description: "Dịch vụ bảo trì, nâng cấp và hỗ trợ kỹ thuật 24/7 đảm bảo hệ thống vận hành ổn định và liên tục.",
      image: MaintenanceSupportImg,
      color: "accent"
    },
    {
      id: 4,
      title: "Đào Tạo Nhân Sự",
      description: "Đào tạo và phát triển nguồn nhân lực chất lượng cao, cập nhật công nghệ mới và kỹ năng chuyên môn.",
      image: TrainingImg,
      color: "primary"
    },
    {
      id: 5,
      title: "Hợp Tác Quốc Tế",
      description: "Mở rộng hợp tác với các đối tác quốc tế, tiếp cận công nghệ tiên tiến và mở rộng thị trường toàn cầu.",
      image: InternationalCooperationImg,
      color: "accent"
    },
    {
      id: 6,
      title: "Nghiên Cứu & Đổi Mới",
      description: "Không ngừng nghiên cứu và đổi mới công nghệ, phát triển các sản phẩm sáng tạo đón đầu xu hướng.",
      image: ResearchInnovationImg,
      color: "primary"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const slideInLeft = {
    hidden: { 
      opacity: 0, 
      x: -80 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0.7
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const getColorClass = (color: string) => {
    return color === 'accent' ? 'bg-accent' : 'bg-primary';
  };

  const getHoverColorClass = (color: string) => {
    return color === 'accent' ? 'hover:bg-accent/5' : 'hover:bg-primary/5';
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  });

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 py-8 pt-20"
    >
      <div className="flex items-start">
        {/* Số phần với gạch chân đẹp */}
        <motion.div 
          variants={slideInLeft}
          className="relative flex-shrink-0 mr-8"
        >
          <div className="text-6xl font-bold text-primary pb-4 border-b-4 border-accent relative">
            06
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/50 rounded-full"></div>
          </div>
        </motion.div>
        
        {/* Nội dung chính */}
        <motion.div 
          variants={itemVariants}
          className="flex-1"
        >
          {/* Tiêu đề */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-primary mb-3 font-heading">CÁC HOẠT ĐỘNG CỦA HITEK SOFTWARE</h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground bg-primary/5 inline-block px-4 py-2 rounded-lg"
            >
              KHÁM PHÁ HOẠT ĐỘNG NỔI BẬT
            </motion.p>
          </motion.div>

          {/* Lưới hiển thị các hoạt động với ảnh */}
          <motion.div 
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {activities.map((activity, index) => (
              <motion.div 
                key={activity.id}
                variants={cardVariants}
                custom={index}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${getHoverColorClass(activity.color)}`}
              >
                {/* Ảnh hoạt động */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    variants={imageVariants}
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback nếu ảnh không tồn tại
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3E${activity.title}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  {/* Overlay gradient */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300"
                  />
                  {/* Icon trên ảnh */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={gridInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: index * 0.1 + 0.5 
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 ${getColorClass(activity.color)} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                      className="text-white font-bold text-sm"
                    >
                      {activity.id}
                    </motion.span>
                  </motion.div>
                </div>

                {/* Nội dung text */}
                <div className="p-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={gridInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="flex items-center mb-3"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={gridInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        delay: index * 0.1 + 0.4 
                      }}
                      className={`w-3 h-3 ${getColorClass(activity.color)} rounded-full mr-3`}
                    ></motion.div>
                    <h3 className="text-xl font-bold text-primary font-heading">{activity.title}</h3>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="text-foreground leading-relaxed text-sm"
                  >
                    {activity.description}
                  </motion.p>
                  
                  {/* Button xem thêm */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                    className="mt-4 flex justify-end"
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`text-xs font-semibold ${activity.color === 'accent' ? 'text-accent hover:text-accent/80' : 'text-primary hover:text-primary/80'} transition-colors duration-200 flex items-center space-x-1`}
                    >
                      <span>Xem chi tiết</span>
                      <motion.svg 
                        className="w-3 h-3"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center space-x-4 bg-primary/5 rounded-full px-8 py-4">
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 1.8 + i * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`w-3 h-3 ${i % 2 === 0 ? 'bg-accent' : 'bg-primary'} rounded-full`}
                />
              ))}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="text-muted-foreground text-sm"
              >
                Đa dạng hoạt động - Chất lượng vượt trội
              </motion.span>
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 2.4 + i * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`w-3 h-3 ${i % 2 === 0 ? 'bg-primary' : 'bg-accent'} rounded-full`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanyActivities;
