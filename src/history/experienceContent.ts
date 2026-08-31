export type BusinessUnit = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  route: string;
  cta: string;
  status?: string;
};

/**
 * CONTENT-ONLY LAYER
 * Edit this file for copy, labels, CTAs and routes without touching the visual engine.
 * This is intentionally separated from the experience so future content changes do not
 * require a visual-builder/Lovable edit.
 */
export const businessUnits: BusinessUnit[] = [
  {
    id: "inverfact",
    name: "INVERFACT",
    eyebrow: "CAPITAL · EDUCACIÓN · COMUNIDAD",
    description: "Un espacio para aprender, conectar y tomar decisiones financieras con una visión de crecimiento.",
    route: "/inverfact",
    cta: "EXPLORAR INVERFACT",
    status: "ACTIVE",
  },
  {
    id: "nomadhive",
    name: "NOMADHIVE",
    eyebrow: "TALENTO · COMERCIO · MOVIMIENTO",
    description: "Una red de personas y oportunidades diseñada para convertir capacidad en acción y resultados.",
    route: "/nomadhive",
    cta: "ENTRAR EN NOMADHIVE",
    status: "ACTIVE",
  },
  {
    id: "anma",
    name: "ANMA",
    eyebrow: "COMERCIO · MARKETING · ESCALA",
    description: "La unidad donde estrategia, productos, contenido y ventas se convierten en sistemas de crecimiento.",
    route: "/anma",
    cta: "DESCUBRIR ANMA",
    status: "ACTIVE",
  },
  {
    id: "auren",
    name: "AUREN AI",
    eyebrow: "IA · AUTOMATIZACIÓN · INTELIGENCIA",
    description: "Infraestructura inteligente para convertir procesos, información y decisiones en ventaja operativa.",
    route: "",
    cta: "PRÓXIMAMENTE",
    status: "BUILDING",
  },
];

export const experienceCopy = {
  kicker: "A&O ECOSYSTEM",
  title: "NO SOMOS UNA EMPRESA. SOMOS UNA ARQUITECTURA.",
  body: "Un conjunto de unidades especializadas que se conectan para crear movimiento, oportunidades y crecimiento.",
  unitsLabel: "EXPLORA EL ECOSISTEMA",
  interactionHint: "PASA SOBRE UNA UNIDAD · HAZ CLICK PARA ENTRAR",
};
