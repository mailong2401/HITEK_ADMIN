import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Users, Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FlexibleWorkSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50/30 to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/10 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        
        {/* Header với hiệu ứng xuất hiện */}
        <div 
          className={`
            text-center max-w-4xl mx-auto mb-16 transition-all duration-1000 transform
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
            }
          `}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            Làm việc linh hoạt với 
            <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Hitek Software
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Hitek là công ty phần mềm quốc tế với đội ngũ quản lý người Hàn Quốc và 
            đội ngũ kỹ sư chuyên nghiệp tại Việt Nam, mang đến chất lượng cao nhất 
            trong mọi dự án.
          </p>
        </div>

        {/* 3 Box Content với hiệu ứng xuất hiện tuần tự */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Box 1 - Quản lý Hàn Quốc */}
          <div
            className={`
              transition-all duration-700 transform
              ${isInView 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
              }
            `}
            style={{
              transitionDelay: isInView ? '200ms' : '0ms'
            }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <Users className="h-7 w-7 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Quản lý Hàn Quốc
                  </h3>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Trưởng phòng quản lý dự án là người Hàn Quốc, đảm bảo chất lượng của từng dự án
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Quy trình nghiêm ngặt được thiết lập ngay từ đầu dưới sự giám sát của Trưởng phòng
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Áp dụng cho tất cả dự án, đảm bảo tiến độ được duy trì tối ưu
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <span className="text-sm font-semibold text-blue-600">Chuyên nghiệp</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Box 2 - Phối hợp tuyệt vời */}
          <div
            className={`
              transition-all duration-700 transform
              ${isInView 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
              }
            `}
            style={{
              transitionDelay: isInView ? '400ms' : '0ms'
            }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                    <Globe className="h-7 w-7 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Phối hợp tuyệt vời
                  </h3>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Đội ngũ Hitek bao gồm các Quản lý dự án thành thạo tiếng Hàn
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Truyền đạt thông tin nhanh chóng và chính xác giữa các phòng ban
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Sự hòa hợp văn hóa hai quốc gia giúp làm việc hiệu quả hơn
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="text-sm font-semibold text-green-600">Hiệu quả</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Box 3 - Khách hàng yên tâm */}
          <div
            className={`
              transition-all duration-700 transform
              ${isInView 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
              }
            `}
            style={{
              transitionDelay: isInView ? '600ms' : '0ms'
            }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                    <Shield className="h-7 w-7 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Khách hàng yên tâm
                  </h3>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Khách hàng chỉ cần làm việc với Quản lý người Hàn Quốc
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Theo dõi chất lượng và tiến độ dự án dễ dàng
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Tiết kiệm thời gian, không cần làm việc trực tiếp với toàn bộ nhóm
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <span className="text-sm font-semibold text-purple-600">Tin cậy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Footer Note với hiệu ứng xuất hiện */}
        <div 
          className={`
            text-center mt-12 max-w-3xl mx-auto transition-all duration-1000 transform
            ${isInView 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-5 opacity-0'
            }
          `}
          style={{
            transitionDelay: isInView ? '800ms' : '0ms'
          }}
        >
          <p className="text-lg text-muted-foreground italic">
            Đội ngũ người Hàn Quốc giám sát quản lý và phát triển quy trình, 
            góp phần vào sự phát triển và thành công của Hitek Software 
            thông qua quản lý chặt chẽ và tiêu chuẩn chuyên môn cao.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlexibleWorkSection;
