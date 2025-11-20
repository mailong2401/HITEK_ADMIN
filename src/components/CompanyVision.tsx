// components/CompanyVision.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Seo from "@/assets/about-company-seo.jpg";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
};

const slideInLeft = {
  hidden: { 
    opacity: 0, 
    x: -100 
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

const slideInRight = {
  hidden: { 
    opacity: 0, 
    x: 100 
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

const scaleUp = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const CompanyVision: React.FC = () => {
  // Sử dụng useInView để trigger animation khi element vào viewport
  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [messageRef, messageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
      {/* Phần Tầm nhìn */}
      <motion.div 
        ref={visionRef}
        initial="hidden"
        animate={visionInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="flex items-start mb-20"
      >
        <motion.div 
          variants={slideInLeft}
          className="relative flex-shrink-0 mr-8"
        >
          <div className="text-6xl font-bold text-primary pb-4 border-b-4 border-accent relative">
            01
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/50 rounded-full"></div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex-1 bg-card rounded-2xl shadow-lg border border-border p-8 hover:shadow-xl transition-all duration-300"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-primary mb-6 font-heading"
          >
            TẦM NHÌN CỦA HITEK
          </motion.h2>
          
          <motion.div 
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.p 
              variants={itemVariants}
              className="text-xl font-semibold text-accent bg-accent/10 p-4 rounded-xl border-l-4 border-accent"
            >
              Mục tiêu dài hạn của Hitek là trở thành một công cụ phần mềm hàng đầu Thế Giới
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed text-lg"
            >
              Hitek Software luôn nỗ lực không ngừng nghiên cứu công nghệ mỗi ngày 
              để đạt được mục tiêu trở thành công cụ phần mềm hàng đầu Thế Giới.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Phần Thông điệp Chủ tịch */}
      <motion.div 
        ref={messageRef}
        initial="hidden"
        animate={messageInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="flex items-start"
      >
        <motion.div 
          variants={slideInLeft}
          className="relative flex-shrink-0 mr-8"
        >
          <div className="text-6xl font-bold text-primary pb-4 border-b-4 border-accent relative">
            02
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/50 rounded-full"></div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex-1"
        >
          <motion.div 
            variants={scaleUp}
            className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
          >
            {/* Header với gradient */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={messageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-primary to-primary/90 p-8"
            >
              <h2 className="text-3xl font-bold text-white font-heading">THÔNG ĐIỆP CHỦ TỊCH</h2>
              <div className="w-20 h-1 bg-accent mt-4 rounded-full"></div>
            </motion.div>
            
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Nội dung thông điệp */}
                <motion.div 
                  ref={contentRef}
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  variants={containerVariants}
                  className="flex-1"
                >
                  <div className="space-y-6">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-accent/5 border border-accent/20 rounded-2xl p-6"
                    >
                      <p className="text-xl font-bold text-primary text-center leading-relaxed">
                        MỤC TIÊU DÀI HẠN CỦA HITEK LÀ TRỞ THÀNH MỘT CÔNG TY PHẦN MỀM HÀNG ĐẦU THẾ GIỚI
                      </p>
                    </motion.div>
                    
                    {[
                      "May mắn có cơ hội làm việc với nhiều khách hàng trên toàn thế giới ở giai đoạn khởi nghiệp, tôi đã tích lũy cho mình được rất nhiều kinh nghiệm để có thể nắm bắt nhu cầu của khách hàng ở mỗi nước, mỗi lĩnh vực mà họ hướng đến.",
                      "Tôi đang xây dựng Hitek Software lớn mạnh hơn từng ngày bằng những kinh nghiệm đó.",
                      "Hitek Software là tập hợp những năng lượng trẻ, đầy nhiệt huyết, luôn sẵn sàng tìm kiếm và thích nghi với những công nghệ mới. Do đó, chúng tôi tự tin rằng, với thế mạnh cập nhật nhanh những công nghệ mới, kiến thức mới sẽ giúp khách hàng của Hitek thỏa mãn với những nhu cầu mà họ đưa ra.",
                      "Bên cạnh nguồn nhân lực trẻ trung, chúng tôi còn sở hữu những chuyên viên tư vấn giỏi ngoại ngữ - am hiểu sâu rộng về công nghệ, điều này sẽ giúp xóa bỏ rào cản ngôn ngữ giữa Hitek và khách hàng nước ngoài. Đây cũng là công thức để Hitek Software tiếp cận và đồng hành cùng nhiều khách hàng trên toàn thế giới trong hơn 5 năm qua."
                    ].map((paragraph, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="group bg-white/50 hover:bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-md"
                      >
                        <p className="text-foreground leading-relaxed text-lg">
                          {paragraph}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Hình ảnh */}
                <motion.div 
                  ref={imageRef}
                  initial="hidden"
                  animate={imageInView ? "visible" : "hidden"}
                  variants={slideInRight}
                  className="lg:w-96 flex-shrink-0"
                >
                  <div className="sticky top-8">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-br from-accent to-primary p-2 rounded-2xl shadow-2xl h-full"
                    >
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl h-full">
                        <motion.img 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          src={Seo}
                          alt="Chủ tịch Hitek Software - Trần Anh Khôi" 
                          className="w-full h-full max-h-[500px] object-cover rounded-lg shadow-lg"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EẢnh thành viên%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Chữ ký */}
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-border text-center"
                    >
                      <div className="inline-block bg-white rounded-lg px-6 py-3 shadow-sm">
                        <p className="text-muted-foreground text-lg">Chủ tịch - Người sáng lập</p>
                        <p className="font-bold text-primary text-2xl mt-2 font-heading">Trần Anh Khôi</p>
                      </div>
                    </motion.div>
                    
                    {/* Thông tin thêm */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={imageInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-6 text-center space-y-3"
                    >
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                        <p className="text-sm text-muted-foreground italic leading-relaxed">
                          "Không ngừng đổi mới, không ngừng phát triển - 
                          Dẫn dắt đội ngũ trẻ đầy nhiệt huyết vươn tầm thế giới"
                        </p>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={imageInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div 
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              duration: 0.4, 
                              delay: 1.2 + i * 0.2,
                              type: "spring",
                              stiffness: 200
                            }}
                            className="w-3 h-3 bg-accent rounded-full animate-pulse"
                          ></motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompanyVision;
