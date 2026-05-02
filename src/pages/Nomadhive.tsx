import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  PhoneCall,
  Users,
  ShieldCheck,
  GraduationCap,
  Rocket,
  TrendingUp,
  Layers,
  Award,
  Briefcase,
  Target,
  Wallet,
  Repeat,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoNomad from "@/assets/logo-nomadhive.png";
import iconNomad from "@/assets/icon-nomadhive.png";
import NomadLeadForm, { NOMAD_WHATSAPP } from "@/components/nomadhive/NomadLeadForm";

const wa = `https://wa.me/${NOMAD_WHATSAPP}?text=${encodeURIComponent("Hola, quiero aplicar al sistema NomadHive")}`;

const pains = [
  { icon: Wallet, t: "Dependencia de un único ingreso limitado" },
  { icon: Target, t: "Falta de oportunidades reales en el mundo digital" },
  { icon: Layers, t: "Modelos saturados, sin estructura ni filtro" },
  { icon: AlertCircle, t: "Ausencia de guía, mentoría y acompañamiento" },
];

const pillars = [
  { icon: GraduationCap, t: "Formación en habilidades digitales" },
  { icon: Briefcase, t: "Acceso a oportunidades reales del ecosistema A&O" },
  { icon: TrendingUp, t: "Desarrollo progresivo basado en desempeño" },
  { icon: Award, t: "Monetización por resultados, no por promesas" },
];

const steps = [
  { n: "01", icon: ClipboardList, title: "Registro", desc: "Completa el formulario de aplicación con tu información profesional." },
  { n: "02", icon: PhoneCall, title: "Contacto", desc: "Talento humano evalúa tu perfil y agenda una entrevista." },
  { n: "03", icon: Users, title: "Entrevista", desc: "Validamos perfil, compromiso y alineación con el sistema." },
  { n: "04", icon: ShieldCheck, title: "Evaluación", desc: "Proceso interno de validación y aprobación del perfil." },
  { n: "05", icon: GraduationCap, title: "Formación", desc: "Capacitación en ventas, cierre, objeciones, redes y WhatsApp Business." },
  { n: "06", icon: Rocket, title: "Activación", desc: "Acceso a las plataformas y oportunidades del ecosistema." },
];

const incomes = [
  "Venta de productos ANMA",
  "Referidos a mentorías Inverfact",
  "Cierre de clientes para servicios de impulso de marca (A&O)",
  "Bonos por desempeño",
  "Escalamiento por resultados",
];

const levels = [
  { level: "Nivel 1", title: "Junior", desc: "Ingreso al sistema. Formación inicial y primeras ventas guiadas." },
  { level: "Nivel 2", title: "Senior", desc: "Operación autónoma con resultados sostenidos y mayor cuota." },
  { level: "Nivel 3", title: "Líder", desc: "Coordinas equipos, mentoreas juniors y multiplicas resultados." },
  { level: "Nivel 4", title: "Staff Matriz", desc: "Parte del núcleo estratégico. Liderazgo de unidad de negocio." },
];

const benefits = [
  "Formación constante en habilidades digitales",
  "Acompañamiento real de un equipo experto",
  "Ecosistema completo: no estás solo",
  "Posibilidad concreta de escalar tus ingresos",
];

