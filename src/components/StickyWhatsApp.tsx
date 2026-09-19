import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "573106807521";

const StickyWhatsApp = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola A&O Ecosystem, quiero más información")}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-2xl shadow-[hsl(142_70%_45%)/0.4] transition-all duration-300 hover:scale-105 hover:bg-[hsl(142_70%_40%)] sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:px-5 sm:py-3.5 animate-glow-pulse"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline font-semibold text-sm">WhatsApp</span>
    </a>
  );
};

export default StickyWhatsApp;