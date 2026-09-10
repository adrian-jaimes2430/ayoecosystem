import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Activation from "@/components/sections/Activation";
import Monetization from "@/components/sections/Monetization";
import Scaling from "@/components/sections/Scaling";
import Value from "@/components/sections/Value";
import Authority from "@/components/sections/Authority";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import ScrollVideoBackdrop from "@/components/ScrollVideoBackdrop";
import SectionStage from "@/components/SectionStage";
import AmbientAudio from "@/components/AmbientAudio";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      <SmoothScroll />
      <ScrollVideoBackdrop />
      <AmbientAudio />
      <Navbar />
      <div id="story-flow" className="relative">
        <Hero />
        <SectionStage><About /></SectionStage>
        <SectionStage><Value /></SectionStage>
        <Activation />
        <Monetization />
        <Scaling />
      </div>
      <SectionStage><Authority /></SectionStage>
      <SectionStage><Contact /></SectionStage>
      <Footer />
      <StickyWhatsApp />
    </main>
  );
};

export default Index;
