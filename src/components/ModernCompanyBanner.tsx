import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ModernCompanyBanner: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60 
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

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 100 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut" as const
      }
    }
  };

  const gradientTextVariants = {
    hidden: { 
      opacity: 0,
      backgroundPosition: "0% 50%"
    },
    visible: {
      opacity: 1,
      backgroundPosition: "100% 50%",
      transition: {
        opacity: { duration: 1, delay: 0.5 },
        backgroundPosition: { 
          duration: 3, 
          ease: "easeInOut" as const,
          repeat: Infinity,
          repeatType: "reverse" as const
        }
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
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const orbVariants = {
    hidden: { 
      opacity: 0,
      scale: 0 
    },
    visible: {
      opacity: [0.1, 0.3, 0.1],
      scale: 1,
      transition: {
        opacity: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse" as const
        },
        scale: {
          duration: 2,
          ease: "easeOut" as const
        }
      }
    }
  };

  const stats = [
    { number: "5+", label: "Năm kinh nghiệm" },
    { number: "100+", label: "Nhân sự" },
    { number: "50+", label: "Dự án" },
    { number: "10+", label: "Quốc gia" }
  ];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-20"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"
        />
        
        {/* Gradient orbs với animation */}
        <motion.div 
          variants={orbVariants}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl"
        />
        <motion.div 
          variants={orbVariants}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl"
        />
        <motion.div 
          variants={orbVariants}
          transition={{ delay: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main title */}
        <motion.div 
          variants={containerVariants}
          className="mb-6"
        >
          <motion.h1 
            variants={titleVariants}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-tight"
          >
            Thông tin
          </motion.h1>
          <motion.span 
            variants={gradientTextVariants}
            className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent bg-size-200 bg-pos-0 font-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{
              backgroundSize: "200% 100%"
            }}
          >
            công ty
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Khám phá câu chuyện đằng sau một trong những công ty công nghệ 
          <span className="font-semibold text-white"> phát triển nhanh nhất </span>
          với tầm nhìn trở thành đối tác công nghệ hàng đầu toàn cầu
        </motion.p>

        {/* Stats */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={statsVariants}
              custom={index}
              whileHover={{ 
                scale: 1.1,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="text-center group"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 1.2 + index * 0.1 
                }}
                className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300"
              >
                {stat.number}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                className="text-xs md:text-sm text-gray-400 mt-1"
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button 
          variants={itemVariants}
          transition={{ delay: 1.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl"
        >
          <motion.span 
            className="flex items-center gap-3"
            whileHover={{ gap: 4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Khám phá ngay
            <motion.svg 
              className="w-5 h-5"
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.span>
        </motion.button>

        {/* Scroll indicator */}
      </div>
    </motion.section>
  );
};

export default ModernCompanyBanner;
