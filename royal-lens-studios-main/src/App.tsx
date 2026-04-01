import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = lazy(() => import("./pages/Index"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const NotFound = lazy(() => import("./pages/NotFound"));
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
  <div className="flex min-h-screen items-center justify-center px-4 text-center">
    <p className="text-sm text-muted-foreground md:text-base">Loading...</p>
  </div>
);

const App = () => (
  <>
    <Suspense fallback={null}>
      <Toaster />
    </Suspense>
    <BrowserRouter>
      <Suspense fallback={null}>
        <PostRenderWarmup />
      </Suspense>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </>
);

export default App;
