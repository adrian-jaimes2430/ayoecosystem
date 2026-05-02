import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Tu nombre completo").max(100),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().min(6, "WhatsApp inválido").max(30),
  experience: z.string().trim().max(500).optional(),
});

export const NOMAD_WHATSAPP = "573058023023";
const waMessage = "Hola, quiero aplicar al sistema NomadHive";

const NomadLeadForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const parsed = schema.safeParse({ name, email, phone, experience });
    if (!parsed.success) {
      toast({
        title: "Revisa los datos",
        description: parsed.error.issues[0]?.message ?? "Datos inválidos",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const meta = `${parsed.data.name} · ${parsed.data.phone}${
      parsed.data.experience ? ` · ${parsed.data.experience}` : ""
    }`;
    const { error } = await supabase.from("leads").insert({
      email: parsed.data.email,
      name: meta,
      source: "nomadhive_application",
    });
    setLoading(false);
    if (error) {
      toast({
        title: "No pudimos registrar tu aplicación",
        description: "Inténtalo de nuevo en unos segundos.",
        variant: "destructive",
      });
      return;
    }
    setSuccess(true);
    const wa = `https://wa.me/${NOMAD_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
    window.open(wa, "_blank");
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-background/60 border border-primary/40 p-6 text-center space-y-2">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
        <h3 className="font-display text-xl font-semibold">Aplicación recibida</h3>
        <p className="text-muted-foreground text-sm">
          Nuestro equipo de talento humano revisará tu perfil. Te abrimos WhatsApp para continuar el proceso.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={100}
        className="h-12 rounded-xl bg-background/60 border-border focus-visible:ring-primary"
      />
      <Input
        type="email"
        placeholder="Correo electrónico"
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
      <Textarea
        placeholder="Cuéntanos brevemente tu experiencia (opcional)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        maxLength={500}
        rows={3}
        className="rounded-xl bg-background/60 border-border focus-visible:ring-primary resize-none"
      />
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-nomad-hero text-primary-foreground hover:opacity-95 font-bold rounded-full py-6 shadow-nomad"
      >
        {loading ? "Enviando aplicación..." : (
          <>Aplicar al sistema NomadHive <Send className="ml-1 w-4 h-4" /></>
        )}
      </Button>
      <p className="text-center text-[11px] text-muted-foreground">
        Tu aplicación será evaluada por nuestro equipo de talento humano.
      </p>
    </form>
  );
};

export default NomadLeadForm;