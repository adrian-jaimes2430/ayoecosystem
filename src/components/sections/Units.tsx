import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import inverfact from "@/assets/brand-inverfact.jpg";
import consulting from "@/assets/brand-consulting.jpg";
import software from "@/assets/brand-software.jpg";

const units = [
  {
    tag: "Educación financiera",
    name: "INVERFACT",
    img: inverfact,
    pitch: "Finanzas personales, inversión y mentalidad. Mentoría, herramientas y comunidad.",
    bullets: ["Mentoría de inversión", "Educación financiera real", "Acceso libre vía Telegram (GT)"],
    cta: { label: "Unirme al GT", href: "#oferta-libre" },
  },
  {
    tag: "Consultoría",
    name: "A&O CONSULTING",
    img: consulting,
    pitch: "Diagnóstico, estrategia, posicionamiento y sistemas de ventas para PyMEs.",
    bullets: ["Diagnóstico empresarial", "Estrategia de crecimiento", "Sistemas de ventas y marca"],
    cta: { label: "Aplicar a consultoría", href: "#contacto" },
  },
  {
    tag: "Software (próximo)",
    name: "A&O TOOLS",
    img: software,
    pitch: "Herramientas SaaS para emprendedores: CRM, tracking, productividad y automatización.",
    bullets: ["CRM ligero", "Tracking financiero", "Automatización de procesos"],
    cta: { label: "Lista de espera", href: "#contacto" },
  },
];

const Units = () => {
  return (
    <section id="unidades" className="relative py-32 bg-gradient-dark">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Unidades de negocio
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
              Tres marcas. <span className="text-gradient-gold">Un sistema.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Cada unidad tiene un propósito claro. Juntas forman el ecosistema completo de transformación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {units.map((u, i) => (
            <motion.article
              key={u.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl glass shadow-elegant hover:shadow-gold transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={u.img}
                  alt={`${u.name} — ${u.tag}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] text-primary glass px-3 py-1 rounded-full">
                  {u.tag}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {u.name}
                </h3>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  {u.pitch}
                </p>
                <ul className="mt-5 space-y-2 text-sm flex-1">
                  {u.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="ghost" className="mt-6 self-start text-primary hover:text-primary hover:bg-primary/10 -ml-3">
                  <a href={u.cta.href}>
                    {u.cta.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Units;