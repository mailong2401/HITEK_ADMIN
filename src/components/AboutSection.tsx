import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { Award, Users, FolderCheck, UserCheck } from "lucide-react";
import homePageHitekSoftware from "@/assets/home-page-hitek-software.jpg";

// Component cho số đếm động
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const targetValue = parseInt(value.replace('+', ''));

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = targetValue / (duration / 16); // 60fps
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue, duration]);

  return (
    <span ref={ref}>
      {count}+
    </span>
  );
};

// Component cho animation khi scroll vào view
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const AnimatedCard = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(30px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  const stats = [
    { 
      icon: Award, 
      value: "06+", 
      label: "Năm kinh nghiệm",
      description: "Nhiều năm kinh nghiệm đã mang lại cho chúng tôi kiến thức sâu rộng về nhiều ngành, cho phép cung cấp giải pháp trải nghiệm số tốt nhất."
    },
    { 
      icon: Users, 
      value: "80+", 
      label: "Khách hàng toàn cầu",
      description: "Hơn 80 khách hàng toàn cầu từ khắp nơi trên thế giới, bao gồm Hàn Quốc, Nhật Bản, Canada, Úc và nhiều nơi khác."
    },
    { 
      icon: FolderCheck, 
      value: "100+", 
      label: "Dự án hoàn thành",
      description: "Các dự án hoàn thành cho khách hàng, mang lại trải nghiệm chuyển đổi số vượt trội và giải pháp tối ưu."
    },
    { 
      icon: UserCheck, 
      value: "100+", 
      label: "Đội ngũ tài năng",
      description: "Đội ngũ tài năng bao gồm các chuyên gia kỹ thuật số, nhà tư duy chiến lược, nhà thiết kế và nhà phát triển sáng tạo."
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/10 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header với animation */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-semibold tracking-wider uppercase">
              THÀNH TỰU CỦA CHÚNG TÔI
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Cảm ơn sự tin tưởng
            <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              của khách hàng
            </span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Hành trình của chúng tôi được xây dựng dựa trên sự tin tưởng và hợp tác từ các đối tác 
            toàn cầu, mang đến những giải pháp công nghệ xuất sắc và trải nghiệm khách hàng vượt trội.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Thông tin chính với animation và hình ảnh */}
          <AnimatedSection className="space-y-8" delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Đối tác công nghệ đáng tin cậy của bạn
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                HITEK là công ty công nghệ hàng đầu tại Việt Nam, chuyên cung cấp các giải pháp
                phần mềm và dịch vụ chuyển đổi số. Với đội ngũ chuyên gia giàu kinh nghiệm và
                công nghệ tiên tiến, chúng tôi cam kết mang đến những sản phẩm chất lượng cao.
              </p>
              
              {/* Hình ảnh được chèn vào đây */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mt-6 group">
                <img 
                  src={homePageHitekSoftware} 
                  alt="Hitek Software Team" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Đội ngũ Hitek Software</p>
                  <p className="text-xs opacity-90">Chuyên gia công nghệ hàng đầu</p>
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Sứ mệnh của chúng tôi là thúc đẩy sáng tạo, tăng tốc đổi mới, đồng hành phát
                triển và nâng tầm thành công cho mọi doanh nghiệp.
              </p>
            </div>

            {/* Mini Stats với số đếm động */}
          </AnimatedSection>

          {/* Right Content - Stats Grid với animation staggered */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedCard key={index} delay={0.3 + index * 0.1}>
                  <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl group hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 border border-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-baseline gap-2">
                          <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                            <AnimatedCounter value={stat.value} duration={2000 + index * 200} />
                          </div>
                          <div className="text-lg font-semibold text-foreground">
                            {stat.label}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>

        {/* Call to Action với animation */}
        <AnimatedSection className="text-center mt-16" delay={0.6}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
            <div className="text-left">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Sẵn sàng hợp tác cùng chúng tôi?
              </h4>
              <p className="text-muted-foreground text-sm">
                Hãy để chúng tôi giúp bạn hiện thực hóa ý tưởng với giải pháp công nghệ tối ưu
              </p>
            </div>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 whitespace-nowrap hover:scale-105">
              Liên hệ ngay
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;
