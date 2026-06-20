import { useEffect, useState } from "react";
import { Clock, Flame } from "lucide-react";

// Cierre fijo: 72 horas exactas desde el 26/06/2026 00:00 (hora Colombia, UTC-5)
// => Termina el 29/06/2026 00:00:00 -05:00
const TARGET_TS = new Date("2026-06-29T00:00:00-05:00").getTime();

const pad = (n: number) => n.toString().padStart(2, "0");

const ScarcityBar = () => {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, TARGET_TS - now);
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  return (
    <div className="mt-5 rounded-2xl border border-primary/40 bg-primary/5 p-4">
      <div className="flex items-center justify-center gap-2 text-primary text-xs font-semibold uppercase tracking-widest">
        <Flame className="w-4 h-4" />
        Cupos limitados · Cierre hoy
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 text-foreground">
        <Clock className="w-4 h-4 text-primary" />
        <div className="flex items-center gap-1.5 font-display font-bold text-2xl md:text-3xl tabular-nums">
          {[
            { v: pad(hours), l: "Hrs" },
            { v: pad(minutes), l: "Min" },
            { v: pad(seconds), l: "Seg" },
          ].map((u, i) => (
            <div key={u.l} className="flex items-center gap-1.5">
              <div className="flex flex-col items-center">
                <span className="px-2.5 py-1 rounded-lg bg-background border border-border min-w-[3ch] text-center">
                  {u.v}
                </span>
                <span className="mt-1 text-[10px] font-sans font-medium uppercase tracking-wider text-muted-foreground">
                  {u.l}
                </span>
              </div>
              {i < 2 && <span className="text-primary -mt-4">:</span>}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Quedan pocos cupos para esta semana en el Club Comunidad de Éxito.
      </p>
    </div>
  );
};

export default ScarcityBar;