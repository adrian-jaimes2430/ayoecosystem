import { lazy, Suspense, useRef } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { BarChart3, Briefcase, Cog, Target } from "lucide-react";
import ChapterHeading from "@/components/ChapterHeading";
import { useIsMobile } from "@/hooks/use-mobile";
import inverfactLogo from "@/assets/logo-inverfact.png";
import nomadhiveLogo from "@/assets/logo-nomadhive.png";
import anmaLogo from "@/assets/logo-anma.png";

const UnitObject = lazy(() => import("@/components/three/UnitObject"));
const aoLogo = "/logo-ao-light.png";

const services = [
  { icon: Briefcase, title: "Arquitectura empresarial", text: "Estructura estratégica para fundadores y equipos." },
  { icon: Target, title: "Posicionamiento de marca", text: "Diagnóstico, narrativa y estrategia de mercado." },
  { icon: Cog, title: "Optimización de procesos", text: "Automatización y eficiencia operativa." },
  { icon: BarChart3, title: "Crecimiento estructurado", text: "Sistemas de marketing y ventas medibles." },
];

const marks = [
  { src: inverfactLogo, alt: "Inverfact", x: -190, y: -90, tone: "bg-foreground" },
  { src: nomadhiveLogo, alt: "NomadHive", x: 190, y: -80, tone: "bg-background/80" },
  { src: anmaLogo, alt: "ANMA Soluciones", x: 0, y: 145, tone: "bg-foreground" },
];

const ConvergingMark = ({ mark, progress }: { mark: (typeof marks)[number]; progress: MotionValue<number> }) => {
  const isMobile = useIsMobile();
  const x = useTransform(progress, [0.35, 0.72], [isMobile ? mark.x * 0.58 : mark.x, 0]);
  const y = useTransform(progress, [0.35, 0.72], [isMobile ? mark.y * 0.7 : mark.y, 0]);
  const opacity = useTransform(progress, [0.25, 0.42, 0.75, 0.92], [0, 1, 0.8, 0]);
  const scale = useTransform(progress, [0.35, 0.72], [1, 0.62]);

  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className={`absolute left-1/2 top-1/2 -ml-8 -mt-8 flex h-16 w-16 items-center justify-center border border-foreground/15 p-2 ${mark.tone}`}
    >
      <img src={mark.src} alt={mark.alt} className="h-full w-full object-contain" loading="lazy" />
    </motion.div>
  );
};

/** Chapters 06–08 share one pinned sequence: systems become convergence. */
const Scaling = () => {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const active = useInView(ref, { amount: 0.06 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const systemsOpacity = useTransform(scrollYProgress, [0, 0.32, 0.4], [1, 1, 0]);
  const systemsY = useTransform(scrollYProgress, [0, 0.32, 0.4], [0, 0, -45]);
  const convergenceOpacity = useTransform(scrollYProgress, [0.4, 0.48, 0.78, 0.86], [0, 1, 1, 0]);
  const finaleOpacity = useTransform(scrollYProgress, [0.86, 0.92, 1], [0, 1, 1]);
  const finaleY = useTransform(scrollYProgress, [0.76, 1], [48, 0]);
  const coreScale = useTransform(scrollYProgress, [0.32, 0.68, 1], [0.8, 1.15, 0.78]);
  const modelScale = useTransform(scrollYProgress, [0, 0.28, 0.52], [0.9, 1, 0.72]);
  const modelOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);

  return (
    <section id="escalamiento" ref={ref} className="relative min-h-[320svh] md:min-h-[360svh]">
      <div className="sticky top-0 min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)/0.38),transparent_72%)]" />
        <motion.div
          style={{ opacity: modelOpacity, scale: modelScale }}
          className="pointer-events-auto absolute inset-x-0 top-0 h-[45svh] md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[58%]"
        >
          <Suspense fallback={null}>
            <UnitObject
              modelUrl="/ao-logo-3d.glb"
              shape="box"
              color="#e8252b"
              active={active}
              className="h-full w-full"
            />
          </Suspense>
        </motion.div>

        <motion.div style={{ opacity: systemsOpacity, y: systemsY }} className="absolute inset-0 flex items-end pb-12 pt-[34svh] md:items-center md:py-0">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-xl rounded-2xl bg-background/55 p-4 backdrop-blur-sm md:bg-transparent md:p-0 md:backdrop-blur-none">
              <ChapterHeading
                eyebrow="06 — Sistemas"
                title="Y entonces construimos las herramientas."
                text="A&O System Tools reúne las soluciones que permiten organizar, automatizar, medir y multiplicar lo que ocurre dentro del ecosistema."
                accent="hsl(var(--brand-ao))"
              />
              <div className="mt-5 grid grid-cols-2 gap-3 md:mt-8">
                {services.map((service) => (
                  <div key={service.title} className="flex gap-3 border-l border-foreground/15 pl-3">
                    <service.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-medium sm:text-sm">{service.title}</p>
                      <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">{service.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: convergenceOpacity }} className="absolute inset-0 flex items-center">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-3 px-4 sm:px-6 md:grid-cols-[1fr_1.1fr] md:gap-8">
            <ChapterHeading
              eyebrow="07 — Convergencia"
              title="Cuando todo se conecta, aparece el ecosistema."
              text="Capital. Personas. Comercio. Tecnología. Cada unidad nació con un propósito distinto. Juntas forman una estructura mayor."
            />
            <div className="relative h-[34svh] min-h-[230px] md:h-[42svh] md:min-h-[320px]">
              <motion.div style={{ scale: coreScale }} className="absolute left-1/2 top-1/2 -ml-14 -mt-14 flex h-28 w-28 items-center justify-center border border-primary/40 bg-background/55 p-5 backdrop-blur-md md:-ml-16 md:-mt-16 md:h-32 md:w-32">
                <img src={aoLogo} alt="A&O Ecosystem" className="h-full w-full object-contain" />
              </motion.div>
              {marks.map((mark) => <ConvergingMark key={mark.alt} mark={mark} progress={scrollYProgress} />)}
            </div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: finaleOpacity, y: finaleY }} className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <ChapterHeading
                eyebrow="08 — A&O Ecosystem"
                title="No es una marca. Es una estructura."
                text="A&O Ecosystem conecta negocios, tecnología, talento y oportunidades para construir lo que viene después."
                accent="hsl(var(--brand-ao))"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Scaling;