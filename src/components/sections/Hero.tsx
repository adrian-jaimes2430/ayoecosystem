import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef, lazy, Suspense, useState } from "react";
import type { PhaseName } from "@/components/three/phases";

const BigBangScene = lazy(() => import("@/components/three/BigBangScene"));

const CHAPTER_LABEL: Record<PhaseName, string> = {
  VOID: "01 — El vacío",
  SINGULARITY: "01 — Singularidad",
  EXPLOSION: "01 — Big Bang",
  REASSEMBLY: "01 — Conexión",
  MATERIALIZATION: "01 — A&O nace",
  DISSOLVE: "02 — Continúa",
};

/**
 * CHAPTER 01 hero — the 3D genesis of the mark is the protagonist.
 * HTML copy is deliberately minimal and secondary, editorial and quiet.
 */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);
  const [phase, setPhase] = useState<PhaseName>("VOID");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-black noise-overlay"
    >
      {/* 3D genesis */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <BigBangScene scrollRef={scrollRef} onPhase={setPhase} />
        </Suspense>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,transparent_35%,hsl(0_0%_0%/0.75)_100%)]" />
      </div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:pb-20"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground">
              {CHAPTER_LABEL[phase]}
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
              A&amp;O ECOSYSTEM
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              El ecosistema nace de la conexión.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="hero" size="lg">
                <a href="#activacion">
                  Empezar ahora <ArrowRight className="ml-1" />
                </a>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a
                  href="https://wa.me/573106807521?text=Hola,%20quiero%20acceder%20al%20ecosistema%20A%26O"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar con el equipo
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, delay: 1.4 }}
            className="flex items-center gap-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          >
            <span className="text-[hsl(var(--brand-inverfact))]">01 Activar</span>
            <span className="h-px w-6 bg-border" />
            <span className="text-[hsl(var(--brand-anma))]">02 Generar</span>
            <span className="h-px w-6 bg-border" />
            <span className="text-[hsl(var(--brand-ao))]">03 Escalar</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
