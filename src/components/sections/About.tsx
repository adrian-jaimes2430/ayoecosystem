import { motion, useInView } from "framer-motion";
import { lazy, Suspense, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import type { OrbUnit } from "@/components/three/EcosystemOrbs";
import { Sparkles, TrendingUp, Building2 } from "lucide-react";

const EcosystemOrbs = lazy(() => import("@/components/three/EcosystemOrbs"));

const orbUnits: OrbUnit[] = [
  { id: "inverfact", label: "Inverfact", color: "#ff8a00", href: "/inverfact", shape: "icosahedron" },
  { id: "nomadhive", label: "NomadHive", color: "#00e08a", href: "/nomadhive", shape: "torus" },
  { id: "anma", label: "ANMA", color: "#ff6a00", href: "/anma", shape: "octahedron" },
  { id: "ao", label: "A&O", color: "#e8252b", href: "#escalamiento", shape: "box" },
];


const pillars = [
  {
    icon: Sparkles,
    title: "01 · Activar",
    desc: "Inverfact — educación financiera real (generar, multiplicar, proteger) + NomadHive, sistema selectivo de talento remoto por niveles.",
    color: "hsl(var(--brand-inverfact))",
  },
  {
    icon: TrendingUp,
    title: "02 · Generar",
    desc: "ANMA Soluciones — nuevo modelo de e-commerce: contenido orgánico, comunidad y lanzamientos en 5 fases tipo infomercial.",
    color: "hsl(var(--brand-anma))",
  },
  {
    icon: Building2,
    title: "03 · Escalar",
    desc: "A&O Ecosystem — diagnóstico, posicionamiento y sistemas de marketing y ventas para escalar empresas con estructura.",
    color: "hsl(var(--brand-ao))",
  },
];

const About = () => {
  const navigate = useNavigate();
  const orbsRef = useRef<HTMLDivElement>(null);
  const orbsInView = useInView(orbsRef, { amount: 0.15 });

  const handleSelect = useCallback(
    (u: OrbUnit) => {
      if (u.href.startsWith("#")) {
        document.querySelector(u.href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(u.href);
      }
    },
    [navigate],
  );

  return (
    <section id="ecosistema" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal direction="blur" className="max-w-3xl">
          <TextReveal
            as="span"
            text="El ecosistema"
            className="block text-xs uppercase tracking-[0.3em] text-primary"
          />
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
            <TextReveal as="span" text="No vendemos cursos." className="block" delay={0.05} />
            <span className="block">
              <TextReveal as="span" text="Construimos sistemas" className="text-primary" delay={0.15} />
              <TextReveal as="span" text=" que generan resultados." delay={0.25} />
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Un camino claro en tres etapas: <span className="text-foreground">activa</span> tu mentalidad y
            primer ingreso, <span className="text-foreground">genera</span> ventas con sistemas y
            <span className="text-foreground"> escala</span> tu empresa con estructura.
          </p>
        </Reveal>

        {/* Interactive 3D objects — one per business unit */}
        <div ref={orbsRef} className="mt-14 h-[300px] sm:h-[360px] -mx-6 sm:mx-0">
          <Suspense fallback={null}>
            <EcosystemOrbs units={orbUnits} onSelect={handleSelect} active={orbsInView} />
          </Suspense>
        </div>


        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative glass rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1"
              style={{ borderColor: `${p.color}` }}
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-5 border"
                style={{ background: `${p.color}1f`, color: p.color, borderColor: `${p.color}55` }}
              >
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;