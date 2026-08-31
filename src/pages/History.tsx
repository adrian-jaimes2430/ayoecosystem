import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Box, Sparkles } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import StoryTimeline from "@/components/story/StoryTimeline";
import { AOHistoryChapters } from "@/content/aoHistory";

const ImmersiveAOStory = lazy(() => import("@/components/three/ImmersiveAOStory"));

export default function History() {
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const chapterCount = AOHistoryChapters.length;
  const active = AOHistoryChapters[index];

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(chapterCount - 1, Math.floor(v * chapterCount));
    setIndex((current) => (current === next ? current : next));
  });

  const progress = useMemo(() => {
    return chapterCount <= 1 ? 0 : index / (chapterCount - 1);
  }, [index, chapterCount]);

  useEffect(() => {
    const previous = document.title;
    document.title = "Nuestra historia | A&O Ecosystem";
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    if (meta) meta.setAttribute("content", "La historia de A&O Ecosystem contada como una experiencia inmersiva de storytelling 3D.");
    return () => {
      document.title = previous;
      if (meta) meta.setAttribute("content", previousDescription);
    };
  }, []);

  const goToNext = () => {
    const targetIndex = Math.min(chapterCount - 1, index + 1);
    window.scrollTo({ top: targetIndex * Math.max(window.innerHeight, 760), behavior: "smooth" });
  };

  return (
    <main className="relative bg-[#050507] text-white">
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-[#050507]" />}>
          <ImmersiveAOStory progress={progress} chapter={active.id} />
        </Suspense>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,transparent_0%,rgba(5,5,7,0.18)_32%,rgba(5,5,7,0.78)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,7,0.28),rgba(5,5,7,0.02)_35%,rgba(5,5,7,0.7))]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-40 px-5 py-5 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="pointer-events-auto inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 transition hover:text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/20 backdrop-blur-xl">
              <Box className="h-4 w-4" />
            </span>
            A&amp;O Ecosystem
          </Link>
          <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-white/40 md:flex">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive history
          </div>
          <Link to="/" className="pointer-events-auto rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 backdrop-blur-xl transition hover:bg-white/10 hover:text-white">
            Volver
          </Link>
        </div>
      </header>

      <StoryTimeline chapter={active} progress={progress} />

      <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-30 px-6">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
          <div className="hidden max-w-[210px] text-[10px] uppercase leading-5 tracking-[0.22em] text-white/35 md:block">
            Desplázate para recorrer la historia
          </div>
          <button
            type="button"
            onClick={goToNext}
            className="pointer-events-auto ml-auto inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/25 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            {index === chapterCount - 1 ? "Ver el ecosistema" : "Continuar"}
            {index === chapterCount - 1 ? <ArrowRight className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <section className="relative z-10 pointer-events-none h-[900vh]">
        {AOHistoryChapters.map((chapter) => (
          <div key={chapter.id} className="h-screen" aria-hidden="true" />
        ))}
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-[#050507] px-6 py-20 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">A&amp;O Ecosystem</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
          Lo mejor de nuestra historia es lo que todavía no hemos construido.
        </h2>
        <Link to="/" className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
          Entrar al ecosistema <ArrowRight className="h-4 w-4" />
        </Link>
      </footer>
    </main>
  );
}
