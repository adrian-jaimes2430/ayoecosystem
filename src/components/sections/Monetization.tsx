import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ParallaxLayer from "@/components/ParallaxLayer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Megaphone, Users, Rocket, Repeat } from "lucide-react";
import { Link } from "react-router-dom";
import anmaLogo from "@/assets/logo-anma.png";

const Monetization = () => {
  return (
    <section id="monetizacion" className="relative py-32">
      <ParallaxLayer speed={0.4} className="absolute inset-0 -z-10 grid-bg opacity-30">
        <span />
      </ParallaxLayer>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal direction="blur" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em]">
              <span className="text-[hsl(var(--brand-anma))]">Etapa 02</span>
              <span className="h-px w-10 bg-[hsl(var(--brand-anma)/0.6)]" />
              <span className="text-muted-foreground">Monetización</span>
            </div>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-tight">
              Genera <span className="text-[hsl(var(--brand-anma))]">ingresos reales</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Un nuevo modelo de e-commerce: contenido orgánico, comunidad activa
            y lanzamientos tipo infomercial que sí venden.
          </p>
        </Reveal>

        <motion.article
          initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-anma)/0.25)] bg-card/60 backdrop-blur-md hover:border-[hsl(var(--brand-anma)/0.6)] transition-all duration-500"
        >
          <ParallaxLayer speed={0.6} className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-[hsl(var(--brand-anma)/0.18)] blur-3xl">
            <span />
          </ParallaxLayer>
          <div className="relative grid lg:grid-cols-5 gap-0">
            {/* Left brand panel */}
            <div className="lg:col-span-2 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-border/40 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="h-20 w-20 rounded-2xl bg-white p-2 flex items-center justify-center">
                  <img src={anmaLogo} alt="ANMA Soluciones" className="h-full w-full object-contain" />
                </div>
                <span className="font-display text-xs text-muted-foreground">02 / A</span>
              </div>
              <div className="mt-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--brand-anma))]">
                  E-commerce · Ventas digitales
                </span>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
                  ANMA<br />SOLUCIONES
                </h3>
                <p className="mt-4 text-sm italic text-foreground/80">
                  "No vendemos productos sueltos. Lanzamos eventos que venden."
                </p>
              </div>
            </div>

            {/* Right detail panel */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Rompemos con el dropshipping tradicional. ANMA opera con
                contenido orgánico, comunidad y lanzamientos en 5 fases que
                concentran demanda y disparan ventas.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  { i: Megaphone, t: "Contenido orgánico", d: "Tracción real sin depender de pauta fría" },
                  { i: Users, t: "Comunidad activa", d: "Audiencia que confía, comenta y compra" },
                  { i: Rocket, t: "Lanzamientos en 5 fases", d: "Pre-calentamiento, evento, 72h, 7 días, salida" },
                  { i: Repeat, t: "3 caminos de entrada", d: "Comprador, dropshipper o proveedor" },
                ].map((b) => (
                  <div key={b.t} className="flex gap-3">
                    <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--brand-anma)/0.12)] text-[hsl(var(--brand-anma))] border border-[hsl(var(--brand-anma)/0.3)]">
                      <b.i className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{b.t}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm italic text-foreground/80 max-w-md">
                  "Adiós al dropshipping tradicional. Hola al modelo que sí escala."
                </p>
                <Button asChild className="bg-[hsl(var(--brand-anma))] hover:bg-[hsl(var(--brand-anma)/0.9)] text-black font-semibold">
                  <Link to="/anma">
                    Más información <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default Monetization;