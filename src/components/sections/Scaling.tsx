import { lazy, Suspense, useRef } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { BarChart3, Briefcase, Cog, Target } from "lucide-react";
import ChapterHeading from "@/components/ChapterHeading";
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
  const x = useTransform(progress, [0.35, 0.72], [mark.x, 0]);
  const y = useTransform(progress, [0.35, 0.72], [mark.y, 0]);
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
    <section id="escalamiento" ref={ref} className="relative min-h-[360svh]">
      <div className="sticky top-0 min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)/0.38),transparent_72%)]" />
        <motion.div
          style={{ opacity: modelOpacity, scale: modelScale }}
          className="pointer-events-auto absolute inset-y-0 right-0 w-full md:w-[58%]"
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

        <motion.div style={{ opacity: systemsOpacity, y: systemsY }} className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-xl">
              <ChapterHeading
                eyebrow="06 — Sistemas"
                title="Y entonces construimos las herramientas."
                text="A&O System Tools reúne las soluciones que permiten organizar, automatizar, medir y multiplicar lo que ocurre dentro del ecosistema."
                accent="hsl(var(--brand-ao))"
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service.title} className="flex gap-3 border-l border-foreground/15 pl-3">
                    <service.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{service.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{service.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: convergenceOpacity }} className="absolute inset-0 flex items-center">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-[1fr_1.1fr]">
            <ChapterHeading
              eyebrow="07 — Convergencia"
              title="Cuando todo se conecta, aparece el ecosistema."
              text="Capital. Personas. Comercio. Tecnología. Cada unidad nació con un propósito distinto. Juntas forman una estructura mayor."
            />
            <div className="relative h-[42svh] min-h-[320px]">
              <motion.div style={{ scale: coreScale }} className="absolute left-1/2 top-1/2 -ml-16 -mt-16 flex h-32 w-32 items-center justify-center border border-primary/40 bg-background/55 p-5 backdrop-blur-md">
                <img src={aoLogo} alt="A&O Ecosystem" className="h-full w-full object-contain" />
              </motion.div>
              {marks.map((mark) => <ConvergingMark key={mark.alt} mark={mark} progress={scrollYProgress} />)}
            </div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: finaleOpacity, y: finaleY }} className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
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