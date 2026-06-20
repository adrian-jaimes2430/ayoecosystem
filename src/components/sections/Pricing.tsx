import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";

const plans = [
  {
    name: "Mentoría Inverfact",
    tag: "Finanzas e inversión",
    desc: "Acompañamiento personal para construir tu sistema de finanzas e inversión.",
    features: [
      "Diagnóstico financiero personal",
      "Plan de inversión a medida",
      "Sesiones 1:1 de mentoría",
      "Acceso a herramientas internas",
    ],
    cta: "Aplicar a mentoría",
  },
  {
    name: "Consultoría A&O",
    tag: "Crecimiento empresarial",
    desc: "Para PyMEs que quieren un sistema real de marketing, ventas y posicionamiento.",
    features: [
      "Diagnóstico estratégico completo",
      "Sistema de ventas y marca",
      "Implementación con tu equipo",
      "Soporte continuo trimestral",
    ],
    cta: "Solicitar diagnóstico",
    featured: true,
  },
  {
    name: "Tools & Programas",
    tag: "Productos digitales",
    desc: "Cursos, dashboards y herramientas listas para implementar.",
    features: [
      "Dashboard de finanzas personales",
      "Programas de educación intensivos",
      "Plantillas y sistemas operativos",
      "Acceso al ecosistema completo",
    ],
    cta: "Ver programas",
  },
];

const Pricing = () => {
  return (
    <section id="mentoria" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal direction="blur" className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Programas premium
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
            Transformación con <span className="text-gradient-gold">claridad</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Trabajamos contigo para implementar el sistema correcto, en el orden correcto.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                p.featured
                  ? "bg-gradient-to-b from-primary/15 to-card border border-primary/40 shadow-gold"
                  : "glass"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gradient-gold text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-gold">
                  <Crown className="h-3 w-3" /> Más solicitado
                </span>
              )}
              <span className="text-xs uppercase tracking-[0.25em] text-primary">{p.tag}</span>
              <h3 className="mt-3 font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>

              <ul className="mt-6 space-y-3 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={p.featured ? "hero" : "outline"}
                className="mt-8 w-full"
              >
                <a href="#contacto">{p.cta}</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;