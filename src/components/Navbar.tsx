const logoAO = "/logo-ao-light.png";

const Navbar = () => {
  return (
    <header className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6">
      <a
        href="#top"
        aria-label="Volver al inicio"
        className="flex h-11 w-11 items-center justify-center border border-foreground/10 bg-background/35 p-2 backdrop-blur-md transition-colors hover:border-primary/50"
      >
        <img
          src={logoAO}
          alt="A&O Ecosystem"
          width={36}
          height={36}
          loading="eager"
          decoding="async"
          className="h-full w-full object-contain select-none"
          draggable={false}
        />
      </a>
    </header>
  );
};

export default Navbar;