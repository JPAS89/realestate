import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import NotFound from "./pages/NotFound";
import Transport from "./pages/Transport";
import AppLayout from "@/layouts/AppLayout";
import Acuatic from "./pages/Acuatic";
import Adventure from "./pages/Adventure";
import Walking from "./pages/Walking";
const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
                <Route element={<AppLayout />}>
                <Route path="/" element={<Index />} />
               
                <Route path="/tours/:category/:tourId" element={<TourDetailPage />} />
                <Route path="/transport" element={<Transport />} />
                <Route path="/tours/acuatic" element={<Acuatic />} />
                <Route path="/tours/adventure" element={<Adventure />} />
                <Route path="/tours/walking" element={<Walking />} />

            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
