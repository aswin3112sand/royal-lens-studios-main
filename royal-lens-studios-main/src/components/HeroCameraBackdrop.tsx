import { useEffect, useMemo, useState, type CSSProperties } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-video-poster.svg";
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

  // Mobile gets a lightweight poster-first hero to protect LCP and data usage.
  if (isMobile) {
    return false;
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

const getVideoPreload = (isMobile: boolean): "auto" | "metadata" => {
  if (typeof window === "undefined") {
    return isMobile ? "metadata" : "auto";
  }

  const connectionInfo = getConnectionInfo();
  const networkType = connectionInfo?.effectiveType ?? "";

  if (connectionInfo?.saveData || networkType === "slow-2g" || networkType === "2g" || networkType === "3g") {
    return "metadata";
  }

  return isMobile ? "metadata" : "auto";
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

  const fallbackStyle = useMemo(
    () =>
      ({
        "--hero-fallback-image": `url(${heroPoster})`,
      }) as CSSProperties,
    []
  );

  return (
    <div aria-hidden="true" className="hero-video-backdrop">
      {videoEnabled ? (
        <LazyVideo
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          preload={getVideoPreload(isMobile)}
          priority
          className="hero-video-media"
          disablePictureInPicture
          disableRemotePlayback
        />
      ) : (
        <div className="hero-video-fallback" style={fallbackStyle} />
      )}
      <div className="hero-video-vignette" />
    </div>
  );
};

export default HeroCameraBackdrop;
