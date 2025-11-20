// components/AchievementsTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AchievementsTimeline: React.FC = () => {
  const achievements = [
    {
      year: "2021",
      title: "Top 20 công ty khởi nghiệp nổi bật tại Việt Nam",
      type: "giải thưởng"
    },
    {
      year: "2022",
      title: "Đạt chứng chỉ ISO 9001:2015",
      type: "chứng nhận"
    },
    {
      year: "2022",
      title: "Hội viên Hiệp hội Tin học TP.HCM - HCA",
      type: "thành viên"
    },
    {
      year: "2022",
      title: "Hội viên Hiệp hội Phần mềm VINASA",
      type: "thành viên"
    },
    {
      year: "2022", 
      title: "Đạt chứng chỉ ISTQB",
      type: "chứng nhận"
    },
    {
      year: "2023",
      title: "Đạt chứng chỉ AWS Certification",
      type: "chứng nhận"
    },
    {
      year: "2023",
      title: "Đạt chứng chỉ PMP",
      type: "chứng nhận"
    },
    {
      year: "2023",
      title: "Đạt chứng chỉ ISO 27001:2022",
      type: "chứng nhận"
    }
  ];

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

  const timelineItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const statsVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "giải thưởng": return "from-yellow-500 to-orange-500";
      case "chứng nhận": return "from-blue-500 to-cyan-500";
      case "thành viên": return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "giải thưởng": return "Giải thưởng";
      case "chứng nhận": return "Chứng nhận";
      case "thành viên": return "Thành viên";
      default: return type;
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  });

  const [statsRef, statsInView] = useInView({
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
        {/* Số phần */}
        <motion.div 
          variants={slideInLeft}
          className="relative flex-shrink-0 mr-8"
        >
          <div className="text-6xl font-bold text-primary pb-4 border-b-4 border-accent relative">
            04
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
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4 font-heading">THÀNH TỰU VÀ GIẢI THƯỞNG</h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground"
            >
              Hành trình phát triển và những cột mốc quan trọng
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <motion.div 
            ref={timelineRef}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative"
          >
            {/* Đường timeline với animation */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent transform origin-top"
            />
            
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index}
                  variants={timelineItemVariants}
                  custom={index}
                  className="relative pl-16 group"
                >
                  {/* Dot indicator với animation */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: index * 0.1 
                    }}
                    className={`absolute left-0 w-8 h-8 rounded-full bg-gradient-to-r ${getTypeColor(achievement.type)} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 + 0.2 
                      }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  </motion.div>
                  
                  {/* Content */}
                  <motion.div 
                    whileHover={{ 
                      scale: 1.02, 
                      borderColor: "rgb(59 130 246 / 0.5)" 
                    }}
                    className="bg-card border border-border rounded-2xl p-6 group-hover:shadow-xl transition-all duration-300 group-hover:border-accent/30"
                  >
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-sm"
                      >
                        {achievement.year}
                      </motion.span>
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={timelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getTypeColor(achievement.type)}`}
                      >
                        {getTypeText(achievement.type)}
                      </motion.span>
                    </div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className="font-bold text-primary text-lg leading-relaxed"
                    >
                      {achievement.title}
                    </motion.h3>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Thống kê */}
          <motion.div 
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "7+", text: "Năm hoạt động", color: "text-primary" },
              { number: "8+", text: "Giải thưởng & Chứng nhận", color: "text-accent" },
              { number: "2", text: "Hiệp hội thành viên", color: "text-primary" },
              { number: "100%", text: "Chất lượng đạt chuẩn", color: "text-accent" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={statsVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    delay: index * 0.1 
                  }}
                  className={`text-3xl font-bold mb-2 ${stat.color}`}
                >
                  {stat.number}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-muted-foreground"
                >
                  {stat.text}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/5 rounded-full px-6 py-3">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 1.8 + i * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
              ))}
              <motion.span 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="text-sm text-muted-foreground mx-2"
              >
                Tiếp tục phát triển và đạt được nhiều thành tựu hơn nữa
              </motion.span>
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 2.3 + i * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AchievementsTimeline;
