import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, GraduationCap, Laptop, TrendingUp, Workflow, Wallet, Network } from "lucide-react";
import { Link } from "react-router-dom";
import inverfactLogo from "@/assets/logo-inverfact.png";
import nomadhiveLogo from "@/assets/logo-nomadhive.png";

const Activation = () => {
  return (
    <section id="activacion" className="relative py-32 bg-gradient-dark">
      <div className="mx-auto max-w-6xl px-6">
        {/* Stage header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em]">
              <span className="text-[hsl(var(--brand-inverfact))]">Etapa 01</span>
              <span className="h-px w-10 bg-[hsl(var(--brand-inverfact)/0.6)]" />
              <span className="text-muted-foreground">Activación</span>
            </div>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-tight">
              Empieza <span className="text-[hsl(var(--brand-inverfact))]">desde cero</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Activa tu mentalidad, aprende a manejar tu dinero y construye tu primer
            sistema de ingreso digital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* INVERFACT */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-inverfact)/0.25)] bg-card/60 backdrop-blur-md p-8 hover:border-[hsl(var(--brand-inverfact)/0.6)] transition-all duration-500"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[hsl(var(--brand-inverfact)/0.18)] blur-3xl" />
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-white p-1.5 flex items-center justify-center">
                    <img src={inverfactLogo} alt="Inverfact" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">INVERFACT</h3>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--brand-inverfact))]">
                      Educación financiera
                    </span>
                  </div>
                </div>
                <span className="font-display text-xs text-muted-foreground">01 / A</span>
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                Educación financiera real, sin humo. Aprende a generar,
                multiplicar y proteger tu dinero con un sistema probado.
              </p>

              <ul className="mt-6 space-y-3 text-sm flex-1">
                {[
                  { i: GraduationCap, t: "Mentoría 1:1 con inversionistas activos" },
                  { i: Wallet, t: "Sistema: generar, multiplicar, proteger" },
                  { i: TrendingUp, t: "Comunidad privada + herramientas de tracking" },
                ].map((b) => (
                  <li key={b.t} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-inverfact)/0.12)] text-[hsl(var(--brand-inverfact))] border border-[hsl(var(--brand-inverfact)/0.3)]">
                      <b.i className="h-4 w-4" />
                    </span>
                    <span>{b.t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                <p className="text-sm italic text-foreground/80 max-w-[60%]">
                  "Si no sabes manejar tu dinero, nunca vas a crecer."
                </p>
                <Button asChild className="bg-[hsl(var(--brand-inverfact))] hover:bg-[hsl(var(--brand-inverfact)/0.9)] text-black font-semibold">
                  <Link to="/inverfact">
                    Más información <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.article>

          {/* NOMADHIVE */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-nomad)/0.25)] bg-card/60 backdrop-blur-md p-8 hover:border-[hsl(var(--brand-nomad)/0.6)] transition-all duration-500"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[hsl(var(--brand-nomad)/0.18)] blur-3xl" />
            {/* tech grid accent */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--brand-nomad)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--brand-nomad)) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative flex flex-col h-full">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-black p-1.5 flex items-center justify-center border border-[hsl(var(--brand-nomad)/0.3)]">
                    <img src={nomadhiveLogo} alt="NomadHive" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">NOMADHIVE</h3>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--brand-nomad))]">
                      Trabajo remoto · Ingresos digitales
                    </span>
                  </div>
                </div>
                <span className="font-display text-xs text-muted-foreground">01 / B</span>
              </div>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                Sistema estructurado de talento remoto del ecosistema A&O.
                Selección, formación y crecimiento por desempeño.
              </p>

              <ul className="mt-6 space-y-3 text-sm flex-1">
                {[
                  { i: Laptop, t: "Proceso de selección en 6 etapas" },
                  { i: Workflow, t: "Formación en ventas, cierre y WhatsApp Business" },
                  { i: Network, t: "Crecimiento por niveles: Junior → Staff Matriz" },
                ].map((b) => (
                  <li key={b.t} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--brand-nomad)/0.12)] text-[hsl(var(--brand-nomad))] border border-[hsl(var(--brand-nomad)/0.3)]">
                      <b.i className="h-4 w-4" />
                    </span>
                    <span>{b.t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                <p className="text-sm italic text-foreground/80 max-w-[60%]">
                  "Ingresos por estructura y desempeño, no por suerte."
                </p>
                <Button asChild className="bg-[hsl(var(--brand-nomad))] hover:bg-[hsl(var(--brand-nomad)/0.9)] text-black font-semibold">
                  <Link to="/nomadhive">
                    Explorar oportunidades <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Activation;