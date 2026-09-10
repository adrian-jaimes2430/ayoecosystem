import { useEffect, useRef, useState } from "react";

const DESKTOP_VIDEO = "/eco-transition-desktop.mp4";
const MOBILE_VIDEO = "/eco-transition-mobile.mp4";
const POSTER = "/eco-transition-poster.jpg";

/**
 * The transition film as a narrative scene, not wallpaper.
 * A single scroll source drives the playhead (damped, so no jitter), plus a
 * subtle scale/opacity breathing so the film reads as part of the story.
 * Only one source is ever loaded, seeking waits for metadata, and the loop
 * stops while the tab is hidden.
 */
const ScrollVideoBackdrop = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const current = useRef(0);
  const ready = useRef(false);
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
    const wrap = wrapRef.current;
    if (!video) return;

    const onMeta = () => {
      ready.current = true;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) ready.current = true;

    const readScroll = () => {
      const story = document.getElementById("story-flow");
      if (!story) return;
      const top = window.scrollY + story.getBoundingClientRect().top;
      const max = Math.max(1, story.offsetHeight - window.innerHeight);
      target.current = Math.min(1, Math.max(0, (window.scrollY - top) / max));
    };

    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      if (document.hidden) return;

      current.current += (target.current - current.current) * 0.075;
      const p = current.current;

      if (ready.current) {
        const dur = video.duration;
        if (dur && Number.isFinite(dur)) {
          const t = p * (dur - 0.05);
          // wide-enough threshold to avoid seek storms / jitter
          if (Math.abs(video.currentTime - t) > 0.05) {
            try {
              video.currentTime = t;
            } catch {
              /* seek not ready yet */
            }
          }
        }
      }

      if (wrap) {
        // gentle cinematic breathing tied to story progress
        const scale = 1.08 - p * 0.08;
        wrap.style.transform = `scale(${scale.toFixed(4)})`;
        wrap.style.opacity = (0.88 + Math.sin(p * Math.PI) * 0.12).toFixed(3);
      }
      return;
    };

    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    raf.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
      video.removeAttribute("src");
      video.load();
    };
  }, [reduced, isMobile]);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-background" aria-hidden="true">
      <div ref={wrapRef} className="h-full w-full will-change-transform">
        {reduced ? (
          <img src={POSTER} alt="" className="h-full w-full object-cover opacity-40" />
        ) : (
          <video
            ref={videoRef}
            key={isMobile ? "m" : "d"}
            src={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO}
            poster={POSTER}
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {/* Legibility + brand grade over the film */}
      <div className="absolute inset-0 bg-background/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_34%,hsl(var(--background)/0.58)_100%)]" />
      <div className="absolute inset-0 mix-blend-overlay bg-[linear-gradient(160deg,hsl(var(--primary)/0.12),transparent_58%)]" />
    </div>
  );
};

export default ScrollVideoBackdrop;
