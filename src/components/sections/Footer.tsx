const Footer = () => {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-4 gap-8 items-start">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-gold" />
            A&O Ecosystem
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Company A&O Ecosystem S.A.S — Sistemas que generan resultados.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold mb-3">Ecosistema</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#unidades" className="hover:text-foreground">Inverfact</a></li>
            <li><a href="#unidades" className="hover:text-foreground">A&O Consulting</a></li>
            <li><a href="#unidades" className="hover:text-foreground">A&O Tools</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold mb-3">Contacto</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="mailto:info@ayoecosystem.com" className="hover:text-foreground">info@ayoecosystem.com</a></li>
            <li><a href="mailto:talento@ayoecosystem.com" className="hover:text-foreground">talento@ayoecosystem.com</a></li>
            <li><a href="mailto:alianzas@ayoecosystem.com" className="hover:text-foreground">alianzas@ayoecosystem.com</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold mb-3">Síguenos</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="https://www.instagram.com/ao.ecosystem?igsh=MWllOXNxM3ZxN2llMg==" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Instagram · A&O</a></li>
            <li><a href="https://www.instagram.com/anmasoluciones?igsh=NzN2c2c3bGtkeDE5" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Instagram · ANMA</a></li>
            <li><a href="https://www.instagram.com/inverfactcol?igsh=ZW91dzl0aDgxM2k2" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Instagram · Inverfact</a></li>
            <li><a href="https://www.facebook.com/share/1ChyTws68j/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Facebook · A&O</a></li>
            <li><a href="https://www.facebook.com/share/1DjCux4LSo/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Facebook · ANMA</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Company A&O Ecosystem S.A.S. Todos los derechos reservados.</span>
        <span>Diseñado para operadores.</span>
      </div>
    </footer>
  );
};

export default Footer;