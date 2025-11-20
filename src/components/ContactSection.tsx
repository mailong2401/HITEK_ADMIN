import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm text-primary font-semibold tracking-wider uppercase mb-4">
            LIÊN HỆ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Hãy kết nối với chúng tôi
          </h2>
          <p className="text-muted-foreground text-lg">
            Đội ngũ chuyên gia của HITEK sẵn sàng tư vấn và hỗ trợ bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Điện thoại</h3>
                <p className="text-muted-foreground">+84 123 456 789</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">contact@hitek.com.vn</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Địa chỉ</h3>
                <p className="text-muted-foreground">
                  Tòa nhà Technology Center, Quận 7, TP. Hồ Chí Minh
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg">
            <form className="space-y-6">
              <div>
                <Input
                  placeholder="Họ và tên"
                  className="bg-background border-border/50 focus:border-primary"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-background border-border/50 focus:border-primary"
                />
              </div>
              <div>
                <Input
                  placeholder="Số điện thoại"
                  className="bg-background border-border/50 focus:border-primary"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Nội dung tin nhắn"
                  rows={5}
                  className="bg-background border-border/50 focus:border-primary resize-none"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Gửi tin nhắn
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
