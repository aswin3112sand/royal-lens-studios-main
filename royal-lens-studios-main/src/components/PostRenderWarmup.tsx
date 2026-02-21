import { useEffect } from "react";
import aboutHeroVideo from "@/assets/about-hero-video.mp4";
import heroVideo from "@/assets/hero-video.mp4";
import servicesHeroVideo from "@/assets/services-hero-video.mp4";

const routeWarmups = [
  () => import("@/pages/Portfolio"),
  () => import("@/pages/Services"),
  () => import("@/pages/About"),
  () => import("@/pages/Testimonials"),
  () => import("@/pages/Contact"),
  () => import("@/pages/Auth"),
  () => import("@/pages/Booking"),
  () => import("@/pages/admin/AdminLayout"),
  () => import("@/pages/admin/AdminDashboard"),
  () => import("@/pages/admin/AdminBookings"),
  () => import("@/pages/admin/AdminLeads"),
  () => import("@/pages/admin/AdminClients"),
  () => import("@/pages/admin/AdminProjects"),
  () => import("@/pages/admin/AdminPackages"),
  () => import("@/pages/admin/AdminSettings"),
];

const mediaWarmups = [heroVideo, aboutHeroVideo, servicesHeroVideo];

const getConnectionInfo = () => {
  const nav = navigator as Navigator & {
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
  };
  return nav.connection;
};

const canWarmupMedia = () => {
  const connection = getConnectionInfo();
  if (!connection) return true;
  if (connection.saveData) return false;
  return !["slow-2g", "2g"].includes(connection.effectiveType ?? "");
};

const addPrefetchLink = (href: string, asType: string) => {
  const selector = `link[rel="prefetch"][href="${href}"]`;
  if (document.head.querySelector(selector)) return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = asType;
  link.href = href;
  document.head.appendChild(link);
};

const scheduleWarmup = (task: () => void) => {
  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof idleWindow.requestIdleCallback === "function") {
    const id = idleWindow.requestIdleCallback(task, { timeout: 3000 });
    return () => idleWindow.cancelIdleCallback?.(id);
  }

  const timeoutId = window.setTimeout(task, 1200);
  return () => window.clearTimeout(timeoutId);
};

const PostRenderWarmup = () => {
  useEffect(() => {
    const cancel = scheduleWarmup(() => {
      Promise.allSettled(routeWarmups.map((warmup) => warmup())).catch(() => {});

      if (canWarmupMedia()) {
        mediaWarmups.forEach((mediaUrl) => addPrefetchLink(mediaUrl, "video"));
      }
    });

    return cancel;
  }, []);

  return null;
};

export default PostRenderWarmup;
