import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
const logoAO = "/logo-ao-light.png";

const links = [
  { href: "/#ecosistema", label: "Ecosistema" },
  { href: "/history", label: "Nuestra historia" },
  { href: "/#activacion", label: "Activar" },
  { href: "/#monetizacion", label: "Generar" },
  { href: "/#escalamiento", label: "Escalar" },
  { href: "/#contacto", label: "Contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <nav className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? "glass shadow-elegant border border-white/5" : "bg-transparent"}`}>
          <Link to="/" className="flex items-center gap-2 sm:gap-3 font-display font-bold text-base sm:text-lg tracking-tight shrink-0">
            <img src={logoAO} alt="A&O Ecosystem" width={40} height={40} loading="eager" decoding="async" className="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0 select-none" draggable={false} />
            <span className="leading-none">A&O <span className="text-muted-foreground font-normal hidden xs:inline sm:inline">Ecosystem</span></span>
          </Link>

          <ul className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button asChild variant="hero" size="sm">
              <Link to="/#contacto">Solicitar acceso</Link>
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden glass mt-3 rounded-2xl p-5 animate-fade-up">
            <ul className="flex flex-col gap-4 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">{l.label}</Link>
                </li>
              ))}
              <li>
                <Button asChild variant="hero" size="sm" className="w-full">
                  <Link to="/#contacto" onClick={() => setOpen(false)}>Solicitar acceso</Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
