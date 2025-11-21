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
import { ProjectProvider } from '@/contexts/ProjectContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from "./components/Layout";
import ProjectFormPage from './pages/ProjectFormPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <ProjectProvider>
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
                      <ProjectFormPage />
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
          </ProjectProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
