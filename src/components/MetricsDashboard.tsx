import { useState, useEffect, useRef } from "react";

const MetricsDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const metrics = [
    { 
      label: "Tốc độ phát triển", 
      value: 85, 
      color: "from-blue-500 to-cyan-500",
      description: "Dự án hoàn thành nhanh hơn 85% so với thị trường"
    },
    { 
      label: "Chất lượng code", 
      value: 92, 
      color: "from-green-500 to-emerald-500",
      description: "Đạt 92% tiêu chuẩn chất lượng code quốc tế"
    },
    { 
      label: "Khách hàng hài lòng", 
      value: 96, 
      color: "from-purple-500 to-pink-500",
      description: "96% khách hàng đánh giá 5 sao về dịch vụ"
    },
    { 
      label: "Tốc độ phản hồi", 
      value: 88, 
      color: "from-orange-500 to-red-500",
      description: "Phản hồi yêu cầu trong vòng 24h"
    },
    { 
      label: "Bảo mật hệ thống", 
      value: 95, 
      color: "from-indigo-500 to-blue-500",
      description: "Đạt 95% tiêu chuẩn bảo mật cao nhất"
    },
    { 
      label: "Tối ưu hiệu suất", 
      value: 90, 
      color: "from-teal-500 to-green-500",
      description: "Tối ưu hiệu suất ứng dụng lên 90%"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Chỉ Số Đo Lường Hiệu Suất
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cam kết mang đến chất lượng dịch vụ tốt nhất thông qua các chỉ số đo lường minh bạch
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/20"
            >
              {/* Metric Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {metric.label}
                </h3>
                <div className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent">
                  <span className={metric.color.replace("from-", "from-").replace("to-", "to-")}>
                    {isVisible ? `${metric.value}%` : "0%"}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1500 ease-out`}
                  style={{
                    width: isVisible ? `${metric.value}%` : "0%",
                    transitionDelay: `${index * 200}ms`
                  }}
                ></div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {metric.description}
              </p>

              {/* Animated Circles */}
              <div className="flex justify-end mt-4 space-x-2">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${metric.color} animate-pulse`}
                    style={{ animationDelay: `${dot * 300}ms` }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: "50+", label: "Dự án" },
            { number: "7+", label: "Quốc gia" },
            { number: "99%", label: "Hài lòng" },
            { number: "24/7", label: "Hỗ trợ" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
