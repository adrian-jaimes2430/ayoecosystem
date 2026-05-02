import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Tu nombre").max(100),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().min(6, "Teléfono inválido").max(30),
});

type Profile = "comprador" | "dropshipper" | "proveedor";

const waMessages: Record<Profile, string> = {
  comprador: "Hola, quiero ser parte de la comunidad ANMA y enterarme de los próximos lanzamientos.",
  dropshipper: "Hola, quiero unirme a ANMA como dropshipper y vender los productos del próximo lanzamiento.",
  proveedor: "Hola, soy proveedor y quiero presentar mi producto al sistema de lanzamientos ANMA.",
};

const labels: Record<Profile, string> = {
  comprador: "Quiero comprar productos ANMA",
  dropshipper: "Soy dropshipper y quiero vender",
  proveedor: "Soy proveedor de producto",
};

const WHATSAPP = "573000000000"; // TODO: reemplazar con número real

const AnmaLeadForm = ({ profile }: { profile: Profile }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const parsed = schema.safeParse({ name, email, phone });
    if (!parsed.success) {
      toast({
        title: "Revisa los datos",
        description: parsed.error.issues[0]?.message ?? "Datos inválidos",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      email: parsed.data.email,
      name: `${parsed.data.name} · ${parsed.data.phone}`,
      source: `anma_funnel_${profile}`,
    });
    setLoading(false);
    if (error) {
      toast({
        title: "No pudimos registrarte",
        description: "Inténtalo de nuevo en unos segundos.",
        variant: "destructive",
      });
      return;
    }
    setSuccess(true);
    const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessages[profile])}`;
    window.open(wa, "_blank");
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-background/60 border border-primary/40 p-6 text-center space-y-2">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
        <h3 className="font-display text-xl font-semibold">¡Estás dentro!</h3>
        <p className="text-muted-foreground text-sm">
          Te abrimos WhatsApp para continuar la conversación.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={100}
        className="h-12 rounded-xl bg-background/60 border-border focus-visible:ring-primary"
      />
      <Input
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={255}
        className="h-12 rounded-xl bg-background/60 border-border focus-visible:ring-primary"
      />
      <Input
        type="tel"
        placeholder="WhatsApp (con código país)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maxLength={30}
        className="h-12 rounded-xl bg-background/60 border-border focus-visible:ring-primary"
      />
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-anma-hero text-primary-foreground hover:opacity-95 font-bold rounded-full py-6 shadow-anma"
      >
        {loading ? "Enviando..." : (
          <>{labels[profile]} <Send className="ml-1 w-4 h-4" /></>
        )}
      </Button>
      <p className="text-center text-[11px] text-muted-foreground">
        Al enviar abrimos WhatsApp para continuar.
      </p>
    </form>
  );
};

export default AnmaLeadForm;