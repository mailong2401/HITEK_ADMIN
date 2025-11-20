import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);

  useEffect(() => {
    const startAnimation = () => {
      // Hiệu ứng typewriter cho h1
      const h1Element = h1Ref.current;
      const h1Text = "THÚC ĐẨY SÁNG TẠO, TĂNG TỐC ĐỔI MỚI";
      let h1Index = 0;
      
      // Hiệu ứng typewriter cho h2
      const h2Element = h2Ref.current;
      const h2Text = "ĐỒNG HÀNH PHÁT TRIỂN, NÂNG TẦM THÀNH CÔNG";
      let h2Index = 0;

      h1Element.textContent = "";
      h2Element.textContent = "";

      const typeH1 = () => {
        if (h1Index < h1Text.length) {
          h1Element.textContent += h1Text.charAt(h1Index);
          h1Index++;
          setTimeout(typeH1, 50); // Tốc độ nhanh hơn: 50ms
        } else {
          // Bắt đầu hiệu ứng h2 ngay sau khi h1 hoàn thành
          setTimeout(typeH2, 300);
        }
      };

      const typeH2 = () => {
        if (h2Index < h2Text.length) {
          h2Element.textContent += h2Text.charAt(h2Index);
          h2Index++;
          setTimeout(typeH2, 40); // Tốc độ nhanh hơn: 40ms
        } else {
          // Lặp lại hiệu ứng sau 3 giây
          setTimeout(() => {
            h1Element.textContent = "";
            h2Element.textContent = "";
            h1Index = 0;
            h2Index = 0;
            setTimeout(typeH1, 500);
          }, 3000);
        }
      };

      // Bắt đầu hiệu ứng
      setTimeout(typeH1, 500);
    };

    startAnimation();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://hitek.com.vn/wp-content/uploads/2024/10/home-page-hitek-software.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-tech-dark/40 via-tech-dark/30 to-tech-dark/50"></div>

      {/* Phần nội dung chính - căn giữa */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* H1 với hiệu ứng typewriter */}
          <h1 
            ref={h1Ref}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight min-h-[1.2em]"
          >
            {/* Nội dung sẽ được thêm bằng JS */}
          </h1>
          
          {/* H2 với hiệu ứng typewriter */}
          <h2 
            ref={h2Ref}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white min-h-[1.2em]"
          >
            {/* Nội dung sẽ được thêm bằng JS */}
          </h2>

          <p className="text-lg md:text-xl text-gray-300 italic mt-4 animate-fade-in opacity-0" style={{animationDelay: "0.3s", animationFillMode: "forwards"}}>
            _ Chất lượng là danh dự _
          </p>
        </div>
      </div>

      {/* Phần button cố định ở dưới */}
      <div className="relative z-10 w-full pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0" style={{animationDelay: "0.6s", animationFillMode: "forwards"}}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Khám phá ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-black-600 border-white text-white hover:bg-white/10">
              Liên hệ tư vấn
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
