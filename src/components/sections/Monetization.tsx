import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ShoppingBag, Truck, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import anmaLogo from "@/assets/logo-anma.png";

const Monetization = () => {
  return (
    <section id="monetizacion" className="relative py-32">
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
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
            Convierte conocimiento en ventas con sistemas de e-commerce optimizados
            y estrategias de conversión probadas.
          </p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-anma)/0.25)] bg-card/60 backdrop-blur-md hover:border-[hsl(var(--brand-anma)/0.6)] transition-all duration-500"
        >
          <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-[hsl(var(--brand-anma)/0.18)] blur-3xl" />
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
                  "Aquí lo encuentras todo."
                </p>
              </div>
            </div>

            {/* Right detail panel */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Vende productos online con sistemas optimizados, logística integrada
                y estrategias de conversión orientadas a resultados.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  { i: ShoppingBag, t: "Catálogo listo para vender", d: "Productos digitales y físicos seleccionados" },
                  { i: Truck, t: "Logística integrada", d: "Dropshipping y fulfillment optimizado" },
                  { i: Target, t: "Estrategias de conversión", d: "Funnels y campañas que convierten" },
                  { i: Zap, t: "Sistemas automatizados", d: "Ventas que escalan sin tu tiempo" },
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
                  "Lanza y escala ventas online con sistemas comprobados."
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