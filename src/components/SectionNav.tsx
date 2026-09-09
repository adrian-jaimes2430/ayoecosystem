import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Génesis" },
  { id: "ecosistema", label: "Ecosistema" },
  { id: "unidades", label: "Unidades" },
  { id: "activacion", label: "Activar" },
  { id: "monetizacion", label: "Generar" },
  { id: "escalamiento", label: "Escalar" },
  { id: "valor", label: "Valor" },
  { id: "mentoria", label: "Mentoría" },
  { id: "contacto", label: "Contacto" },
];

/**
 * Lateral scroll progression indicators — marks the active chapter of the
 * narrative and scrolls smoothly to it on click.
 */
const SectionNav = () => {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (e): e is HTMLElement => !!e,
    );
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Progresión de secciones"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-3"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className={`text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ${
                isActive
                  ? "opacity-100 text-foreground"
                  : "opacity-0 group-hover:opacity-100 text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-500 ${
                isActive
                  ? "h-6 w-[3px] bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.9)]"
                  : "h-[3px] w-[3px] bg-foreground/35 group-hover:bg-foreground/70"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default SectionNav;