const Nomadhive = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "NomadHive | Sistema de talento remoto del ecosistema A&O";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "NomadHive es un sistema estructurado de desarrollo de talento que permite generar ingresos remotos dentro del ecosistema empresarial A&O. Aplica al proceso de selección.",
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="nomad-scope min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={iconNomad} alt="NomadHive" className="h-9 w-9 object-contain" />
            <span className="font-display font-bold tracking-tight">NomadHive</span>
          </Link>
          <Button asChild size="sm" className="bg-nomad-hero text-primary-foreground hover:opacity-95 font-semibold shadow-nomad">
            <a href="#aplicar">Aplicar ahora <ArrowRight className="ml-1 w-4 h-4" /></a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-nomad-dark">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary border border-primary/30 px-3 py-1.5 rounded-full bg-primary/5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Proceso de selección abierto
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              No es un empleo.{" "}
              <span className="text-nomad-gradient">Es un sistema.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              NomadHive es una estructura de desarrollo de talento que te permite generar
              ingresos remotos dentro de un ecosistema empresarial real.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-nomad-hero text-primary-foreground hover:opacity-95 font-bold rounded-full px-8 shadow-nomad">
                <a href="#aplicar">Aplicar al sistema NomadHive <ArrowRight className="ml-1 w-4 h-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-primary/40 hover:border-primary">
                <a href="#proceso">Ver el proceso</a>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Proceso filtrado</div>
              <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /> Formación incluida</div>
              <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Crecimiento por mérito</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl" />
            <img src={logoNomad} alt="NomadHive logo" className="relative w-full max-w-md object-contain drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 md:py-28 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">El problema</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              No es tu falta de esfuerzo. Es el <span className="text-nomad-gradient">sistema</span> al que perteneces.
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/60 p-6 hover:border-primary/40 transition-colors"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <p.icon className="w-5 h-5" />
                </span>
                <p className="text-base leading-relaxed pt-1.5">{p.t}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-center text-lg md:text-xl text-foreground/85 italic max-w-2xl mx-auto">
            "El problema no es la persona. Es el sistema al que pertenece."
          </p>
        </div>
      </section>

      {/* WHAT IS NOMADHIVE */}
      <section className="py-24 md:py-28 bg-nomad-dark border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Qué es NomadHive</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
                Un sistema, no una promesa.
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                NomadHive combina formación, oportunidades reales y desarrollo profesional dentro
                del ecosistema A&O. No vendemos un empleo: construimos talento que escala.
              </p>
            </div>
            <div className="grid gap-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-card/70 p-5 hover:border-primary/50 transition-colors"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-nomad-hero text-primary-foreground">
                    <p.icon className="w-5 h-5" />
                  </span>
                  <p className="font-medium">{p.t}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="py-24 md:py-28 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Proceso de ingreso</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Selectivo. Profesional. <span className="text-nomad-gradient">Estructurado.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              No todos entran. Solo quienes pasan el filtro acceden al sistema NomadHive.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative rounded-2xl border border-border bg-card/60 p-7 hover:border-primary/50 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <s.icon className="w-5 h-5" />
                  </span>
                  <span className="font-display text-2xl text-primary/40 font-bold">{s.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">Paso {parseInt(s.n)}: {s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INCOME SYSTEM */}
      <section className="py-24 md:py-28 bg-nomad-dark border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Sistema de ingresos</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Múltiples fuentes. <span className="text-nomad-gradient">Un solo sistema.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Dentro de NomadHive puedes generar ingresos a través de las distintas
              unidades de negocio del ecosistema. Cada resultado se traduce en compensación.
            </p>
          </div>
          <ul className="grid gap-3">
            {incomes.map((i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card/70 p-4">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GROWTH LEVELS */}
      <section className="py-24 md:py-28 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Crecimiento por mérito</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Subes por <span className="text-nomad-gradient">resultados</span>, no por antigüedad.
            </h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {levels.map((l, i) => (
              <motion.div
                key={l.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-border bg-card/60 p-7 overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, hsl(var(--card) / 0.8) 0%, hsl(var(--primary) / ${0.04 + i * 0.04}) 100%)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-primary">{l.level}</span>
                  <span className="font-display text-3xl font-bold text-primary/30">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold">{l.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-center text-muted-foreground">
            El crecimiento depende de <span className="text-foreground">resultados</span>,{" "}
            <span className="text-foreground">constancia</span> y{" "}
            <span className="text-foreground">liderazgo</span>.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 md:py-28 bg-nomad-dark border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Beneficios</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Lo que recibes al <span className="text-nomad-gradient">entrar al sistema</span>.
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-card/60 p-6">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="text-base leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL INCOME */}
      <section className="py-24 md:py-28 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Doble fuente de ingresos</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Dos vías para <span className="text-nomad-gradient">multiplicar</span> tu ingreso.
            </h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-primary/30 bg-card/70 p-8 hover:border-primary/60 transition-colors">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-nomad-hero text-primary-foreground">
                <Wallet className="w-6 h-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">Ingresos directos</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Por venta directa de productos ANMA. Comisión clara por cada cierre realizado.
              </p>
            </div>
            <div className="rounded-3xl border border-primary/30 bg-card/70 p-8 hover:border-primary/60 transition-colors">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-nomad-hero text-primary-foreground">
                <Repeat className="w-6 h-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold">Ingresos por referidos</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Por referidos a Inverfact y servicios A&O. Cada cliente que llevas se traduce en compensación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APPLY / FORM */}
      <section id="aplicar" className="py-24 md:py-32 bg-nomad-dark border-t border-border/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-start">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Aplicación</span>
              <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                Aplicar <span className="text-nomad-gradient">ahora</span>.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-md">
                El acceso es <span className="text-foreground">limitado</span> y requiere
                validación del perfil por parte de nuestro equipo de talento humano.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {[
                  "Procesos de selección por temporada",
                  "Cupos limitados por unidad",
                  "Onboarding y formación incluidos",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild variant="outline" className="rounded-full border-primary/40 hover:border-primary">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    Prefiero escribir por WhatsApp <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-3xl border border-primary/30 bg-card/70 p-7 shadow-nomad">
              <NomadLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={iconNomad} alt="NomadHive" className="h-8 w-8 object-contain" />
            <span className="text-sm text-muted-foreground">
              NomadHive · Una unidad de A&O Ecosystem
            </span>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Volver a A&O Ecosystem
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Nomadhive;