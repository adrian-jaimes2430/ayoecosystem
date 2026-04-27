import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, ShoppingBag, Laptop, Briefcase, Cpu } from "lucide-react";
import inverfact from "@/assets/brand-inverfact.jpg";
import anma from "@/assets/brand-anma.jpg";
import nomadhive from "@/assets/brand-nomadhive.jpg";
import consulting from "@/assets/brand-consulting.jpg";
import software from "@/assets/brand-software.jpg";

const units = [
  {
    n: "01",
    layer: "Crecimiento financiero",
    name: "INVERFACT",
    icon: TrendingUp,
    img: inverfact,
    pitch: "Finanzas personales, inversión y mentalidad. Construye sistemas reales de riqueza.",
    bullets: ["Mentoría de inversión", "Dashboards y herramientas", "Comunidad de inversionistas"],
    benefit: "Inicia tu transformación financiera y construye sistemas reales de riqueza.",
    cta: { label: "Más información", href: "#contacto" },
  },
  {
    n: "02",
    layer: "E-commerce y ventas",
    name: "ANMA SOLUCIONES",
    icon: ShoppingBag,
    img: anma,
    pitch: "Venta de productos digitales, dropshipping y marketing orientado a conversión.",
    bullets: ["Productos listos para vender", "Estrategias de venta probadas", "Sistemas de venta automatizados"],
    benefit: "Lanza y escala ventas online con sistemas comprobados.",
    cta: { label: "Explorar ANMA", href: "#contacto" },
  },
  {
    n: "03",
    layer: "Trabajo remoto e ingresos digitales",
    name: "NOMADHIVE",
    icon: Laptop,
    img: nomadhive,
    pitch: "Sistema de trabajo remoto e ingresos digitales. Construye flujos de ingreso independientes de tu ubicación.",
    bullets: ["Formación en modelos de ingreso remoto", "Oportunidades de trabajo digital", "Sistemas escalables de ingreso online"],
    benefit: "Construye sistemas de ingreso que te permitan trabajar desde cualquier lugar — no por suerte, sino por estructura.",
    cta: { label: "Conocer NOMADHIVE", href: "#contacto" },
  },
  {
    n: "04",
    layer: "Consultoría empresarial",
    name: "A&O ECOSYSTEM",
    icon: Briefcase,
    img: consulting,
    pitch: "Diagnóstico, posicionamiento, marketing y sistemas de crecimiento para empresas.",
    bullets: ["Diagnóstico empresarial", "Posicionamiento de marca", "Sistemas de marketing y ventas"],
    benefit: "Construimos sistemas que escalan empresas, no solo ideas.",
    cta: { label: "Aplicar a consultoría", href: "#contacto" },
  },
  {
    n: "05",
    layer: "Capa de innovación",
    name: "FUTURE SOFTWARE",
    icon: Cpu,
    img: software,
    pitch: "Herramientas SaaS para emprendedores: CRM, tracking, productividad y automatización.",
    bullets: ["CRM y automatización", "Tracking financiero", "Productividad para equipos"],
    benefit: "Creamos herramientas que eliminan trabajo manual y aumentan ingresos.",
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
              Cinco unidades. <span className="text-gradient-gold">Un ecosistema.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Un camino claro: crece financieramente, construye un negocio y escálalo con sistemas.
          </p>
        </div>

        {/* Growth path indicator */}
        <div className="hidden md:flex items-center gap-3 mb-12 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-primary">Personal</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-primary/10" />
          <span className="text-primary">Negocio</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-primary/10" />
          <span className="text-primary">Sistemas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((u, i) => (
            <motion.article
              key={u.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl glass shadow-elegant hover:shadow-gold transition-all duration-500 flex flex-col ${
                i === 4 ? "lg:col-span-1 md:col-span-2" : ""
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={u.img}
                  alt={`${u.name} — ${u.layer}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] text-primary glass px-3 py-1 rounded-full">
                  {u.layer}
                </span>
                <span className="absolute top-4 right-4 font-display text-xs text-primary/80 glass px-2.5 py-1 rounded-full">
                  {u.n}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <u.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {u.name}
                  </h3>
                </div>
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
                <p className="mt-5 pt-5 border-t border-border/50 text-sm italic text-foreground/80 leading-relaxed">
                  "{u.benefit}"
                </p>
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