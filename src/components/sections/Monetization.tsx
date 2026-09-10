import { Megaphone, Users, Rocket, Repeat } from "lucide-react";
import anmaLogo from "@/assets/logo-anma.png";
import BusinessUnitChapter from "@/components/BusinessUnitChapter";

const Detail = ({ icon: Icon, title, text }: { icon: typeof Megaphone; title: string; text: string }) => (
  <div className="flex gap-3 text-foreground/80">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--brand-anma))]" />
    <span><strong className="font-medium text-foreground">{title}</strong><br /><span className="text-xs text-muted-foreground">{text}</span></span>
  </div>
);

const Monetization = () => {
  return (
    <section id="monetizacion" className="relative">
      <BusinessUnitChapter
          id="anma"
          eyebrow="05 — Comercio"
          title="Las ideas necesitan un motor para llegar al mercado."
          text="ANMA convierte productos, marketing, ventas y tecnología en sistemas de comercio preparados para escalar."
          accent="hsl(var(--brand-anma))"
          modelUrl="/unit-anma.glb" shape="octahedron" color="#ff6a00"
          logo={anmaLogo} logoAlt="ANMA Soluciones" brand="ANMA SOLUCIONES"
          category="E-commerce · Ventas digitales"
          description="Rompemos con el dropshipping tradicional. ANMA opera con contenido orgánico, comunidad y lanzamientos en 5 fases que concentran demanda y disparan ventas."
          quote="Adiós al dropshipping tradicional. Hola al modelo que sí escala."
          route="/anma" cta="Explorar ANMA"
        >
          <Detail icon={Megaphone} title="Contenido orgánico" text="Tracción real sin depender de pauta fría" />
          <Detail icon={Users} title="Comunidad activa" text="Audiencia que confía, comenta y compra" />
          <Detail icon={Rocket} title="Lanzamientos en 5 fases" text="Pre-calentamiento, evento, 72h, 7 días, salida" />
          <Detail icon={Repeat} title="3 caminos de entrada" text="Comprador, dropshipper o proveedor" />
        </BusinessUnitChapter>
    </section>
  );
};

export default Monetization;