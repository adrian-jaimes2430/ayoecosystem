import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WHATSAPP_NUMBER = "573106807521";
const CLUB_WHATSAPP_URL = "https://chat.whatsapp.com/BeqOPPAERVNErojGRsyPGM";

const EMAILS = [
  { label: "Información general", value: "info@ayoecosystem.com" },
  { label: "Talento", value: "talento@ayoecosystem.com" },
  { label: "Alianzas", value: "alianzas@ayoecosystem.com" },
];

const SOCIALS = [
  { icon: InstagramIcon, label: "A&O Ecosystem", url: "https://www.instagram.com/ao.ecosystem?igsh=MWllOXNxM3ZxN2llMg==" },
  { icon: InstagramIcon, label: "ANMA Soluciones", url: "https://www.instagram.com/anmasoluciones?igsh=NzN2c2c3bGtkeDE5" },
  { icon: InstagramIcon, label: "Inverfact", url: "https://www.instagram.com/inverfactcol?igsh=ZW91dzl0aDgxM2k2" },
  { icon: FacebookIcon, label: "A&O Ecosystem", url: "https://www.facebook.com/share/1ChyTws68j/" },
  { icon: FacebookIcon, label: "ANMA Soluciones", url: "https://www.facebook.com/share/1DjCux4LSo/" },
];

const schema = z.object({
  name: z.string().trim().min(2, "Tu nombre es muy corto").max(80),
  email: z.string().trim().email("Email no válido").max(160),
  interest: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(800),
});

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    try {
      await supabase.from("leads").insert({
        email: parsed.data.email,
        name: parsed.data.name,
        source: `contact_form:${parsed.data.interest}`,
      });
      await supabase.functions.invoke("send-contact-notification", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          interest: parsed.data.interest,
          message: parsed.data.message,
        },
      });
      (e.currentTarget as HTMLFormElement).reset();
      toast({ title: "Solicitud enviada", description: "Te responderemos al correo en breve." });
    } catch (err) {
      toast({ title: "No pudimos enviar", description: "Intenta de nuevo en unos segundos.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => { void onSubmit(e); };

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
              <a href={CLUB_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Accede al club gratuito ahora
              </a>
            </Button>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Correos directos
                </h3>
                <ul className="space-y-2">
                  {EMAILS.map((e) => (
                    <li key={e.value} className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-primary shrink-0" />
                      <a
                        href={`mailto:${e.value}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {e.value}
                      </a>
                      <span className="text-muted-foreground hidden sm:inline">— {e.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Síguenos
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {SOCIALS.map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      >
                        <s.icon className="h-3.5 w-3.5" />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmitForm}
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
