import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/herovideo.mp4";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";

const Hero = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Función para manejar el desplazamiento suave
  const scrollToTours = () => {
    const element = document.getElementById("tours");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-end justify-start overflow-hidden pb-20">

      {/* VIDEO BACKGROUND */}
      <video 
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 w-full h-full bg-black/30"></div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 text-primary-foreground">
        
        <div className="flex flex-col items-center md:flex-row justify-between md:items-end w-full">
            
            {/* TEXT CONTAINER */}
            <div className="w-full text-center md:text-left 
                            md:w-3/4 lg:w-2/3 
                            md:translate-x-16 lg:translate-x-24 md:translate-y-[-50px]">
                
                <h1 className="text-3xl md:text-6xl font-bold mb-4 lg:mb-6 animate-fade-in leading-tight font-marker">
                    {t.hero.title.split("\n").map((line: string, i: number) => (
                        <span key={i}>
                            {line}
                            {i === 0 && <br />}
                        </span>
                    ))}
                </h1>

                <p className="text-lg md:text-xl max-w-2xl mx-auto md:mx-0 animate-slide-up font-body opacity-95"> 
                    {t.hero.subtitle}
                </p>
            </div>

            {/* CTA CONTAINER - CORREGIDO PARA SCROLL */}
            <div 
              className="
                mt-10 md:mt-0 
                flex justify-center md:justify-start
                md:translate-x-[-150px] md:translate-y-[-125px]
              "
            >
                <Button
                    onClick={scrollToTours}
                    size="lg"
                    variant="outline"
                    className="
                      text font-semibold uppercase tracking-wider h-auto
                      px-8 py-4 md:px-18 md:py-4
                      bg-transparent border-2 border-white text-white
                      rounded-full
                      hover:bg-[#617065] hover:border-[#ffffff] transition-all duration-300
                      w-[275px] h-[60px]
                      flex items-center justify-center gap-2
                    "
                >
                    {t.hero.exploreTours}
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;