import { useEffect, useRef, useState } from "react";

const DESKTOP_VIDEO = "/eco-transition-desktop.mp4";
const MOBILE_VIDEO = "/eco-transition-mobile.mp4";
const POSTER = "/eco-transition-poster.jpg";


/**
 * Full-page cinematic backdrop.
 * The merged transition film is scrubbed by page scroll, so every section
 * travels through the same continuous world instead of separate backgrounds.
 */
const ScrollVideoBackdrop = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef<number>();
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mb = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReduced(rm.matches);
      setIsMobile(mb.matches);
    };
    sync();
    rm.addEventListener("change", sync);
    mb.addEventListener("change", sync);
    return () => {
      rm.removeEventListener("change", sync);
      mb.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const tick = () => {
      const dur = video.duration;
      if (dur && Number.isFinite(dur)) {
        current.current += (target.current - current.current) * 0.08;
        const t = current.current * (dur - 0.05);
        if (Math.abs(video.currentTime - t) > 0.03) {
          try {
            video.currentTime = t;
          } catch {
            /* seek not ready yet */
          }
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced]);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-background" aria-hidden="true">
      {reduced ? (
        <img src={POSTER} alt="" className="h-full w-full object-cover opacity-40" />
      ) : (
        <video
          ref={videoRef}
          src={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ willChange: "transform" }}
        />
      )}
      {/* Legibility + brand grade over the film */}
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_20%,hsl(var(--background)/0.8)_90%)]" />
      <div className="absolute inset-0 mix-blend-overlay bg-[linear-gradient(160deg,hsl(var(--primary)/0.18),transparent_55%)]" />

    </div>
  );
};

export default ScrollVideoBackdrop;
