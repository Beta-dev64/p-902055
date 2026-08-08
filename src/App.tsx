import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RevealObserver } from "@/components/Reveal";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyPage from "./pages/CaseStudyPage";
import PortfolioPage from "./pages/PortfolioPage";
import AdminPage from "./pages/AdminPage";
import AcademicPage from "./pages/AcademicPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="fuselabs-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <RevealObserver />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/case-study/:slug" element={<CaseStudyPage />} />
              <Route path="/academic" element={<AcademicPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
