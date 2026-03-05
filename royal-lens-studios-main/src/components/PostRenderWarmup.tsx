import { useEffect } from "react";

const routeWarmups = [
  () => import("@/pages/Portfolio"),
  () => import("@/pages/Services"),
  () => import("@/pages/About"),
  () => import("@/pages/Testimonials"),
  () => import("@/pages/Contact"),
  () => import("@/pages/Booking"),
];

const getConnectionInfo = () => {
  const nav = navigator as Navigator & {
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
  };
  return nav.connection;
};

const canWarmupRoutes = () => {
  const connection = getConnectionInfo();
  if (!connection) return true;
  if (connection.saveData) return false;
  return !["slow-2g", "2g", "3g"].includes(connection.effectiveType ?? "");
};

const scheduleWarmup = (task: () => void) => {
  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof idleWindow.requestIdleCallback === "function") {
    const id = idleWindow.requestIdleCallback(task, { timeout: 4000 });
    return () => idleWindow.cancelIdleCallback?.(id);
  }

  const timeoutId = window.setTimeout(task, 2000);
  return () => window.clearTimeout(timeoutId);
};

const watchForInteraction = (onInteract: () => void) => {
  let triggered = false;
  const events: Array<keyof WindowEventMap> = ["pointerdown", "touchstart", "keydown", "scroll"];

  const handler = () => {
    if (triggered) return;
    triggered = true;
    teardown();
    onInteract();
  };

  const teardown = () => {
    events.forEach((event) => {
      window.removeEventListener(event, handler);
    });
    window.clearTimeout(fallbackId);
  };

  events.forEach((event) => {
    window.addEventListener(event, handler, { once: true });
  });

  const fallbackId = window.setTimeout(handler, 20000);
  return teardown;
};

const PostRenderWarmup = () => {
  useEffect(() => {
    let cancelIdleTask: (() => void) | undefined;

    const stopWatching = watchForInteraction(() => {
      if (!canWarmupRoutes()) return;

      cancelIdleTask = scheduleWarmup(() => {
        Promise.allSettled(routeWarmups.map((warmup) => warmup())).catch(() => {});
      });
    });

    return () => {
      stopWatching();
      cancelIdleTask?.();
    };
  }, []);

  return null;
};

export default PostRenderWarmup;
