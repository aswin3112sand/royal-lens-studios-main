import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  deferMs?: number;
  priority?: boolean;
}

const LazyVideo = ({
  src,
  deferMs = 250,
  priority = false,
  autoPlay,
  preload,
  onError,
  onCanPlay,
  poster,
  style,
  muted,
  playsInline,
  ...props
}: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(priority);
  const [deferredReady, setDeferredReady] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const shouldAutoPlay = Boolean(autoPlay);
  const shouldMute = muted ?? shouldAutoPlay;
  const shouldPlayInline = playsInline ?? shouldAutoPlay;

  useEffect(() => {
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (priority) {
      setInView(true);
      return;
    }

    const node = videoRef.current;
    if (!node) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (priority) {
      setDeferredReady(true);
      return;
    }

    let timer: number;
    const raf = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => setDeferredReady(true), deferMs);
    });
    return () => {
      window.cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
    };
  }, [deferMs, priority]);

  const shouldLoad = inView && deferredReady && !hasError;
  const resolvedPreload = shouldLoad ? preload ?? (priority ? "auto" : "metadata") : "none";

  const enforceMobilePlaybackAttrs = (node: HTMLVideoElement) => {
    if (shouldPlayInline) {
      node.setAttribute("playsinline", "true");
      node.setAttribute("webkit-playsinline", "true");
    }
    if (shouldMute) {
      node.muted = true;
      node.defaultMuted = true;
    }
  };

  useEffect(() => {
    const node = videoRef.current;
    if (!shouldLoad || !node || hasError) return;

    enforceMobilePlaybackAttrs(node);

    if (!shouldAutoPlay) return;

    const attemptPlay = () => {
      node.play().catch(() => {});
    };

    attemptPlay();

    node.addEventListener("loadeddata", attemptPlay, { once: true });
    window.addEventListener("pointerdown", attemptPlay, { once: true, passive: true });
    window.addEventListener("touchstart", attemptPlay, { once: true, passive: true });

    return () => {
      node.removeEventListener("loadeddata", attemptPlay);
      window.removeEventListener("pointerdown", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
    };
  }, [shouldLoad, shouldAutoPlay, shouldPlayInline, shouldMute, hasError]);

  const handleError = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setHasError(true);
    if (typeof onError === "function") {
      onError(event);
    }
  };

  const handleCanPlay = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (videoRef.current) {
      enforceMobilePlaybackAttrs(videoRef.current);
      if (shouldAutoPlay) {
        videoRef.current.play().catch(() => {});
      }
    }

    if (typeof onCanPlay === "function") {
      onCanPlay(event);
    }
  };

  const shouldShowPosterFallback = Boolean(poster) && (!shouldLoad || hasError);
  const mergedStyle = shouldShowPosterFallback
    ? {
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }
    : style;

  return (
    <video
      ref={videoRef}
      {...props}
      autoPlay={shouldAutoPlay && shouldLoad}
      muted={shouldMute}
      playsInline={shouldPlayInline}
      preload={resolvedPreload}
      onError={handleError}
      onCanPlay={handleCanPlay}
      poster={poster}
      style={mergedStyle}
      src={shouldLoad ? src : undefined}
    />
  );
};

export default LazyVideo;
