import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string;
  deferMs?: number;
}

const LazyVideo = ({ src, deferMs = 250, autoPlay, preload, ...props }: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [deferredReady, setDeferredReady] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

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

  const shouldLoad = inView && deferredReady;

  useEffect(() => {
    if (!shouldLoad || !autoPlay || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [shouldLoad, autoPlay]);

  return (
    <video
      ref={videoRef}
      {...props}
      autoPlay={autoPlay && shouldLoad}
      preload={shouldLoad ? preload ?? "metadata" : "none"}
      src={shouldLoad ? src : undefined}
    />
  );
};

export default LazyVideo;
