import HeroSection from "@/components/HeroSection";
import AISection from "@/components/AISection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FlexibleWorkSection from "@/components/FlexibleWorkSection";
import ProjectsSection from "@/components/ProjectsSection"
import ClientsSection from "@/components/ClientsSection"

const Index = () => {
  return (
    <> {/* Đã bỏ Navigation và Footer vì đã có trong Layout */}
      <HeroSection />
      <AISection />
      <ServicesSection />
      <FlexibleWorkSection /> 
      <ProjectsSection/>
      <AboutSection />
      <ClientsSection />
      <ContactSection />
    </>
  );
};

export default Index;
