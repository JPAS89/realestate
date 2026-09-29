import Hero from "@/components/Hero";
import About from "@/components/About";
import Tours from "@/components/Tours";
import Transportation from "@/components/Transportation";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import SeoHead from "@/components/SeoHead";
import { HOME_SEO } from "@/lib/seo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SeoHead {...HOME_SEO} />
      <Hero />
      <About />
      <Tours />
      <Transportation />
      <Gallery />
      <Booking />
      <FAQ />
      <Contact />
      
    </div>
  );
};

export default Index;
