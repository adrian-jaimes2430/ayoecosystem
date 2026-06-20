import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type State = "loading" | "valid" | "already" | "invalid" | "done" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [state, setState] = useState<State>("loading");
  const [submitting, setSubmitting] = useState(false);
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: ANON } }
        );
        const data = await res.json();
        if (res.ok && data.valid) setState("valid");
        else if (data?.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setSubmitting(false);
    if (error) return setState("error");
    if ((data as any)?.success) setState("done");
    else if ((data as any)?.reason === "already_unsubscribed") setState("already");
    else setState("error");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-5 bg-background">
      <div className="max-w-md w-full text-center space-y-4 rounded-2xl border border-border p-8 bg-card">
        <h1 className="font-display text-2xl font-bold">Cancelar suscripción</h1>
        {state === "loading" && <p className="text-muted-foreground">Validando…</p>}
        {state === "valid" && (
          <>
            <p className="text-muted-foreground">
              Confirma que deseas dejar de recibir correos de A&O Ecosystem.
            </p>
            <Button onClick={confirm} disabled={submitting} className="w-full">
              {submitting ? "Procesando…" : "Confirmar baja"}
            </Button>
          </>
        )}
        {state === "already" && <p>Ya estabas dado de baja. No recibirás más correos.</p>}
        {state === "done" && <p>Listo. Has sido dado de baja correctamente.</p>}
        {state === "invalid" && <p>Enlace inválido o expirado.</p>}
        {state === "error" && <p>Ocurrió un error. Intenta de nuevo más tarde.</p>}
      </div>
    </main>
  );
};

export default Unsubscribe;