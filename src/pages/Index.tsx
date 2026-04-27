import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Activation from "@/components/sections/Activation";
import Monetization from "@/components/sections/Monetization";
import Scaling from "@/components/sections/Scaling";
import Value from "@/components/sections/Value";
import FreeOffer from "@/components/sections/FreeOffer";
import Pricing from "@/components/sections/Pricing";
import Authority from "@/components/sections/Authority";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Activation />
      <Monetization />
      <Scaling />
      <Value />
      <FreeOffer />
      <Pricing />
      <Authority />
      <Contact />
      <Footer />
      <StickyWhatsApp />
    </main>
  );
};

export default Index;
