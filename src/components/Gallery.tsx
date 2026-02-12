import { useEffect } from "react";
import bridgesImg from "@/assets/pexels.jpg";
import volcanoImg from "@/assets/hike-in-costa-rica-2.jpg";
import volcanoImg2 from "@/assets/hike-in-costa-rica.jpg";
import volcanoImg3 from "@/assets/pexels-osmany-mederos-211956483-14580735-scaled.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import { Music2 } from "lucide-react";

const Gallery = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Reusable Image Card Component con efecto Zoom
  const ImageCard = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <div className={`relative overflow-hidden rounded-[2rem] shadow-lg group ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125 cursor-zoom-in" 
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
    </div>
  );
  return (
    <section id="gallery" className="py-20 bg-[#edf3ed]">
      <div className="container mx-auto px-4 max-w-6xl"> {/* Reducimos max-width para compactar */}
        
        {/* Header Compacto */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 text-[#617065] mb-2 font-bold uppercase tracking-widest text-[10px]">
            <Music2 className="w-3 h-3 animate-pulse" />
            <span>Social Experience</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4-[#445249] font-marker">
            {t.gallery.title}
          </h2>
        </div>

        {/* El Grid Mágico */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3"> {/* Gap muy pequeño para unión visual */}
          
          {/* 1. Lado Izquierdo: 2 fotos verticales ajustadas */}
          <div className="md:col-span-4 grid grid-rows-2 gap-3">
            <div className="relative overflow-hidden rounded-3xl shadow-sm group h-[250px] md:h-full">
              <img src={bridgesImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Bridges" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all" />
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-sm group h-[250px] md:h-full">
              <img src={volcanoImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Volcano" />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all" />
            </div>
          </div>

          {/* 2. Lado Derecho: TikTok arriba y 2 fotos horizontales abajo */}
          <div className="md:col-span-8 flex flex-col gap-3">
            
            {/* TikTok Embed con estilo integrado */}
            <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-2 md:p-4 shadow-inner border border-white/40 flex justify-center">
              <div className="w-full max-w-[700px] overflow-hidden rounded-2xl">
                <blockquote 
                  className="tiktok-embed" 
                  cite="https://www.tiktok.com/@arenal.discovery" 
                  data-unique-id="arenal.discovery" 
                  data-embed-type="creator" 
                  style={{ width: '100%', margin: '0' }}
                >
                  <section>
                    <a target="_blank" href="https://www.tiktok.com/@arenal.discovery">@arenal.discovery</a>
                  </section>
                </blockquote>
              </div>
            </div>

            {/* Fila inferior de la L: Fotos horizontales que cierran el cuadro */}
            <div className="grid grid-cols-2 gap-3 h-[200px] md:h-[250px]">
              <div className="relative overflow-hidden rounded-3xl shadow-sm group">
                <img src={volcanoImg2} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Hike" />
              </div>
              <div className="relative overflow-hidden rounded-3xl shadow-sm group">
                <img src={volcanoImg3} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="River" />
              </div>
            </div>
          </div>

        </div>

        <p className="mt-8 text-center text-[#000000]/50 text-[14px] font-body tracking-wide">
          Hover images to zoom • Scroll TikTok for more
        </p>
      </div>
    </section>
  );
};

export default Gallery;