import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "573000000000"; // TODO: replace with real number

const schema = z.object({
  name: z.string().trim().min(2, "Tu nombre es muy corto").max(80),
  email: z.string().trim().email("Email no válido").max(160),
  interest: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(800),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast({
        title: "Revisa el formulario",
        description: parsed.error.issues[0]?.message ?? "Datos inválidos",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const text = `Hola A&O Ecosystem, soy ${parsed.data.name}.%0AInterés: ${parsed.data.interest}.%0AEmail: ${parsed.data.email}.%0A%0A${parsed.data.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text).replace(/%2520/g, "%20")}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Solicitud enviada", description: "Continuamos por WhatsApp." });
    }, 400);
  };

  return (
    <section id="contacto" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Acceso al ecosistema
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
              Da el siguiente <span className="text-gradient-gold">movimiento</span>.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-md">
              Solicita acceso a mentoría, consultoría o únete a la comunidad. Te respondemos
              de forma directa, sin intermediarios.
            </p>

            <Button asChild variant="whatsapp" size="lg" className="mt-8">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola A&O, quiero información del ecosistema")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" /> Hablar por WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-3xl p-8 shadow-elegant space-y-5"
          >
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" placeholder="Tu nombre" maxLength={80} required className="mt-2 bg-background/40 border-border h-12 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="tucorreo@dominio.com" maxLength={160} required className="mt-2 bg-background/40 border-border h-12 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="interest">Te interesa</Label>
              <Input id="interest" name="interest" placeholder="Mentoría, consultoría, comunidad…" maxLength={80} required className="mt-2 bg-background/40 border-border h-12 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="message">Tu objetivo</Label>
              <Textarea id="message" name="message" placeholder="Cuéntanos en qué punto estás y a dónde quieres llegar." rows={4} maxLength={800} required className="mt-2 bg-background/40 border-border rounded-xl" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Enviando…" : (<>Solicitar acceso <ArrowRight className="h-4 w-4" /></>)}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Al enviar aceptas ser contactado por el equipo A&O Ecosystem.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;