import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Zap, Brain, TrendingUp } from "lucide-react";

const items = [
  { icon: Brain, label: "Educación diaria" },
  { icon: TrendingUp, label: "Señales y análisis" },
  { icon: Zap, label: "Mentalidad y sistemas" },
];

const FreeOffer = () => {
  return (
    <section id="oferta-libre" className="relative py-32 bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Entrada libre
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
            Empieza en el <span className="text-gradient-gold">GT de Inverfact</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Acceso gratuito a la comunidad en Telegram. Educación, señales y mentalidad
            — la puerta de entrada al ecosistema A&O.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {items.map((it) => (
              <span
                key={it.label}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm"
              >
                <it.icon className="h-4 w-4 text-primary" />
                {it.label}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild variant="hero" size="xl">
              <a href="#contacto">
                <Send className="h-5 w-5" /> Unirme al grupo gratis
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Sin tarjeta. Sin compromiso. Solo valor real.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeOffer;