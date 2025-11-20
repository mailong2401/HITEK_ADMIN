import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20" >{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
