import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TRACK = "/ao-storytelling.mp3";
const TARGET_VOLUME = 0.35;

/** Single shared element so remounts never stack a second track. */
let sharedAudio: HTMLAudioElement | null = null;
const getAudio = () => {
  if (!sharedAudio) {
    sharedAudio = new Audio(TRACK);
    sharedAudio.loop = true;
    sharedAudio.preload = "auto";
    sharedAudio.volume = 0;
  }
  return sharedAudio;
};

/**
 * Narrative score for the storytelling. Autoplay is never forced: playback
 * starts on the visitor's first real gesture and can always be toggled.
 * Position is preserved across section changes and remounts.
 */
const AmbientAudio = () => {
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
    const audio = getAudio();
    setPlaying(!audio.paused);

    const events: Array<keyof WindowEventMap> = [
      "scroll",
      "pointerdown",
      "click",
      "touchstart",
      "keydown",
    ];
    const remove = () => events.forEach((e) => window.removeEventListener(e, start));

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
          /* still blocked — wait for the next gesture */
        });
    }

    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    return () => {
      remove();
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      window.clearInterval(fadeRef.current);
    };
  }, [fadeIn]);

  const toggle = () => {
    const audio = getAudio();
    if (audio.paused) {
      audio.volume = 0;
      void audio.play().then(() => fadeIn(audio)).catch(() => undefined);
      return;
    }
    window.clearInterval(fadeRef.current);
    audio.pause();
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
