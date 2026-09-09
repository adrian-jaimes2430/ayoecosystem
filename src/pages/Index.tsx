import Navbar from "@/components/Navbar";
import EcosystemStory from "@/components/sections/EcosystemStory";
import Authority from "@/components/sections/Authority";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import SectionNav from "@/components/SectionNav";
import AmbientAudio from "@/components/AmbientAudio";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-foreground">
      <AmbientAudio />
      <Navbar />
      <SectionNav />

      <EcosystemStory />

      {/* The final two institutional sections remain intact. */}
      <section id="autoridad"><Authority /></section>
      <Contact />
      <Footer />
      <StickyWhatsApp />
    </main>
  );
};

export default Index;
