import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import track from "@/assets/ao-storytelling.mp3.asset.json";

const TARGET_VOLUME = 0.35;

/**
 * Cinematic background score. Starts on the visitor's first scroll or click
 * (browser autoplay policies require a gesture) and fades in gently.
 */
const AmbientAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const started = useRef(false);
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const audio = new Audio(track.url);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    let fade = 0;
    const start = () => {
      if (started.current) return;
      started.current = true;
      void audio.play().then(() => {
        setVisible(true);
        fade = window.setInterval(() => {
          if (audio.volume >= TARGET_VOLUME - 0.01) {
            audio.volume = TARGET_VOLUME;
            window.clearInterval(fade);
            return;
          }
          audio.volume = Math.min(TARGET_VOLUME, audio.volume + 0.02);
        }, 120);
      }).catch(() => {
        started.current = false;
      });
      remove();
    };

    const remove = () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("keydown", start);
    };

    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("click", start);
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("keydown", start);

    return () => {
      remove();
      window.clearInterval(fade);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Activar música" : "Silenciar música"}
      className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur-md text-foreground/80 transition-colors hover:text-primary hover:border-primary/50"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
};

export default AmbientAudio;
