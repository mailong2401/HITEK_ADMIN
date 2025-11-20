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

import Layout from "./components/Layout"; // Import Layout



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/HITEK_CLONE">
          <Routes>
            {/* Sử dụng Layout cho từng route */}
            <Route path="/" element={
              <Layout>
                <Index />
              </Layout>
            } />
            {/* Sử dụng Layout cho từng route */}
            <Route path="/hitek-software" element={
              <Layout>
                <ManagementPage />
              </Layout>
            } />
            <Route path="/projects" element={
              <Layout>
                  <ProjectsPage />
              </Layout>
              
              } />
            <Route path="/chatbot" element={
              <Layout>
<ChatbotPage />
              </Layout>
              
              } />
            

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
