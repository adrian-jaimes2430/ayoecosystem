import { GraduationCap, Laptop, TrendingUp, Workflow, Wallet, Network } from "lucide-react";
import inverfactLogo from "@/assets/logo-inverfact.png";
import nomadhiveLogo from "@/assets/logo-nomadhive.png";
import BusinessUnitChapter from "@/components/BusinessUnitChapter";

const Detail = ({ icon: Icon, text }: { icon: typeof GraduationCap; text: string }) => (
  <div className="flex items-center gap-3 text-foreground/80">
    <Icon className="h-4 w-4 shrink-0 text-primary" />
    <span>{text}</span>
  </div>
);

const Activation = () => {
  return (
    <section id="activacion" className="relative">
      <BusinessUnitChapter
          id="inverfact"
          eyebrow="03 — Capital"
          title="Aprender a mover el capital cambia el juego."
          text="INVERFACT nace como la puerta de entrada al conocimiento financiero, la educación y una nueva relación con las decisiones sobre capital."
          accent="hsl(var(--brand-inverfact))"
          modelUrl="/unit-inverfact.glb" shape="icosahedron" color="#ff8a00"
          logo={inverfactLogo} logoAlt="Inverfact" brand="INVERFACT"
          category="Capital · Educación financiera"
          description="Educación financiera real, sin humo: generar, multiplicar y proteger el capital con un sistema probado."
          quote="Si no sabes manejar tu dinero, nunca vas a crecer."
          route="/inverfact" cta="Explorar INVERFACT"
        >
          <Detail icon={GraduationCap} text="Mentoría 1:1 con inversionistas activos" />
          <Detail icon={Wallet} text="Sistema: generar, multiplicar, proteger" />
          <Detail icon={TrendingUp} text="Comunidad privada + herramientas de tracking" />
        </BusinessUnitChapter>
        <BusinessUnitChapter
          id="nomadhive" reverse darkLogo eyebrow="04 — Personas"
          title="El crecimiento nunca fue individual."
          text="NOMADHIVE conecta talento, movimiento, colaboración y oportunidades para construir una red que puede crecer más allá de un solo lugar."
          accent="hsl(var(--brand-nomad))" modelUrl="/unit-nomadhive.glb" shape="torus" color="#00e08a"
          logo={nomadhiveLogo} logoAlt="NomadHive" brand="NOMADHIVE" category="Personas · Trabajo remoto"
          description="Un sistema profesional de oportunidades remotas, formación, productividad e ingresos digitales con crecimiento por niveles."
          quote="Ingresos por estructura y desempeño, no por suerte."
          route="/nomadhive" cta="Explorar NOMADHIVE"
        >
          <Detail icon={Laptop} text="Proceso de selección en 6 etapas" />
          <Detail icon={Workflow} text="Formación en ventas, cierre y WhatsApp Business" />
          <Detail icon={Network} text="Crecimiento por niveles: Junior → Staff Matriz" />
        </BusinessUnitChapter>
    </section>
  );
};

export default Activation;