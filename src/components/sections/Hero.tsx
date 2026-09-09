import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef, lazy, Suspense } from "react";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

/**
 * CHAPTER 01 — the 3D A&O mark is the protagonist; copy stays minimal,
 * editorial and secondary, sitting over the shared cinematic film.
 */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);
  const inView = useInView(ref, { amount: 0.05 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex items-end overflow-hidden noise-overlay"
    >
      {/* Interactive 3D genesis of the mark */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={null}>
          <HeroScene scrollRef={scrollRef} active={inView} />
        </Suspense>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_60%_40%,transparent_45%,hsl(0_0%_0%/0.5)_100%)]" />
        {/* keeps the headline readable over the film without hiding it */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(100deg,hsl(0_0%_0%/0.72)_0%,hsl(0_0%_0%/0.25)_45%,transparent_70%)]" />
      </div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:pb-20"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="text-[10px] uppercase tracking-[0.45em] text-muted-foreground">
              01 — A&amp;O nace
            </div>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.92]">
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
            transition={{ duration: 1.4, delay: 0.9 }}
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
