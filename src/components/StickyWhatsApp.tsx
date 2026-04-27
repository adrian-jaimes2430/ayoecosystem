import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "573000000000"; // TODO: replace with real number

const StickyWhatsApp = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola A&O Ecosystem, quiero más información")}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_40%)] text-white px-5 py-3.5 shadow-2xl shadow-[hsl(142_70%_45%)/0.4] hover:scale-105 transition-all duration-300 animate-glow-pulse"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline font-semibold text-sm">WhatsApp</span>
    </a>
  );
};

export default StickyWhatsApp;