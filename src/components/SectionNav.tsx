import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "historia", label: "Historia" },
  { id: "autoridad", label: "Autoridad" },
  { id: "contacto", label: "Contacto" },
];

const SectionNav = () => {
  const [active, setActive] = useState("historia");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let best = SECTIONS[0].id;
      let bestDist = Infinity;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= window.innerHeight) continue;
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = s.id;
        }
      }
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav aria-label="Progresión de la historia" className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-3">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} aria-label={s.label} aria-current={isActive ? "true" : undefined} className="group flex items-center gap-2">
            <span className={`text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${isActive ? "opacity-100 text-foreground" : "opacity-0 group-hover:opacity-100 text-muted-foreground"}`}>
              {s.label}
            </span>
            <span className={`block rounded-full transition-all duration-500 ${isActive ? "h-6 w-[3px] bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.9)]" : "h-[3px] w-[3px] bg-foreground/35 group-hover:bg-foreground/70"}`} />
          </a>
        );
      })}
    </nav>
  );
};

export default SectionNav;
