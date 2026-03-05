import { useEffect, useState } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import LazyVideo from "@/components/LazyVideo";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConnectionInfo {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: ConnectionInfo;
  mozConnection?: ConnectionInfo;
  webkitConnection?: ConnectionInfo;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const getConnectionInfo = () => {
  const nav = navigator as NavigatorWithConnection;
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
};

const canAutoplayVideo = (isMobile: boolean) => {
  if (typeof window === "undefined") {
    return true;
  }

  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
    return false;
  }

  const connectionInfo = getConnectionInfo();
  if (connectionInfo?.saveData) {
    return false;
  }

  const networkType = connectionInfo?.effectiveType ?? "";
  if (networkType === "slow-2g" || networkType === "2g") {
    return false;
  }

  if (isMobile && networkType === "3g") {
    return false;
  }

  return true;
};

const HeroCameraBackdrop = () => {
  const isMobile = useIsMobile();
  const [videoEnabled, setVideoEnabled] = useState<boolean>(() => {
    const initialMobileViewport = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    return canAutoplayVideo(initialMobileViewport);
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reducedMotionMedia = window.matchMedia(REDUCED_MOTION_QUERY);
    const connectionInfo = getConnectionInfo();
    const refreshVideoAvailability = () => setVideoEnabled(canAutoplayVideo(isMobile));

    refreshVideoAvailability();

    reducedMotionMedia.addEventListener?.("change", refreshVideoAvailability);
    connectionInfo?.addEventListener?.("change", refreshVideoAvailability);

    return () => {
      reducedMotionMedia.removeEventListener?.("change", refreshVideoAvailability);
      connectionInfo?.removeEventListener?.("change", refreshVideoAvailability);
    };
  }, [isMobile]);

  return (
    <div aria-hidden="true" className="hero-video-backdrop">
      {videoEnabled ? (
        <LazyVideo
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster="/placeholder.svg"
          preload="metadata"
          deferMs={isMobile ? 900 : 320}
          className="hero-video-media"
          disablePictureInPicture
        />
      ) : (
        <div className="hero-video-fallback" />
      )}
      <div className="hero-video-vignette" />
    </div>
  );
};

export default HeroCameraBackdrop;
