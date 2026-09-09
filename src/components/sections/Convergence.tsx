import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ChapterHeading from "@/components/ChapterHeading";
import inverfactLogo from "@/assets/logo-inverfact.png";
import nomadhiveLogo from "@/assets/logo-nomadhive.png";
import anmaLogo from "@/assets/logo-anma.png";

const aoLogo = "/logo-ao-light.png";

const marks = [
  { src: inverfactLogo, alt: "Inverfact", from: { x: -160, y: -70 }, bg: "bg-white" },
  { src: nomadhiveLogo, alt: "NomadHive", from: { x: 160, y: -80 }, bg: "bg-black" },
  { src: anmaLogo, alt: "ANMA Soluciones", from: { x: -150, y: 90 }, bg: "bg-white" },
];

/**
 * CHAPTERS 07 & 08 — the existing brand marks converge into A&O and the
 * camera pulls back, so the ecosystem ends up feeling larger than the screen.
 * Motion only: no new 3D models, no new routes.
 */
const Convergence = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const pull = useTransform(scrollYProgress, [0.1, 0.55], [1, 0]);
  const coreScale = useTransform(scrollYProgress, [0.1, 0.55, 1], [0.8, 1.1, 0.72]);
  const haloOpacity = useTransform(scrollYProgress, [0.2, 0.55, 1], [0.15, 0.55, 0.1]);
  const finaleY = useTransform(scrollYProgress, [0.5, 1], [60, -40]);

  return (
    <section id="convergencia" ref={ref} className="relative py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <ChapterHeading
          eyebrow="07 — Convergencia"
          title="Cuando todo se conecta, aparece el ecosistema."
          text="Capital. Personas. Comercio. Tecnología. Cada unidad nació con un propósito distinto. Juntas forman una estructura mayor."
        />

        {/* Convergence stage */}
        <div className="relative mt-16 h-[320px] md:h-[420px]">
          <motion.div
            style={{ opacity: haloOpacity }}
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--brand-ao)/0.5)] blur-3xl"
          />
          {marks.map((m) => (
            <motion.div
              key={m.alt}
              style={{
                x: useTransform(pull, (v) => v * m.from.x),
                y: useTransform(pull, (v) => v * m.from.y),
                opacity: useTransform(pull, [1, 0.15], [0.35, 1]),
                scale: useTransform(pull, [1, 0], [0.8, 0.62]),
              }}
              className={`absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16 rounded-2xl p-2 ${m.bg} border border-border/40`}
            >
              <img src={m.src} alt={m.alt} className="h-full w-full object-contain" loading="lazy" />
            </motion.div>
          ))}
          <motion.div
            style={{ scale: coreScale }}
            className="absolute left-1/2 top-1/2 -ml-16 -mt-16 h-32 w-32 rounded-full border border-[hsl(var(--brand-ao)/0.45)] bg-black/70 backdrop-blur-md p-5"
          >
            <img src={aoLogo} alt="A&O Ecosystem" className="h-full w-full object-contain" />
          </motion.div>
        </div>

        <motion.div style={{ y: finaleY }} className="mt-14 md:mt-20">
          <ChapterHeading
            eyebrow="08 — A&O Ecosystem"
            title="No es una marca. Es una estructura."
            text="A&O Ecosystem conecta negocios, tecnología, talento y oportunidades para construir lo que viene después."
            accent="hsl(var(--brand-ao))"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Convergence;
