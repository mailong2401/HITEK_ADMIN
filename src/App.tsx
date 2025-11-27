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
import { ProjectProvider } from "@/contexts/ProjectContext"; // ĐÃ IMPORT
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from "./components/Layout";
import ProjectFormPage from './pages/ProjectFormPage';

// THÊM IMPORT CHO BLOG
import BlogFormPage from './pages/BlogFormPage';
import BlogsPage from './pages/BlogsPage';
import { BlogProvider } from '@/contexts/BlogContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          {/* THÊM PROJECT PROVIDER Ở ĐÂY */}
          <ProjectProvider>
            {/* THÊM BLOG PROVIDER Ở ĐÂY */}
            <BlogProvider>
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
                        <ProjectFormPage/>
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/projects/edit/:id" element={
                    <ProtectedRoute>
                      <Layout>
                        <ProjectFormPage />
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

                  {/* THÊM BLOG ROUTES Ở ĐÂY */}
                  <Route path="/blogs" element={
                    <ProtectedRoute>
                      <Layout>
                        <BlogsPage />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/blogs/new" element={
                    <ProtectedRoute>
                      <Layout>
                        <BlogFormPage />
                      </Layout>
                    </ProtectedRoute>
                  } />

                  <Route path="/blogs/edit/:id" element={
                    <ProtectedRoute>
                      <Layout>
                        <BlogFormPage />
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
            </BlogProvider>
          </ProjectProvider> {/* ĐÓNG PROJECT PROVIDER */}
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;