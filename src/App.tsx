import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ManagementPage from "@/pages/ManagementPage";
import ProjectsPage from './pages/ProjectsPage';
import ChatbotPage from './pages/ChatbotPage';

import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from "./components/Layout";
import ProjectFormPage from './pages/ProjectFormPage';

const queryClient = new QueryClient();

// Mock categories data - trong thực tế bạn sẽ lấy từ API hoặc context
const mockCategories = [
  { id: 'web', name: 'Web Development', icon: '🌐' },
  { id: 'mobile', name: 'Mobile App', icon: '📱' },
  { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
  { id: 'cloud', name: 'Cloud Solutions', icon: '☁️' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'enterprise', name: 'Enterprise Software', icon: '🏢' }
];

// Mock handlers - trong thực tế bạn sẽ kết nối với service/API
const handleCreateProject = async (projectData: any) => {
  console.log('Creating project:', projectData);
  // Gọi API để tạo project
  // await projectService.createProject(projectData);
};

const handleUpdateProject = async (projectData: any) => {
  console.log('Updating project:', projectData);
  // Gọi API để cập nhật project
  // await projectService.updateProject(projectData);
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter basename="/HITEK_ADMIN">
            <Routes>
              {/* Public route - không cần đăng nhập */}
              <Route path="/" element={
                <Layout>
                  <Index />
                </Layout>
              } />

              {/* Protected routes - cần đăng nhập */}
              <Route path="/hitek-software" element={
                <ProtectedRoute>
                  <Layout>
                    <ManagementPage />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Project Form Routes */}
              <Route path="/projects/new" element={
                <ProtectedRoute>
                  <Layout>
                    <ProjectFormPage 
                      onSubmit={handleCreateProject}
                      editingProject={null}
                      categories={mockCategories}
                    />
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/projects/edit/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <ProjectFormPage 
                      onSubmit={handleUpdateProject}
                      editingProject={null} // Trong thực tế bạn sẽ truyền project cần edit
                      categories={mockCategories}
                    />
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/projects" element={
                <ProtectedRoute>
                  <Layout>
                    <ProjectsPage />
                  </Layout>
                </ProtectedRoute>
              } />

              <Route path="/chatbot" element={
                <ProtectedRoute>
                  <Layout>
                    <ChatbotPage />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* 404 route - public */}
              <Route path="*" element={
                <Layout>
                  <NotFound />
                </Layout>
              } />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
