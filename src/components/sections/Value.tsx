import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { Check, X } from "lucide-react";
import TextReveal from "@/components/TextReveal";

const them = [
  "Promesas de riqueza fácil",
  "Cursos motivacionales sin estructura",
  "Gurús sin sistemas reales",
  "Información dispersa y genérica",
];
const us = [
  "Sistemas operativos para tu negocio",
  "Mentoría con resultados medibles",
  "Estrategias aplicadas a tu contexto",
  "Ecosistema integrado: educación + consultoría + tools",
];

const Value = () => {
  return (
    <section id="valor" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal direction="blur" className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Propuesta de valor
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            <TextReveal text="Resultados, no" /> <span className="line-through text-muted-foreground/60">motivación</span>.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            La diferencia entre sentirte productivo y crecer realmente está en el sistema que ejecutas.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-16 md:grid-cols-2 md:gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card/40 p-5 sm:p-8 md:rounded-3xl"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              El resto del mercado
            </div>
            <ul className="space-y-4">
              {them.map((t) => (
                <li key={t} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl p-5 shadow-gold glass sm:p-8 md:rounded-3xl"
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-6 relative">
              A&O Ecosystem
            </div>
            <ul className="space-y-4 relative">
              {us.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-gold text-primary-foreground shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Value;