// components/CompanyInformation.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
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

const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6
    }
  }
};

const gridItem = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const CompanyInformation: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [leadersRef, leadersInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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
            03
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
            <h2 className="text-3xl font-bold text-primary mb-3 font-heading">THÔNG TIN CÔNG TY</h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground bg-primary/5 inline-block px-4 py-2 rounded-lg"
            >
              XEM HỒ SƠ CÔNG TY
            </motion.p>
          </motion.div>

          {/* Bảng thông tin được thiết kế lại */}
          <motion.div 
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            variants={staggerGrid}
            className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-8 hover:shadow-xl transition-all duration-300"
          >
            {/* Hàng 1 */}
            <motion.div 
              variants={gridItem}
              className="grid grid-cols-4 border-b border-border"
            >
              <div className="p-6 font-semibold text-primary bg-primary/5 border-r border-border flex items-center">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={gridInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="w-2 h-2 bg-accent rounded-full"
                  ></motion.div>
                  <span>Tên công ty</span>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, backgroundColor: "rgba(255,255,255,0)" }}
                animate={gridInView ? { opacity: 1, backgroundColor: "rgba(255,255,255,0.5)" } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 text-foreground border-r border-border bg-card/50 flex items-center font-medium"
              >
                HITEK SOFTWARE
              </motion.div>
              <div className="p-6 font-semibold text-primary bg-primary/5 border-r border-border flex items-center">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={gridInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="w-2 h-2 bg-accent rounded-full"
                  ></motion.div>
                  <span>Thành lập</span>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, backgroundColor: "rgba(255,255,255,0)" }}
                animate={gridInView ? { opacity: 1, backgroundColor: "rgba(255,255,255,0.5)" } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="p-6 text-foreground bg-card/50 flex items-center font-medium"
              >
                05/2018
              </motion.div>
            </motion.div>

            {/* Hàng 2 */}
            <motion.div 
              variants={gridItem}
              className="grid grid-cols-4 border-b border-border"
            >
              <div className="p-6 font-semibold text-primary bg-primary/5 border-r border-border flex items-center">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={gridInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="w-2 h-2 bg-accent rounded-full"
                  ></motion.div>
                  <span>Nhân sự</span>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="p-6 text-foreground border-r border-border bg-card/50 flex items-center"
              >
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={gridInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full font-bold text-lg"
                >
                  100+
                </motion.span>
              </motion.div>
              <div className="p-6 font-semibold text-primary bg-primary/5 border-r border-border flex items-center">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={gridInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    className="w-2 h-2 bg-accent rounded-full"
                  ></motion.div>
                  <span>Vốn điều lệ</span>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="p-6 text-foreground bg-card/50 flex items-center"
              >
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={gridInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1.1 }}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-lg"
                >
                  17.4 tỷ
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Hàng 3 - Lĩnh vực kinh doanh */}
            <motion.div 
              variants={gridItem}
              className="grid grid-cols-8"
            >
              <div className="p-6 font-semibold text-primary bg-primary/5 border-r border-border col-span-2 flex items-center">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={gridInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                    className="w-2 h-2 bg-accent rounded-full"
                  ></motion.div>
                  <span>Lĩnh vực kinh doanh</span>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={gridInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="p-6 text-foreground col-span-6 bg-card/50 flex items-center"
              >
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={gridInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-xl border border-border w-full"
                >
                  <p className="font-medium">Lập trình máy vi tính, Chi tiết: Sản xuất sản phẩm phần mềm</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Đường kẻ ngang với gradient */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative my-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-muted-foreground">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, delay: 1.0 }}
                  className="w-3 h-3 bg-accent rounded-full mx-auto"
                ></motion.div>
              </span>
            </div>
          </motion.div>

          {/* Phần lãnh đạo được thiết kế lại */}
          <motion.div 
            ref={leadersRef}
            initial="hidden"
            animate={leadersInView ? "visible" : "hidden"}
            variants={staggerGrid}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center mb-6"
            >
              <motion.div 
                initial={{ scale: 0, height: 0 }}
                animate={leadersInView ? { scale: 1, height: 32 } : { scale: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-1 h-8 bg-accent rounded-full mr-4"
              ></motion.div>
              <h3 className="text-2xl font-bold text-primary font-heading">Ban Lãnh Đạo</h3>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Giám đốc kinh doanh */}
              <motion.div 
                variants={gridItem}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-border group hover:bg-accent/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">SB</span>
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary text-lg">Giám đốc Kinh doanh</p>
                    <p className="text-foreground mt-1">Ông QN Sean Beom</p>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={leadersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="flex items-center mt-2"
                    >
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Người Hàn Quốc
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Giám đốc */}
              <motion.div 
                variants={gridItem}
                className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-6 border border-border group hover:bg-primary/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">TK</span>
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary text-lg">Giám đốc Điều hành</p>
                    <p className="text-foreground mt-1">Ông Trần Anh Khôi</p>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={leadersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="flex items-center mt-2"
                    >
                      <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                        Người sáng lập
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Thông tin bổ sung - có thể thêm animation cho phần này nếu cần */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={leadersInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/5 rounded-full px-4 py-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0 }}
                    animate={leadersInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.0 + i * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="w-2 h-2 bg-accent rounded-full"
                  ></motion.div>
                ))}
                <span className="text-sm text-muted-foreground">Đội ngũ lãnh đạo tận tâm</span>
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0 }}
                    animate={leadersInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.3 + i * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="w-2 h-2 bg-accent rounded-full"
                  ></motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompanyInformation;
