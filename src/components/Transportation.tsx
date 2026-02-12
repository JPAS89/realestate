import { useState, useEffect } from "react"; // 1. Agregamos hooks
import { Car, Plane, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// 2. Importamos las 3 imágenes
import img1 from "@/assets/busetas3.jpg";
import img2 from "@/assets/busetaalt2.jpg";
import img3 from "@/assets/buseta1.jpg"; 

const Transportation = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [currentImg, setCurrentImg] = useState(0);
  const images = [img1, img2, img3];

  // 3. Lógica del Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000); // Cambia cada 6 segundos
    return () => clearInterval(timer);
  }, [images.length]);

  const services = [
    { icon: Plane, title: t.transportation.airport.title, description: t.transportation.airport.desc },
    { icon: Car, title: t.transportation.private.title, description: t.transportation.private.desc },
    { icon: MapPin, title: t.transportation.intercity.title, description: t.transportation.intercity.desc },
    { icon: Clock, title: t.transportation.flexible.title, description: t.transportation.flexible.desc },
  ];

  // 4. Subcomponente de Imagen para evitar repetir código
 // 1. Subcomponente de Imagen optimizado para Cross-Fade suave
 const ImageCarousel = ({ className }: { className: string }) => (
  <div className={`relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl ${className}`}>
    {images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Fleet ${index}`}
        className={`
          absolute inset-0 w-full h-full object-cover 
          transition-all duration-[2000ms] ease-in-out /* Transición más larga para suavidad */
          ${index === currentImg 
            ? "opacity-95 scale-100 z-10"   /* La imagen activa sube y crece levemente */
            : "opacity-0 scale-100 z-0"      /* La imagen inactiva se desvanece al fondo */
          }
        `}
      />
    ))}
    
    {/* Overlay gradiente para asegurar legibilidad del badge */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
    
    {/* Badge Informativo */}
    <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl shadow-xl border border-white/20 z-30">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
          <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <p className="text-[10px] md:text-xs font-bold text-amber-600 uppercase tracking-tighter">Verified Service</p>
          <p className="text-xs md:text-sm font-semibold text-[#4e5a52]">Professional Bilingual Drivers</p>
        </div>
      </div>
    </div>

    {/* Indicadores (Dots) con mejor visibilidad */}
    <div className="absolute top-6 right-6 flex gap-2 z-30">
      {images.map((_, i) => (
        <div 
          key={i} 
          className={`h-1.5 rounded-full transition-all duration-700 ${
            i === currentImg ? "bg-white w-8 shadow-lg" : "bg-white/40 w-2"
          }`}
        />
      ))}
    </div>
  </div>
);
  return (
    <section id="transportation" className="py-20 md:py-22 bg-[#d4ded4] overflow-hidden">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 1.5s ease-out forwards; }
        .underline-transport::after {
          content: ""; position: absolute; left: 0; bottom: -8px; width: 100%; height: 6px;
          background: linear-gradient(90deg, rgba(97, 112, 101, 0.1), #ff7f11, rgba(97, 112, 101, 0.1));
          border-radius: 4px; transform: skewX(-15deg); opacity: 0.9; animation: underlineFade 1.2s ease-out forwards;
        }
        @keyframes underlineFade { from { opacity: 0; width: 0; } to { opacity: 1; width: 100%; } }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col space-y-12 animate-fadeIn order-1 lg:order-none">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#617065] font-bold tracking-widest text-xs uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Premium Fleet & Safety</span>
              </div>
              <h2 className="relative inline-block text-4xl md:text-6xl font-bold text-[#4e5a52] leading-[1.1] underline-transport font-marker">
                {t.transportation.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed pt-2">
                {t.transportation.subtitle}
              </p>
            </div>

            {/* Carousel Móvil */}
            <div className="block lg:hidden order-2 relative w-full my-4">
               <ImageCarousel className="aspect-[4/5]" />
            </div>

            <div className="space-y-12 order-3 lg:order-none">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                {services.map((service, index) => (
                  <div key={index} className="group flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#617065]/10 flex items-center justify-center text-[#617065] group-hover:bg-[#617065] group-hover:text-white transition-all duration-300">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-[#4e5a52] text-lg">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/transport">
                  <Button size="lg" className="rounded-full bg-[#617065] hover:bg-[#4e5a52] px-8 h-14 text-base shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto">
                    {t.transportation.ctaText || (language === "en" ? "Explore Routes & Prices" : "Explorar Rutas y Precios")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Carousel Desktop */}
          <div className="hidden lg:block lg:col-span-5 relative animate-fadeIn">
            <ImageCarousel className="lg:h-[600px]" />
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#617065]/5 rounded-full -z-0 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/5 rounded-full -z-0 blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Transportation;