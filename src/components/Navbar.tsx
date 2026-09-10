import { useEffect, useState } from "react";
const logoAO = "/logo-ao-light.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="px-5 md:px-8">
        <nav
          aria-label="Inicio"
          className={`inline-flex items-center rounded-full transition-all duration-500 ${
            scrolled ? "glass p-2 shadow-elegant" : "p-1"
          }`}
        >
          <a
            href="#historia"
            aria-label="A&O Ecosystem — volver al inicio"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/35 backdrop-blur-md transition-colors hover:border-primary/60"
          >
            <img
              src={logoAO}
              alt="A&O Ecosystem"
              width={40}
              height={40}
              loading="eager"
              decoding="async"
              className="h-8 w-8 object-contain select-none transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;