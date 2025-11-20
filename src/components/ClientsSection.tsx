import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import MetricsDashboard from "@/components/MetricsDashboard";
import WorldMap from "@/assets/map-1-1.png";

const ClientsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const countries = [
    { 
      name: "Canada", 
      flag: "🇨🇦",
      position: { top: "9%", left: "20%" }
    },
    { 
      name: "United States", 
      flag: "🇺🇸",
      position: { top: "40%", left: "6%" }
    },
    { 
      name: "Germany", 
      flag: "🇩🇪",
      position: { top: "15%", left: "48%" }
    },
    { 
      name: "Japan", 
      flag: "🇯🇵",
      position: { top: "27%", left: "92%" }
    },
    { 
      name: "Korea", 
      flag: "🇰🇷",
      position: { top: "60%", left: "88%" }
    },
    { 
      name: "Australia", 
      flag: "🇦🇺",
      position: { top: "70%", left: "95%" }
    },
    { 
      name: "Viet Nam", 
      flag: "🇻🇳",
      position: { top: "82%", left: "76%" }
    }
  ];

  // Auto rotate countries
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % countries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [countries.length]);

  // Kích hoạt animation khi section vào view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header Section với hiệu ứng xuất hiện */}
        <div 
          className={`
            text-center mb-16 transition-all duration-1000 transform
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
            }
          `}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Khách hàng của chúng tôi
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Khách hàng của chúng tôi đến từ khắp nơi trên thế giới bao gồm Hoa Kỳ, 
              Canada, Hàn QuỐc, Đức, Việt Nam, Nhật Bản, Úc.
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic leading-relaxed">
              Chúng tôi dành mọi nỗ lực của mình để tập trung vào việc cải thiện chất lượng sản phẩm 
              thay vì chỉ cải thiện lợi nhuận của công ty.
            </p>
          </div>
        </div>

        {/* World Map with Country Markers với hiệu ứng xuất hiện */}
        <div 
          className={`
            max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
            }
          `}
        >
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            {/* World Map */}
            <div className="relative w-full h-100 rounded-xl overflow-hidden">
              <img 
                src={WorldMap} 
                alt="World Map" 
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Country Markers với hiệu ứng xuất hiện từ từ */}
              {countries.map((country, index) => (
                <div
                  key={country.name}
                  className={`
                    absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500
                    ${hasAnimated ? 'animate-in zoom-in duration-700' : ''}
                    ${index === currentIndex 
                      ? "scale-110 z-20" 
                      : "scale-100 z-10"
                    }
                  `}
                  style={{
                    ...country.position,
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Country Flag Marker */}
                  <div 
                    className={`relative flex flex-col items-center justify-center p-2 rounded-full shadow-lg transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm text-gray-800 dark:text-white"
                    }`}
                  >
                    <div className="text-xl">{country.flag}</div>
                    <span 
                      className={`text-xs font-semibold whitespace-nowrap ${
                        index === currentIndex ? "text-white" : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {country.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Country Indicators Below Map với hiệu ứng xuất hiện */}
            <div 
              className={`
                flex flex-wrap justify-center gap-3 mt-6 transition-all duration-700 delay-500
                ${isInView 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-5 opacity-0'
                }
              `}
            >
              {countries.map((country, index) => (
                <button
                  key={country.name}
                  onClick={() => setCurrentIndex(index)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300
                    ${hasAnimated ? 'animate-in fade-in duration-500' : ''}
                    ${index === currentIndex
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-600/60"
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100 + 500}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <span className="text-sm">{country.flag}</span>
                  <span className="text-xs font-medium">{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid với hiệu ứng xuất hiện */}
        <div 
          className={`
            grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16 transition-all duration-1000 delay-700
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-5 opacity-0'
            }
          `}
        >
          {[
            { number: "50+", label: "Dự án hoàn thành", color: "from-blue-500 to-cyan-500" },
            { number: "7+", label: "Quốc gia", color: "from-green-500 to-emerald-500" },
            { number: "99%", label: "Khách hàng hài lòng", color: "from-purple-500 to-pink-500" },
            { number: "24/7", label: "Hỗ trợ", color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`
                text-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md transition-all duration-300
                ${hasAnimated ? 'animate-in slide-in-from-bottom-8 duration-500' : ''}
              `}
              style={{
                animationDelay: `${index * 150 + 700}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Metrics Dashboard với hiệu ứng xuất hiện */}
        <div 
          className={`
            transition-all duration-1000 delay-900
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-5 opacity-0'
            }
          `}
        >
          <MetricsDashboard />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
