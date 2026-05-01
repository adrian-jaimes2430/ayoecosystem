import { ArrowRight, Check, TrendingUp, Shield, Zap, Users, BookOpen, Target, AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Testimonials from "@/components/inverfact/Testimonials";
import ScarcityBar from "@/components/inverfact/ScarcityBar";
import LeadForm from "@/components/inverfact/LeadForm";
import logo from "@/assets/inverfact-logo.png";
import founder from "@/assets/inverfact-founder.jpg";

const scrollToOffer = () => {
  document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" });
};

const Inverfact = () => {
  useEffect(() => {
    document.title = "Inverfact — Educación financiera real | A&O Ecosystem";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Aprende a generar, multiplicar y proteger tu dinero con un sistema probado. Mentoría e inversión real con Inverfact, una unidad de A&O Ecosystem.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="inverfact-scope min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* NAV */}
      <header className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">A&amp;O Ecosystem</span>
          </Link>
          <span className="h-6 w-px bg-border" />
          <img src={logo} alt="Inverfact" className="h-10 w-auto md:h-12" />
        </div>
        <Button
          onClick={scrollToOffer}
          className="bg-gradient-primary text-primary-foreground hover:opacity-90 font-semibold rounded-full px-5 hidden sm:inline-flex"
        >
          Empezar ahora
        </Button>
      </header>

      {/* 1. HOOK */}
      <section className="relative px-5 pt-10 pb-20 md:pt-20 md:pb-32">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs md:text-sm font-medium mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Educación financiera real · Sin humo
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight animate-fade-up">
            Si no sabes manejar tu dinero,
            <span className="block text-gradient-primary mt-2">nunca vas a crecer.</span>
          </h1>
          <p className="mt-7 text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-up">
            Aprende a <span className="text-foreground font-semibold">generar</span>,{" "}
            <span className="text-foreground font-semibold">multiplicar</span> y{" "}
            <span className="text-foreground font-semibold">proteger</span> tu dinero con un sistema probado.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 animate-fade-up">
            <Button
              onClick={scrollToOffer}
              size="lg"
              className="bg-gradient-primary text-primary-foreground hover:opacity-95 font-bold text-base md:text-lg rounded-full px-8 py-6 shadow-glow animate-pulse-glow"
            >
              Quiero empezar ahora <ArrowRight className="ml-1" />
            </Button>
            <p className="text-sm text-muted-foreground">Acceso inmediato · Cupos limitados</p>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM AGITATION */}
      <section className="px-5 py-20 md:py-28 bg-secondary/40 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-primary mb-5">
            <AlertTriangle className="w-6 h-6" />
            <span className="uppercase text-sm font-semibold tracking-widest">La realidad</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            La mayoría de personas vive atrapada en el mismo ciclo.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Sin importar cuánto trabajen, el dinero nunca alcanza, las deudas crecen y la libertad financiera se siente más lejos cada año.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { t: "Endeudada", d: "Pagando intereses que se comen tu ingreso cada mes." },
              { t: "Sin control", d: "No sabes a dónde se va tu dinero ni cuánto te queda." },
              { t: "Sin inversión real", d: "Tu dinero pierde valor parado en una cuenta." },
            ].map((item) => (
              <div key={item.t} className="rounded-2xl bg-background border border-border p-6 shadow-card">
                <div className="text-primary text-2xl font-display font-bold mb-2">✕</div>
                <h3 className="font-display text-xl font-semibold">{item.t}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{item.d}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-xl md:text-2xl font-display font-semibold text-center">
            Si sigues así,{" "}
            <span className="text-primary">vas a trabajar toda tu vida sin libertad.</span>
          </p>
        </div>
      </section>

      {/* 3. AUTHORITY */}
      <section className="px-5 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-30" />
            <img
              src={founder}
              alt="Adrián Jaimes — fundador de Inverfact"
              loading="lazy"
              width={768}
              height={960}
              className="relative rounded-3xl w-full object-cover shadow-card"
            />

            <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-primary/30 bg-background/70 backdrop-blur px-4 py-3 shadow-card">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/15 border border-primary/40 grid place-items-center">
                <Shield className="w-4 h-4 text-primary" />
              </span>
              <p className="text-sm text-foreground">
                Seguimiento y <span className="font-semibold">mentoría personalizada</span>
              </p>
            </div>

            <div className="relative mt-4 grid grid-cols-3 gap-3">
              {[
                { n: "+8", l: "Años en el sector" },
                { n: "+500", l: "Mentorados" },
                { n: "+15", l: "Activos gestionados" },
              ].map((c) => (
                <div
                  key={c.l}
                  className="rounded-xl bg-secondary/60 border border-border p-3 text-center"
                >
                  <div className="font-display text-xl md:text-2xl font-bold text-gradient-primary leading-none">
                    {c.n}
                  </div>
                  <div className="mt-1 text-[11px] md:text-xs text-muted-foreground leading-tight">
                    {c.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Quién te enseña</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
              Construí sistemas reales de ingresos. Ahora te enseño cómo hacerlo.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              No vendo teoría. He levantado, escalado y protegido capital con las mismas estrategias que vas a aprender dentro de Inverfact.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Años aplicando estrategias de inversión reales",
                "Mentor de cientos de personas hacia su primera inversión",
                "Metodología paso a paso, sin tecnicismos",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 border border-primary/40 grid place-items-center">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. SOLUTION */}
      <section className="px-5 py-20 md:py-28 bg-secondary/40 border-y border-border">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">La solución</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
            El sistema <span className="text-gradient-primary">Inverfact</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Un método claro y aplicable para tomar el control de tu dinero desde cero.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3 text-left">
            {[
              { icon: BookOpen, t: "Educación financiera práctica", d: "Aprende a presupuestar, ahorrar y eliminar deudas con un método claro." },
              { icon: TrendingUp, t: "Estrategias de inversión", d: "Conoce dónde, cuándo y cómo poner tu dinero a trabajar." },
              { icon: Zap, t: "Herramientas reales", d: "Plantillas, cálculos y recursos listos para aplicar hoy mismo." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="group rounded-2xl bg-background border border-border p-7 hover:border-primary/50 transition-colors shadow-card">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OFFER */}
      <section id="offer" className="px-5 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Lo que recibes</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Todo lo que necesitas en un solo lugar</h2>
          </div>

          <div className="relative rounded-3xl bg-gradient-to-b from-secondary to-card border border-primary/30 p-7 md:p-10 shadow-glow">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
              Oferta Inverfact
            </div>

            <ul className="mt-4 space-y-5">
              {[
                { icon: Users, t: "Acceso al Club Inverfact Élite", d: "Comunidad privada con seguimiento, casos reales y networking." },
                { icon: Target, t: "Mentoría", d: "Acompañamiento directo para aplicar el sistema a tu caso." },
                { icon: BookOpen, t: "Recursos descargables", d: "Plantillas, guías y herramientas listas para usar." },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex items-start gap-4 p-4 rounded-xl bg-background/60 border border-border">
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/15 border border-primary/30 grid place-items-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{t}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              onClick={scrollToOffer}
              size="lg"
              className="mt-8 w-full bg-gradient-primary text-primary-foreground hover:opacity-95 font-bold text-base md:text-lg rounded-full py-6 shadow-glow"
            >
              Quiero entrar a Inverfact <ArrowRight className="ml-1" />
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">Acceso inmediato tras la compra</p>
            <ScarcityBar />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* 6. BENEFITS */}
      <section className="px-5 py-20 md:py-28 bg-secondary/40 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Resultados</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Lo que vas a lograr</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Shield, t: "Control total de tu dinero", d: "Sabrás cuánto entra, cuánto sale y cuánto trabaja por ti." },
              { icon: TrendingUp, t: "Tus primeras inversiones", d: "Pasa de la intención a la acción con confianza." },
              { icon: Zap, t: "Mentalidad financiera", d: "Piensa, decides y actúas como inversionista." },
              { icon: Target, t: "Sistema paso a paso", d: "Una ruta clara, sin improvisar ni adivinar." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border hover:border-primary/40 transition-colors">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-primary grid place-items-center">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{t}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <LeadForm />

      {/* 7. CTA STRONG */}
      <section className="relative px-5 py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Accede ahora al sistema <span className="text-gradient-primary">Inverfact</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Cada día sin un sistema es un día más trabajando para tus deudas en lugar de para tu libertad.
          </p>
          <Button
            onClick={scrollToOffer}
            size="lg"
            className="mt-10 bg-gradient-primary text-primary-foreground hover:opacity-95 font-bold text-lg md:text-xl rounded-full px-10 py-7 shadow-glow animate-pulse-glow"
          >
            Entrar ahora <ArrowRight className="ml-1" />
          </Button>
          <p className="mt-5 text-sm text-muted-foreground">Tu yo del futuro empieza con esta decisión.</p>
        </div>
      </section>

      <footer className="px-5 py-10 border-t border-border text-center">
        <img src={logo} alt="Inverfact" className="h-10 w-auto mx-auto opacity-80" />
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Inverfact · una unidad de A&amp;O Ecosystem
        </p>
        <Link to="/" className="mt-3 inline-block text-xs text-primary hover:underline">
          ← Volver a A&amp;O Ecosystem
        </Link>
      </footer>
    </main>
  );
};

export default Inverfact;