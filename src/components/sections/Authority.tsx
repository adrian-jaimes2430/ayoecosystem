import { motion } from "framer-motion";
import { Target, Eye, Compass } from "lucide-react";

const blocks = [
  {
    icon: Target,
    title: "Misión",
    text: "Construir un ecosistema que multiplique las oportunidades reales de crecimiento financiero y empresarial.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Ser la referencia en sistemas de transformación financiera y empresarial en Latinoamérica.",
  },
  {
    icon: Compass,
    title: "Principios",
    text: "Claridad, ejecución, autoridad y resultados medibles. Cero promesas, cien por ciento estrategia.",
  },
];

const Authority = () => {
  return (
    <section className="relative py-32 bg-gradient-dark">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Autoridad & visión
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Construido por operadores.
              <br />
              <span className="text-gradient-gold">Para operadores.</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              A&O Ecosystem nace de la operación real: años aplicando estrategias de
              inversión, ventas y posicionamiento que hoy sistematizamos para emprendedores
              y profesionales que quieren crecer en serio.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { k: "+5", v: "Años en mercados" },
                { k: "+50", v: "Negocios asesorados" },
                { k: "1", v: "Comunidad en crecimiento" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
                    {s.k}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4">
            {blocks.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 flex gap-5 items-start hover:border-primary/30 transition-colors"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <b.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{b.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;