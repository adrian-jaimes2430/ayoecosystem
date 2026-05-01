import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    initials: "MR",
    name: "María R.",
    role: "Emprendedora",
    result: "Salí de $4.200 en deudas en 6 meses y abrí mi primera cuenta de inversión.",
  },
  {
    initials: "JC",
    name: "Julián C.",
    role: "Ingeniero",
    result: "Hice mi primera inversión en ETFs y ya genero ingresos pasivos cada mes.",
  },
  {
    initials: "AS",
    name: "Andrea S.",
    role: "Diseñadora",
    result: "Pasé de no ahorrar nada a guardar el 30% de mi sueldo con el sistema Inverfact.",
  },
  {
    initials: "DP",
    name: "Diego P.",
    role: "Comerciante",
    result: "Estructuré mis finanzas y multipliqué mi capital invertido en menos de un año.",
  },
];

const Testimonials = () => {
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            Resultados reales
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Lo que dicen quienes ya aplicaron el sistema
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="relative rounded-2xl bg-secondary/40 border border-border hover:border-primary/40 transition-colors p-6 shadow-card"
            >
              <Quote className="absolute top-5 right-5 w-6 h-6 text-primary/30" />
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary grid place-items-center font-display font-bold text-primary-foreground">
                  {t.initials}
                </div>
                <div>
                  <h3 className="font-display font-semibold leading-tight">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground/90 leading-relaxed">"{t.result}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;