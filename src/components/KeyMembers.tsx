import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Users, Globe } from "lucide-react";

const KeyMembers = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [direction, setDirection] = useState(0); // 0: next, 1: prev

  const members = [
    {
      name: "ÔNG OH SEAN BEOM",
      position: "Giám đốc kinh doanh tại Hàn Quốc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      achievements: [
        { type: "highlight", text: "10+ năm kinh nghiệm phát triển mobile app/web" },
        { type: "highlight", text: "5+ năm kinh nghiệm quản lý team, leadership" },
        { type: "normal", text: "Đảm nhận trách nhiệm chính trong quản lý tiến độ, lên kế hoạch về timeline, budget, nhân sự" },
        { type: "normal", text: "Quản lý team nước ngoài từ xa, lên kế hoạch phát triển bản thân cho nhân viên" },
        { type: "normal", text: "Kinh nghiệm làm việc trong môi trường quốc tế: Nhật, Việt Nam, Hàn Quốc, Châu Âu" }
      ]
    },
    {
      name: "ÔNG LÊ QUỐC VŨ",
      position: "Giám đốc công nghệ công ty Hitek Software",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
      achievements: [
        { type: "highlight", text: "7+ năm kinh nghiệm phát triển phần mềm và thiết kế hệ thống" },
        { type: "highlight", text: "2+ năm kinh nghiệm trong thiết kế và triển khai hệ thống IOT, xây dựng bản mẫu" },
        { type: "normal", text: "Cử nhân chuyên ngành kỹ thuật phần mềm" },
        { type: "award", text: "Tham gia viết các bài báo khoa học công nghệ năm 2016" },
        { type: "award", text: "Giải nhất cuộc thi phần mềm mã nguồn mở 2015" },
        { type: "award", text: "Giải nhì cuộc thi lập trình quốc tế ACM/ICPC 2014" },
        { type: "normal", text: "Chịu trách nhiệm xây dựng và thiết kế kiến trúc hệ thống phần mềm, định hướng kỹ thuật" }
      ]
    },
    {
      name: "ÔNG LÂM THỨ TIÊN",
      position: "Giám đốc công ty Hitek Capital",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
      achievements: [
        { type: "normal", text: "Sáng lập và là Chủ tịch HĐQT Công ty cổ phần Đầu tư Công nghệ số Rồng Việt (Rovi Group)" },
        { type: "normal", text: "Cổ đông sáng lập và Thành viên HĐQT Công ty cổ phần Công nghệ Mọi Người Cùng Vui" },
        { type: "normal", text: "Từng đảm nhận vị trí Tổng giám đốc Công ty cổ phần đầu tư Thengroup" },
        { type: "normal", text: "Từng đảm nhận vị trí Giám đốc thương mại Công ty TNHH Dịch vụ Mọi Người Cùng Vui" },
        { type: "normal", text: "Từng là Nhà sáng lập và điều hành chuỗi hệ thống Điện thoại bình dân (2012)" }
      ]
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const nextMember = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const prevMember = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  // Auto scroll chỉ khi section trong view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      nextMember();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isInView]);

  // Kích hoạt animation khi section vào view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "highlight":
        return "🎯";
      case "award":
        return "🏆";
      default:
        return "💼";
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case "highlight":
        return "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20";
      case "award":
        return "border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20";
      default:
        return "border-l-4 border-gray-300 bg-gray-50 dark:bg-gray-900";
    }
  };

  const currentMember = members[currentIndex];

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section với hiệu ứng xuất hiện */}
        <div className="flex items-start mb-16">
          {/* Số phần với gạch chân */}
          <motion.div 
            variants={slideInLeft}
            className="relative flex-shrink-0 mr-8"
          >
            <div className="text-6xl font-bold text-gray-900 dark:text-white pb-4 border-b-4 border-blue-500 relative">
              05
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
            </div>
          </motion.div>
          
          {/* Nội dung tiêu đề */}
          <motion.div 
            variants={itemVariants}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              THÀNH VIÊN CHỦ CHỐT
            </h2>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Đội ngũ lãnh đạo tài năng với nhiều năm kinh nghiệm trong lĩnh vực công nghệ 
                và quản lý, mang đến sự phát triển vượt bậc cho Hitek Software.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={prevMember}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.9 }}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900 dark:text-white" />
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={nextMember}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.9 }}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="h-6 w-6 text-gray-900 dark:text-white" />
          </motion.button>

          {/* Main Content Card với AnimatePresence */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                {/* Header với gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 relative">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-white mb-2"
                      >
                        {currentMember.name}
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-blue-100 text-lg"
                      >
                        {currentMember.position}
                      </motion.p>
                    </div>
                  </div>
                </div>

                {/* Content - Ảnh bên trái, thông tin bên phải */}
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Ảnh thành viên - Bên trái */}
                    <div className="lg:w-2/5 flex flex-col">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative group flex-1"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-2xl shadow-2xl transition-transform duration-300 h-full"
                        >
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl h-full">
                            <motion.img 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.6 }}
                              src={currentMember.image} 
                              alt={currentMember.name}
                              className="w-full h-full max-h-[500px] object-cover rounded-lg shadow-lg"
                              onError={(e) => {
                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%236b7280'%3EẢnh thành viên%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Thông tin nhanh */}
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-6 grid grid-cols-3 gap-4 text-center"
                      >
                        {[
                          { icon: Users, color: "blue", value: "10+", label: "Năm KN" },
                          { icon: Globe, color: "purple", value: "4+", label: "Quốc gia" },
                          { icon: Award, color: "green", value: "15+", label: "Dự án" }
                        ].map((stat, index) => (
                          <motion.div 
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-lg p-4`}
                          >
                            <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400 mx-auto mb-2`} />
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Thông tin thành tích - Bên phải - FULL HEIGHT */}
                    <div className="lg:w-3/5 flex flex-col">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="space-y-4 flex-1"
                      >
                        {currentMember.achievements.map((achievement, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className={`p-4 rounded-lg ${getAchievementColor(achievement.type)} transition-all duration-300 hover:shadow-md`}
                          >
                            <div className="flex items-start space-x-3">
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                                className="text-lg mt-0.5 flex-shrink-0"
                              >
                                {getAchievementIcon(achievement.type)}
                              </motion.span>
                              <p className={`leading-relaxed ${
                                achievement.type === "highlight" 
                                  ? "font-semibold text-gray-900 dark:text-white" 
                                  : achievement.type === "award"
                                  ? "text-yellow-700 dark:text-yellow-400"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}>
                                {achievement.text}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Thông tin bổ sung */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                          {[
                            { color: "green", text: "Chuyên gia hàng đầu" },
                            { color: "blue", text: "Kinh nghiệm quốc tế" },
                            { color: "purple", text: "Lãnh đạo tận tâm" }
                          ].map((item, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                              className="flex items-center space-x-2"
                            >
                              <div className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></div>
                              <span>{item.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll indicator dots */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex justify-center mt-12 space-x-3"
        >
          {members.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`
                rounded-full transition-all duration-500 ease-out
                ${index === currentIndex 
                  ? 'bg-blue-600 scale-125 w-8 h-3' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 w-3 h-3'
                }
              `}
            />
          ))}
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-200 dark:border-gray-700">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 2.2 + i * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                className={`w-3 h-3 ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'} rounded-full`}
              />
            ))}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="text-gray-600 dark:text-gray-400 text-sm font-medium"
            >
              Đội ngũ lãnh đạo xuất sắc - Tầm nhìn chiến lược
            </motion.span>
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 2.7 + i * 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                className={`w-3 h-3 ${i % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'} rounded-full`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default KeyMembers;
