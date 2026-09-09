import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import track from "@/assets/ao-storytelling.mp3.asset.json";

const TARGET_VOLUME = 0.35;

/**
 * Cinematic background score. Tries to start immediately and, when the browser
 * blocks autoplay, starts on the visitor's first gesture (scroll, tap, key).
 * The control is always visible so playback can be forced manually.
 */
const AmbientAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef(0);
  const [playing, setPlaying] = useState(false);

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      if (audio.volume >= TARGET_VOLUME - 0.01) {
        audio.volume = TARGET_VOLUME;
        window.clearInterval(fadeRef.current);
        return;
      }
      audio.volume = Math.min(TARGET_VOLUME, audio.volume + 0.02);
    }, 120);
  }, []);

  useEffect(() => {
    const audio = new Audio(track.url);
    audio.loop = true;
    audio.preload = "auto";
    audio.crossOrigin = "anonymous";
    audio.volume = 0;
    audioRef.current = audio;

    const remove = () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("keydown", start);
    };

    function start() {
      if (!audio.paused) return;
      void audio
        .play()
        .then(() => {
          setPlaying(true);
          fadeIn(audio);
          remove();
        })
        .catch(() => {
          /* autoplay still blocked — wait for the next gesture */
        });
    }

    start();
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("pointerdown", start);
    window.addEventListener("click", start);
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("keydown", start);

    return () => {
      remove();
      window.clearInterval(fadeRef.current);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [fadeIn]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0;
      void audio.play().then(() => {
        setPlaying(true);
        fadeIn(audio);
      });
      return;
    }
    window.clearInterval(fadeRef.current);
    audio.pause();
    setPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Silenciar música" : "Activar música"}
      className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 backdrop-blur-md text-foreground/80 transition-colors hover:text-primary hover:border-primary/50"
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
};

export default AmbientAudio;
