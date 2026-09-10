import Navbar from "@/components/Navbar";
import Value from "@/components/sections/Value";
import Pricing from "@/components/sections/Pricing";
import Authority from "@/components/sections/Authority";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import SectionStage from "@/components/SectionStage";
import AmbientAudio from "@/components/AmbientAudio";
import SmoothScroll from "@/components/SmoothScroll";
import EcosystemStory from "@/components/sections/EcosystemStory";

const Index = () => {
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      <SmoothScroll />
      <AmbientAudio />
      <Navbar />
      <EcosystemStory />
      <SectionStage><Value /></SectionStage>
      <SectionStage><Pricing /></SectionStage>
      <SectionStage><Authority /></SectionStage>
      <SectionStage><Contact /></SectionStage>
      <Footer />
      <StickyWhatsApp />
    </main>
  );
};

export default Index;
