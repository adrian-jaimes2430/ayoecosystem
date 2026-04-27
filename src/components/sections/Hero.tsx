import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-ecosystem.jpg";

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
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 bg-radial-gold" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <div className="mx-auto max-w-6xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Multi-brand business ecosystem
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
            Construimos
            <br />
            <span className="text-gradient-gold">sistemas</span> que
            <br />
            generan resultados.
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Un ecosistema diseñado para escalar tu libertad financiera y tu negocio.
            Educación, mentoría, consultoría y herramientas — bajo un solo sistema.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="hero" size="xl">
              <a href="#contacto">
                Acceder al ecosistema <ArrowRight className="ml-1" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#unidades">Ver unidades de negocio</a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 md:gap-12 max-w-lg">
            {[
              { k: "4", v: "Unidades de negocio" },
              { k: "100%", v: "Enfocado en resultados" },
              { k: "0", v: "Promesas vacías" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
                  {s.k}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground text-xs">
        <span className="uppercase tracking-[0.3em]">Scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;