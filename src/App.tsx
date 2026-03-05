import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Tutorials from "@/pages/Tutorials";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Viewer from "./pages/Viewer";
import Upload from "./pages/Upload";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

/* ---------- Landing Page ---------- */

function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,200,255,0.15),_transparent_60%)] pointer-events-none" />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

/* ---------- Not Found ---------- */

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl">
      404 - Page Not Found
    </div>
  );
}

/* ---------- App ---------- */

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
<Route path="/tutorials" element={<Tutorials />} />
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />

              {/* Protected */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
<Route
  path="/viewer/:id"
  element={
    <ProtectedRoute>
      <Viewer />
    </ProtectedRoute>
  }
/>
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;