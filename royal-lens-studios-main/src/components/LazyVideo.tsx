import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  deferMs?: number;
}

const LazyVideo = ({
  src,
  deferMs = 250,
  autoPlay,
  preload,
  onError,
  poster,
  style,
  ...props
}: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [deferredReady, setDeferredReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let timer: number;
    const raf = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => setDeferredReady(true), deferMs);
    });
    return () => {
      window.cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
    };
  }, [deferMs]);

  const shouldLoad = inView && deferredReady && !hasError;

  useEffect(() => {
    if (!shouldLoad || !autoPlay || !videoRef.current || hasError) return;
    videoRef.current.play().catch(() => {});
  }, [shouldLoad, autoPlay, hasError]);

  const handleError = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setHasError(true);
    if (typeof onError === "function") {
      onError(event);
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
      autoPlay={autoPlay && shouldLoad}
      preload={shouldLoad ? preload ?? "metadata" : "none"}
      onError={handleError}
      poster={poster}
      style={mergedStyle}
      src={shouldLoad ? src : undefined}
    />
  );
};

export default LazyVideo;
