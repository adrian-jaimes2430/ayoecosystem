import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Megaphone, Cpu } from "lucide-react";

const pillars = [
  { icon: GraduationCap, title: "Educación financiera", desc: "Inverfact — formación en inversión y mentalidad." },
  { icon: Briefcase, title: "Consultoría empresarial", desc: "Estrategia, posicionamiento y ventas para PyMEs." },
  { icon: Megaphone, title: "Marketing & marca", desc: "Sistemas de crecimiento y autoridad digital." },
  { icon: Cpu, title: "Software (próximo)", desc: "Herramientas de automatización para emprendedores." },
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
            A&O Ecosystem integra cuatro unidades estratégicas que trabajan juntas
            para acelerar tu crecimiento personal, financiero y empresarial.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative glass rounded-3xl p-7 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-primary-foreground shadow-gold mb-5">
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