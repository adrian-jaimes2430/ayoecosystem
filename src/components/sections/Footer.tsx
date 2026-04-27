const Footer = () => {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-8 items-start">
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
          <h4 className="font-semibold mb-3">Conecta</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#contacto" className="hover:text-foreground">Solicitar acceso</a></li>
            <li><a href="#contacto" className="hover:text-foreground">WhatsApp</a></li>
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