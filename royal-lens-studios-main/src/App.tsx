import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Navbar from "@/components/Navbar";

const Index = lazy(() => import("./pages/Index"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Booking = lazy(() => import("./pages/Booking"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminClients = lazy(() => import("./pages/admin/AdminClients"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminPackages = lazy(() => import("./pages/admin/AdminPackages"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const Footer = lazy(() => import("@/components/Footer"));
const MusicFloat = lazy(() => import("@/components/MusicFloat"));
const PostRenderWarmup = lazy(() => import("@/components/PostRenderWarmup"));
const Toaster = lazy(async () => {
  const mod = await import("@/components/ui/toaster");
  return { default: mod.Toaster };
});

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="review-theme-site">
    <Navbar />
    {children}
    <Suspense fallback={<div className="h-24" />}>
      <Footer />
    </Suspense>
    <Suspense fallback={null}>
      <MusicFloat />
    </Suspense>
  </div>
);

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center px-4 text-center">
    <p className="text-sm md:text-base text-muted-foreground">Loading...</p>
  </div>
);

const App = () => (
  <AdminAuthProvider>
    <Suspense fallback={null}>
      <Toaster />
    </Suspense>
    <BrowserRouter>
      <Suspense fallback={null}>
        <PostRenderWarmup />
      </Suspense>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/auth" element={<PublicLayout><Auth /></PublicLayout>} />
          <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </AdminAuthProvider>
);

export default App;
