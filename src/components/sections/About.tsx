import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Building2 } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "01 · Activar",
    desc: "Inverfact — educación financiera real (generar, multiplicar, proteger) + NomadHive, sistema selectivo de talento remoto por niveles.",
    color: "hsl(var(--brand-inverfact))",
  },
  {
    icon: TrendingUp,
    title: "02 · Generar",
    desc: "ANMA Soluciones — nuevo modelo de e-commerce: contenido orgánico, comunidad y lanzamientos en 5 fases tipo infomercial.",
    color: "hsl(var(--brand-anma))",
  },
  {
    icon: Building2,
    title: "03 · Escalar",
    desc: "A&O Ecosystem — diagnóstico, posicionamiento y sistemas de marketing y ventas para escalar empresas con estructura.",
    color: "hsl(var(--brand-ao))",
  },
];

const About = () => {
  return (
    <section id="ecosistema" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            El ecosistema
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
            No vendemos cursos.
            <br />
            <span className="text-gradient-gold">Construimos sistemas</span> que generan resultados.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Un camino claro en tres etapas: <span className="text-foreground">activa</span> tu mentalidad y
            primer ingreso, <span className="text-foreground">genera</span> ventas con sistemas y
            <span className="text-foreground"> escala</span> tu empresa con estructura.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative glass rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1"
              style={{ borderColor: `${p.color}` }}
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl mb-5 border"
                style={{ background: `${p.color}1f`, color: p.color, borderColor: `${p.color}55` }}
              >
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;