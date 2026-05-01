import { useState } from "react";
import { z } from "zod";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .email({ message: "Ingresa un correo válido" })
    .max(255, { message: "El correo es demasiado largo" }),
});

const LeadForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const parsed = leadSchema.safeParse({ name, email });
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
      name: parsed.data.name || null,
      source: "inverfact_funnel",
    });
    setLoading(false);

    if (error) {
      toast({
        title: "No pudimos enviar el plan",
        description: "Inténtalo de nuevo en unos segundos.",
        variant: "destructive",
      });
      return;
    }

    setSuccess(true);
    toast({
      title: "¡Listo! Te enviaremos el plan",
      description: "Revisa tu correo en los próximos minutos.",
    });
  };

  return (
    <section className="px-5 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-b from-secondary to-card border border-primary/30 p-7 md:p-10 shadow-glow">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
            Gratis
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-xs">
              <Sparkles className="w-4 h-4" />
              ¿Aún no estás listo?
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight">
              Te envío el <span className="text-gradient-primary">plan completo</span> a tu correo
            </h2>
            <p className="mt-4 text-muted-foreground">
              Recibe gratis la guía con los primeros pasos del sistema Inverfact y empieza a tomar el control hoy mismo.
            </p>
          </div>

          {success ? (
            <div className="mt-8 flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-background/60 border border-primary/40">
              <CheckCircle2 className="w-10 h-10 text-primary" />
              <h3 className="font-display text-xl font-semibold">¡Estás dentro!</h3>
              <p className="text-muted-foreground text-sm">
                En los próximos minutos te llega el plan a <span className="text-foreground font-semibold">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-3">
              <Input
                type="text"
                placeholder="Tu nombre (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className="h-12 rounded-xl bg-background/60 border-border focus-visible:ring-primary"
              />
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  placeholder="tucorreo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  className="h-12 pl-10 rounded-xl bg-background/60 border-border focus-visible:ring-primary"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-95 font-bold text-base md:text-lg rounded-full py-6 shadow-glow"
              >
                {loading ? "Enviando..." : (
                  <>
                    Enviarme el plan <Send className="ml-1 w-4 h-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                100% gratis · Sin spam · Puedes darte de baja cuando quieras
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadForm;