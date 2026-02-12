import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tours from "@/components/Tours";
import Transportation from "@/components/Transportation";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
//import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      
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
