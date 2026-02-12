import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";

// Videos
import acuaticVideo from "@/assets/acuaticv.mp4";
import hikingeVideo from "@/assets/hiking.mp4";
import wildlifeVideo from "@/assets/adventure.mp4";

const Tours = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const tours = [
    {
      id: "walking",
      title: t.tours.waterfall.title,
      description: t.tours.waterfall.desc,
      video: hikingeVideo,
      route: "/tours/walking",
    },
    {
      id: "adventure",
      title: t.tours.zipline.title,
      description: t.tours.zipline.desc,
      video: wildlifeVideo,
      route: "/tours/adventure",
    },
    {
      id: "acuatic",
      title: t.tours.wildlife.title,
      description: t.tours.wildlife.desc,
      video: acuaticVideo,
      route: "/tours/acuatic",
    },
  ];

  return (
    <section
      id="tours"
      className="
        py-20 
        bg-gradient-to-b 
        from-[#2e4239] via-[#43564e] to-[#0a1712]
        text-white
      "
    >
      <div className="container mx-auto px-4">

        {/* TITULO GENERAL */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-bold mb-4 font-marker">
            {t.tours.title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-body">
            {t.tours.subtitle}
          </p>
        </div>

        {/* LISTA DE TOURS */}
        <div className="space-y-24">
          {tours.map((tour, index) => {
            const reversed = index % 2 === 1;

            return (
              <div key={tour.id} className="rounded-3xl">
                <div
                  className={`
                    flex flex-col items-center gap-14 
                    ${reversed ? "md:flex-row-reverse" : "md:flex-row"}
                  `}
                >
{/* VIDEO CONTAINER */}
<div className="w-full md:w-[70%]">
  <div className="
    /* 1. Ancho fluido en mobile, limitado en desktop */
    w-full max-w-[890px] 
    
    /* 2. Altura responsiva (proporcional en mobile, fija en desktop) */
    aspect-video md:h-[500px] 
    
    rounded-3xl 
    overflow-hidden 
    shadow-2xl 
    bg-black/30
    backdrop-blur-sm
    mx-auto /* Centra el video si el contenedor es más ancho */
  ">
    <video
      src={tour.video}
      autoPlay
      muted
      loop
      playsInline
      className="
        w-full 
        h-full 
        /* 3. 'cover' suele verse mejor en tours para llenar el espacio, 
           pero 'contain' es más seguro si el formato varía */
        object-cover 
        opacity-0 animate-fadeIn
      "
    />
  </div>
</div>
                  {/* TEXTO */}
                  <div className="
                    w-full md:w-[30%] 
                    flex flex-col justify-center
                    text-center md:text-left
                  ">
                    <h3
                      className="
                        text-4xl md:text-5xl font-bold mb-6 relative inline-block mx-auto md:mx-0
                        underline-effect
                      "
                    >
                      {tour.title}
                    </h3>

                    <p className="text-lg md:text-xl text-gray-300 font-body mb-8 max-w-md mx-auto md:mx-0">
                      {tour.description}
                    </p>

                    <a
                      href={tour.route}
                      className="
                        inline-block 
                        w-fit 
                        px-8 py-4 
                        rounded-full 
                        font-semibold 
                        text-white

                        bg-primary
                        border border-white/70

                        hover:bg-[#3f5c4f]
                        hover:border-white

                        transition-all duration-300
                        transform hover:-translate-y-0.5
                        shadow-md hover:shadow-lg

                        mx-auto md:mx-0
                      "
                    >
                      {language === "en" ? "Explore Tours" : "Ver Tours"}
                    </a>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ANIMACIONES Y SUBRAYADO */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }

        .underline-effect::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 5px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.2),
            var(--primary-color),
            rgba(255,255,255,0.15)
          );
          border-radius: 6px;
          transform: skewX(-12deg);
          opacity: 0.8;
          animation: underlineFade 1.2s ease-out forwards;
        }

        @keyframes underlineFade {
          from { opacity: 0; width: 0; }
          to { opacity: 1; width: 100%; }
        }

        :root {
          --primary-color: #ff7f11;
        }
      `}</style>
    </section>
  );
};

export default Tours;
