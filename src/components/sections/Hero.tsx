import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-ecosystem.jpg";
import founder from "@/assets/founder.png";
import logoAO from "@/assets/logo-ao.png";

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-28">
      {/* Background visual */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Ecosistema de crecimiento financiero y empresarial A&O"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute inset-0 bg-radial-gold opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--brand-ao))]" />
            Business ecosystem · A&O
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight">
            Genera ingresos desde cero.
            <br />
            <span className="text-gradient-gold text-destructive">Escala tu vida.</span>
            <br />
            Con un sistema probado.
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Accede gratis al grupo privado donde te mostraremos cómo generar ingresos reales paso a paso,
            escala tu vida o negocio - desde cero al éxito sin atajos ni humo.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="hero" size="xl">
              <a href="#activacion">
                Empezar ahora <ArrowRight className="ml-1" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="https://wa.me/573204836063?text=Hola,%20quiero%20acceder%20al%20grupo%20A&O">
                Acceder al sistema
              </a>
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-[hsl(var(--brand-inverfact))]">01 Activar</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-[hsl(var(--brand-anma))]">02 Generar</span>
            <span className="h-px w-8 bg-border" />
            <span className="text-[hsl(var(--brand-ao))]">03 Escalar</span>
          </div>
        </motion.div>

        {/* Founder visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative order-1 lg:order-2 max-w-sm mx-auto w-full"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass shadow-elegant">
            <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--brand-ao)/0.25)] via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src={founder}
              alt="Fundador de A&O Ecosystem"
              width={497}
              height={1024}
              className="h-full w-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background via-background/70 to-transparent z-20">
              <div className="flex items-center gap-3">
                <img src={logoAO} alt="A&O" className="h-10 w-10 rounded-full bg-black/60 p-1" />
                <div>
                  <div className="font-display font-semibold text-sm leading-tight">Adrián Jaimes</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-primary/90 mt-0.5">CEO & Fundier</div>
                  <div className="text-xs text-muted-foreground">Company A&O Ecosystem S.A.S</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[hsl(var(--brand-ao)/0.15)] blur-3xl" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground text-xs">
        <span className="uppercase tracking-[0.3em]">Pasos de exito</span>
        <span className="block h-10 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
