export type AOHistoryChapter = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  quote?: string;
  unit?: "ao" | "inverfact" | "nomadhive" | "anma";
};

export const AOHistoryChapters: AOHistoryChapter[] = [
  {
    id: "prologue",
    index: "00",
    eyebrow: "PRÓLOGO",
    title: "Todo empezó con una pregunta.",
    accent: "¿Cómo convertir esfuerzo en estructura, y estructura en crecimiento?",
    body: "Antes de existir como ecosistema, A&O nació de una búsqueda: entender cómo transformar ideas, trabajo y aprendizaje en sistemas capaces de crecer con las personas.",
    quote: "Lo que construimos debe poder crecer sin perder su propósito.",
    unit: "ao",
  },
  {
    id: "search",
    index: "01",
    eyebrow: "LA BÚSQUEDA",
    title: "Aprender antes de construir.",
    accent: "La experiencia se convirtió en criterio.",
    body: "Cada prueba, cada error y cada conversación fueron dando forma a una manera distinta de hacer negocios: más humana, más estructurada y más conectada con la realidad de quien está del otro lado.",
    quote: "No se trata de saberlo todo. Se trata de aprender lo suficiente para construir mejor.",
    unit: "ao",
  },
  {
    id: "activate",
    index: "02",
    eyebrow: "ACTIVAR",
    title: "El crecimiento comienza adentro.",
    accent: "Primero la persona. Después el sistema.",
    body: "INVERFACT representa esa primera puerta: educación financiera práctica, pensamiento de largo plazo y herramientas para aprender a generar, multiplicar y proteger el capital con mayor criterio.",
    quote: "Si no sabes manejar tu dinero, nunca vas a crecer.",
    unit: "inverfact",
  },
  {
    id: "opportunity",
    index: "03",
    eyebrow: "CREAR OPORTUNIDADES",
    title: "El conocimiento necesitaba una vía de acción.",
    accent: "Así apareció una nueva idea de talento.",
    body: "NOMADHIVE nació para conectar formación, oportunidades digitales y desempeño. No como una promesa de empleo, sino como una estructura donde el talento puede aprender, aportar y evolucionar.",
    quote: "El problema no es la persona. Es el sistema al que pertenece.",
    unit: "nomadhive",
  },
  {
    id: "generate",
    index: "04",
    eyebrow: "GENERAR",
    title: "La atención debía convertirse en valor.",
    accent: "El comercio también podía sentirse humano.",
    body: "ANMA SOLUCIONES tomó esa idea y la llevó al e-commerce: contenido que conecta, comunidad que escucha y lanzamientos que convierten la atención en una experiencia de compra más cercana.",
    quote: "No vendemos productos sueltos. Construimos momentos alrededor de ellos.",
    unit: "anma",
  },
  {
    id: "connection",
    index: "05",
    eyebrow: "LA CONEXIÓN",
    title: "Las piezas empezaron a hablar entre sí.",
    accent: "Educación. Talento. Comercio. Estrategia.",
    body: "Fue ahí donde las unidades dejaron de verse como proyectos aislados. Cada una resolvía una parte del recorrido y, juntas, empezaron a formar algo mayor: un ecosistema.",
    quote: "El verdadero valor aparece cuando los sistemas se conectan.",
    unit: "ao",
  },
  {
    id: "scale",
    index: "06",
    eyebrow: "ESCALAR",
    title: "Dejamos de perseguir crecimiento. Empezamos a diseñarlo.",
    accent: "Marketing. Automatización. Procesos. Dirección.",
    body: "A&O Ecosystem asumió el papel de matriz: diagnosticar, ordenar, posicionar y construir sistemas de marketing, ventas y operación para que las empresas puedan crecer con estructura.",
    quote: "Construimos sistemas que escalan empresas, no solo ideas.",
    unit: "ao",
  },
  {
    id: "ecosystem",
    index: "07",
    eyebrow: "EL ECOSISTEMA",
    title: "Hoy no construimos una sola cosa.",
    accent: "Construimos conexiones que pueden evolucionar.",
    body: "A&O, INVERFACT, NOMADHIVE y ANMA representan diferentes entradas al mismo propósito: ayudar a las personas y a los negocios a pasar de intención a estructura, y de estructura a crecimiento sostenible.",
    quote: "Un ecosistema no es una colección de marcas. Es una red de posibilidades.",
    unit: "ao",
  },
  {
    id: "future",
    index: "08",
    eyebrow: "LO QUE SIGUE",
    title: "El próximo capítulo todavía se está escribiendo.",
    accent: "Y queremos construirlo con quienes creen en crecer con propósito.",
    body: "A&O está diseñado para evolucionar: nuevas unidades, nuevas tecnologías, nuevas alianzas y nuevas formas de crear valor. Lo importante no es llegar a un punto final. Es seguir construyendo mejor.",
    quote: "ex Structura, Prosperitas.",
    unit: "ao",
  },
];
