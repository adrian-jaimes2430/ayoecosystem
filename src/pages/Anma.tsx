import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Truck,
  Package,
  AlertTriangle,
  Sparkles,
  Users,
  Megaphone,
  Flame,
  Calendar,
  Clock,
  Rocket,
  LogOut,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import anmaLogo from "@/assets/logo-anma.png";
import AnmaLeadForm from "@/components/anma/AnmaLeadForm";

const WHATSAPP = "573058023023";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const Anma = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "ANMA Soluciones | Contenido, Comunidad y Lanzamientos";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "ANMA Soluciones: el nuevo modelo de e-commerce basado en contenido orgánico, comunidad y lanzamientos tipo infomercial. Para compradores, dropshippers y proveedores."
    );
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/anma`);
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <main className="anma-scope min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" /> A&O Ecosystem
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-white p-1 flex items-center justify-center">
              <img src={anmaLogo} alt="ANMA Soluciones" className="h-full w-full object-contain" />
            </div>
            <span className="font-display font-bold tracking-tight">ANMA</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-anma-dark overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 -right-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.25em] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" /> Nuevo modelo de e-commerce
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]"
            >
              El problema no eres tú.<br />
              Es el <span className="text-anma-gradient">modelo actual de e-commerce</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              ANMA Soluciones reinventa la venta online con <strong className="text-foreground">contenido orgánico</strong>,{" "}
              <strong className="text-foreground">comunidad real</strong> y{" "}
              <strong className="text-foreground">lanzamientos tipo infomercial moderno</strong>.
              Vendes sin quemar ads, sin guerra de precios, sin depender del algoritmo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="bg-anma-hero text-primary-foreground font-bold rounded-full shadow-anma hover:opacity-95">
                <a href="#segmentos">Quiero entrar al sistema</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#modelo">Cómo funciona</a>
              </Button>
            </motion.div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { k: "0$", v: "en ads para arrancar" },
                { k: "72h", v: "ventana de descuento" },
                { k: "7d", v: "lanzamiento controlado" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-secondary/60 border border-border p-3">
                  <div className="font-display text-2xl font-bold text-anma-gradient">{s.k}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-anma-hero blur-3xl opacity-40 rounded-full" />
              <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-3xl bg-white p-6 flex items-center justify-center shadow-anma">
                <img src={anmaLogo} alt="Logo ANMA Soluciones" className="h-full w-full object-contain" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              <AlertTriangle className="w-4 h-4" /> El problema
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              El dropshipping tradicional <span className="text-anma-gradient">ya no funciona</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Quemar miles en ads, copiar productos saturados, competir por precio con
              tiendas que jamás verás. Llevas meses probando "winners" y sigues sin vender.
              No es tu culpa: el modelo está roto.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                t: "Ads que se comen tu margen",
                d: "El CPM sube cada mes. Tu rentabilidad desaparece antes de despachar.",
              },
              {
                t: "Producto saturado",
                d: "Mil tiendas vendiendo lo mismo. Ganan los que tienen más presupuesto, no mejor producto.",
              },
              {
                t: "Cero comunidad, cero recompra",
                d: "Vendes una vez y desapareces. Sin marca, sin audiencia, sin activo a largo plazo.",
              },
              {
                t: "Dependencia del algoritmo",
                d: "Una restricción de cuenta y se acaba el negocio. Construyes sobre arena.",
              },
              {
                t: "Logística sin control",
                d: "Tiempos eternos, devoluciones, reclamos. Tu marca paga el costo.",
              },
              {
                t: "Burnout del operador",
                d: "Trabajas 12h al día gestionando caos. No hay sistema, no hay descanso.",
              },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl bg-card border border-border/60 p-6 hover:border-primary/40 transition"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELO ANMA */}
      <section id="modelo" className="relative py-24 md:py-32 bg-anma-dark">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              <Sparkles className="w-4 h-4" /> El modelo ANMA
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Contenido. Comunidad. <span className="text-anma-gradient">Lanzamientos.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Tres pilares que se alimentan entre sí. Construyes audiencia con contenido,
              la conviertes en comunidad y la activas con lanzamientos masivos cada vez que sale producto.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                i: Megaphone,
                t: "Contenido orgánico",
                d: "Videos, reels y narrativa de marca que generan tráfico sin pagar ads. Tu audiencia llega sola.",
                points: ["Storytelling de producto", "Tendencias y formatos virales", "Sistema de publicación semanal"],
              },
              {
                i: Users,
                t: "Comunidad",
                d: "Convertimos seguidores en una comunidad caliente que confía, recomienda y compra cada vez que lanzas.",
                points: ["Grupo cerrado de superfans", "Feedback directo de producto", "Recompra y referidos"],
              },
              {
                i: Flame,
                t: "Lanzamientos infomercial",
                d: "Cada producto sale como un evento. Precalentamos, lanzamos en vivo y agotamos stock en días.",
                points: ["Modelo de escasez real", "Demo y prueba social", "Conversión por urgencia"],
              },
            ].map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-3xl bg-card border border-primary/20 p-7 overflow-hidden hover:border-primary/50 transition"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-anma-hero text-primary-foreground flex items-center justify-center shadow-anma">
                    <b.i className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{b.t}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{b.d}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SISTEMA DE LANZAMIENTO */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              <Rocket className="w-4 h-4" /> Sistema de lanzamiento
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              5 fases. <span className="text-anma-gradient">Un evento de venta</span> cada vez.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Cada producto que entra al sistema sigue exactamente este recorrido.
              Predecible, replicable y diseñado para agotar stock.
            </p>
          </div>

          <ol className="mt-14 relative border-l-2 border-primary/30 pl-8 space-y-10 max-w-3xl">
            {[
              {
                i: Sparkles,
                t: "1. Precalentamiento",
                d: "Días previos sembramos curiosidad con teasers, behind-the-scenes y prueba social en la comunidad.",
              },
              {
                i: Megaphone,
                t: "2. Evento de lanzamiento",
                d: "Live + contenido masivo el día D. Demo del producto, transformación, casos reales. Vendemos en directo.",
              },
              {
                i: Clock,
                t: "3. Ventana 72h con descuento",
                d: "Tres días con precio de lanzamiento + bonos. Urgencia real, no falsa. Aquí entra el grueso de la venta.",
              },
              {
                i: Calendar,
                t: "4. Venta abierta 7 días",
                d: "Una semana a precio normal con remarketing orgánico, testimonios y respuesta a objeciones.",
              },
              {
                i: LogOut,
                t: "5. Salida del producto",
                d: "Cerramos el lanzamiento. El producto sale del catálogo o pasa a stock limitado. Empezamos el siguiente.",
              },
            ].map((step, i) => (
              <motion.li
                key={step.t}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[42px] top-0 h-10 w-10 rounded-full bg-anma-hero text-primary-foreground flex items-center justify-center shadow-anma ring-4 ring-background">
                  <step.i className="w-4 h-4" />
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold">{step.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{step.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* SEGMENTACIÓN + CTAs */}
      <section id="segmentos" className="relative py-24 md:py-32 bg-anma-dark">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              <Users className="w-4 h-4" /> Para quién es ANMA
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
              Tres formas de <span className="text-anma-gradient">entrar al sistema</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Eliges tu rol y te conectamos directo por WhatsApp con el equipo correcto.
            </p>
          </div>

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {/* COMPRADORES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-card border border-border/60 p-7 flex flex-col"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">Compradores</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                Quieres acceder a productos curados, descuentos exclusivos de los primeros 3 días y la comunidad ANMA.
              </p>
              <ul className="mt-4 space-y-2 text-sm flex-1">
                {["Acceso early-bird al lanzamiento", "Descuento 72h y bonos", "Comunidad privada"].map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <AnmaLeadForm profile="comprador" />
              </div>
              <Button asChild variant="outline" className="mt-3 rounded-full">
                <a href={wa("Hola, quiero ser parte de la comunidad ANMA.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* DROPSHIPPERS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl bg-card border-2 border-primary p-7 flex flex-col shadow-anma"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-anma-hero text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                Más demandado
              </div>
              <div className="h-12 w-12 rounded-xl bg-anma-hero text-primary-foreground flex items-center justify-center shadow-anma">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">Dropshippers</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                Vende los productos del próximo lanzamiento sin invertir en stock, con creativos listos y soporte de cierre.
              </p>
              <ul className="mt-4 space-y-2 text-sm flex-1">
                {["Catálogo validado por lanzamiento", "Creativos y guiones listos", "Logística y atención centralizada"].map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <AnmaLeadForm profile="dropshipper" />
              </div>
              <Button asChild variant="outline" className="mt-3 rounded-full">
                <a href={wa("Hola, quiero unirme a ANMA como dropshipper.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* PROVEEDORES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-card border border-border/60 p-7 flex flex-col"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">Proveedores</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                Tienes producto y quieres meterlo al sistema de lanzamientos ANMA. Nos encargamos del marketing y la red.
              </p>
              <ul className="mt-4 space-y-2 text-sm flex-1">
                {["Validación y curaduría", "Lanzamiento con audiencia caliente", "Red de dropshippers activa"].map((p) => (
                  <li key={p} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <AnmaLeadForm profile="proveedor" />
              </div>
              <Button asChild variant="outline" className="mt-3 rounded-full">
                <a href={wa("Hola, soy proveedor y quiero presentar mi producto a ANMA.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" /> Hablar por WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            El próximo lanzamiento <span className="text-anma-gradient">ya está en marcha</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Entra ahora y participa desde el precalentamiento. Después del evento las puertas se cierran hasta el siguiente ciclo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-anma-hero text-primary-foreground font-bold rounded-full shadow-anma hover:opacity-95">
              <a href="#segmentos">Quiero entrar</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href={wa("Hola, quiero información del próximo lanzamiento ANMA.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" /> WhatsApp directo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-white p-0.5 flex items-center justify-center">
              <img src={anmaLogo} alt="ANMA" className="h-full w-full object-contain" />
            </div>
            <span>ANMA Soluciones · Una unidad de A&O Ecosystem</span>
          </div>
          <Link to="/" className="hover:text-foreground transition">← Volver al ecosistema</Link>
        </div>
      </footer>
    </main>
  );
};

export default Anma;