import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ParallaxLayer from "@/components/ParallaxLayer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Briefcase, Target, Cog, BarChart3 } from "lucide-react";
import aoLogoAsset from "@/assets/logo-ao-light.png.asset.json";
const aoLogo = aoLogoAsset.url;

const Scaling = () => {
  return (
    <section id="escalamiento" className="relative py-32 bg-gradient-dark overflow-hidden">
      {/* Red accent ambient */}
      <ParallaxLayer speed={0.7} className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[hsl(var(--brand-ao)/0.12)] blur-3xl">
        <span />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal direction="blur" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em]">
              <span className="text-[hsl(var(--brand-ao))]">Etapa 03</span>
              <span className="h-px w-10 bg-[hsl(var(--brand-ao)/0.6)]" />
              <span className="text-muted-foreground">Escalamiento</span>
            </div>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-tight">
              Escala tu <span className="text-[hsl(var(--brand-ao))]">empresa</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Cuando ya generas ingresos, el siguiente paso es estructurar.
            Marketing, automatización y sistemas para escalar con orden.
          </p>
        </Reveal>

        <motion.article
          initial={{ opacity: 0, y: 60, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-ao)/0.3)] bg-black/60 backdrop-blur-md"
        >
          {/* Corporate frame */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--brand-ao))] to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--brand-ao)/0.5)] to-transparent" />
          </div>

          <div className="relative grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[hsl(var(--brand-ao)/0.2)] flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="h-24 w-24 rounded-full bg-black border border-[hsl(var(--brand-ao)/0.4)] p-2 flex items-center justify-center">
                  <img src={aoLogo} alt="A&O Ecosystem" className="h-full w-full object-contain" />
                </div>
                <span className="font-display text-xs text-muted-foreground">03 / A</span>
              </div>
              <div className="mt-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--brand-ao))]">
                  Consultoría empresarial
                </span>
                <h3 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-[0.95]">
                  A&O<br />ECOSYSTEM
                </h3>
                <p className="mt-5 text-sm text-muted-foreground">
                  Marketing · Automatización · Estructura estratégica
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 p-10 lg:p-12">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Ayudamos a empresas a escalar con marketing inteligente,
                automatización de procesos y una estructura estratégica clara.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { i: Briefcase, t: "Mentoría empresarial", d: "Acompañamiento ejecutivo para fundadores y equipos." },
                  { i: Target, t: "Posicionamiento de marca", d: "Diagnóstico, narrativa y estrategia de mercado." },
                  { i: Cog, t: "Optimización de procesos", d: "Automatización y eficiencia operativa." },
                  { i: BarChart3, t: "Crecimiento estructurado", d: "Sistemas de marketing y ventas medibles." },
                ].map((b) => (
                  <div key={b.t} className="flex gap-4 items-start group/item p-3 rounded-xl hover:bg-[hsl(var(--brand-ao)/0.06)] transition-colors">
                    <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--brand-ao)/0.12)] text-[hsl(var(--brand-ao))] border border-[hsl(var(--brand-ao)/0.3)]">
                      <b.i className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{b.t}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-[hsl(var(--brand-ao)/0.2)] flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm italic text-foreground/80 max-w-md">
                  "Construimos sistemas que escalan empresas, no solo ideas."
                </p>
                <Button asChild className="bg-[hsl(var(--brand-ao))] hover:bg-[hsl(var(--brand-ao)/0.9)] text-white font-semibold">
                  <a href="#contacto">
                    Solicitar asesoría <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default Scaling;