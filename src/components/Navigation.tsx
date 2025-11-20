import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronLeft, ChevronRight, LogOut, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/contexts/AuthContext';
import logo_hitek from "@/assets/logo-hitek.png"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated, loading } = useAuth();

  // ----- HITEK COMPANIES DATA -----
  const hitekCompanies = [
    { name: "Hitek Software", path: "/hitek-software" },
    { name: "Hitek Drone", path: "/hitek-drone" },
    { name: "Hitek Infra", path: "/hitek-infra" },
    { name: "Hitek Academy", path: "/hitek-academy" },
    { name: "FS Tech", path: "/fs-tech" },
    { name: "Pitek", path: "/pitek" }
  ];

  // ----- SCROLL EFFECT -----
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ----- CLICK OUTSIDE USER MENU -----
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ----- RESET MENU STATES WHEN AUTH CHANGES -----
  useEffect(() => {
    // Đóng các menu khi authentication state thay đổi
    if (!isAuthenticated) {
      setShowUserMenu(false);
    }
  }, [isAuthenticated]);

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  const scrollLeftFn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRightFn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [checkScrollButtons]);

  // ----- HANDLE COMPANY CLICK -----
  const handleCompanyClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----- HANDLE LOGIN/LOGOUT -----
  const handleLogin = () => {
    navigate("/hitek-software");
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      setIsMobileMenuOpen(false);
      
      // Nếu đang ở trang protected, chuyển hướng về trang chủ
      if (location.pathname !== "/") {
        navigate("/");
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // ----- RENDER HITEK COMPANIES FOR TABLET SCROLL -----
  const renderHitekCompanies = () => (
    <div className="flex items-center space-x-6 px-2">
      {hitekCompanies.map((company) => (
        <button
          key={company.path}
          onClick={() => handleCompanyClick(company.path)}
          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap flex-shrink-0 relative group"
        >
          {company.name}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </button>
      ))}
    </div>
  );

  // ----- RENDER USER MENU -----
  const renderUserMenu = () => (
    <motion.div 
      ref={userMenuRef}
      className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-xl z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-border">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {user?.email || 'admin@hitekgroup.vn'}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role || 'admin'}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <button
            onClick={() => {
              navigate("/hitek-software");
              setShowUserMenu(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
          >
            Quản lý hệ thống
          </button>
          <button
            onClick={() => {
              navigate("/projects");
              setShowUserMenu(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
          >
            Quản lý dự án
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 px-3 py-2 text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </motion.div>
  );

  // Hiển thị loading nếu đang check auth
  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={logo_hitek}
                alt="HITEK Logo" 
                className="h-16 w-auto"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="animate-pulse bg-muted rounded-md h-8 w-24"></div>
              <div className="animate-pulse bg-muted rounded-full h-8 w-8"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-md ${isScrolled ? "shadow-lg" : ""}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo_hitek}
              alt="HITEK Logo" 
              className="h-16 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Desktop Navigation - Full companies list */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {hitekCompanies.map((company) => (
              <button
                key={company.path}
                onClick={() => handleCompanyClick(company.path)}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap relative group"
              >
                {company.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />
            
            {isAuthenticated ? (
              // User is logged in - show user menu
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name || 'Admin'}
                  </span>
                </Button>
                <AnimatePresence>
                  {showUserMenu && renderUserMenu()}
                </AnimatePresence>
              </div>
            ) : (
              // User is not logged in - show login button
              <Button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <LogIn className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Button>
            )}
          </div>

          {/* Tablet Scroll Menu */}
          <div className="hidden md:flex lg:hidden items-center flex-1 mx-4">
            {canScrollLeft && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={scrollLeftFn}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <div 
              ref={scrollContainerRef} 
              className="flex overflow-x-auto scrollbar-hide mx-2 flex-1"
              onScroll={checkScrollButtons}
            >
              {renderHitekCompanies()}
            </div>
            {canScrollRight && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={scrollRightFn}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Tablet Controls */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            <LanguageSelector />
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="h-5 w-5" />
                </Button>
                <AnimatePresence>
                  {showUserMenu && renderUserMenu()}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                variant="default"
                size="icon"
                onClick={handleLogin}
                className="bg-primary text-primary-foreground"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button & Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="h-5 w-5" />
                </Button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-xl z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {renderUserMenu()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                variant="default"
                size="icon"
                onClick={handleLogin}
                className="bg-primary text-primary-foreground"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 pb-4 border-t border-border pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground mb-2">CÁC CÔNG TY THÀNH VIÊN</h3>
                {hitekCompanies.map((company) => (
                  <button
                    key={company.path}
                    onClick={() => handleCompanyClick(company.path)}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                  >
                    {company.name}
                  </button>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-border">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {user?.name || 'Admin User'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user?.email || 'admin@hitekgroup.vn'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          navigate("/hitek-software");
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                      >
                        Quản lý hệ thống
                      </button>
                      <button
                        onClick={() => {
                          navigate("/projects");
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                      >
                        Quản lý dự án
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors mt-2"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-primary hover:bg-accent rounded-md transition-colors flex items-center space-x-2"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Đăng nhập</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
