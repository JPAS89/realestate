import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import { useEffect, useState } from "react";
import aquaticTours from "@/data/acuatic.json"; // <-- usar alias @
//import mapPlaceholder from "@/assets/tour-waterfall.jpg"; // añade este FPO en assets
import aquaticVideo from "@/assets/acuaticv.mp4";

type AquaticTour = {
  id: string | number;
  tour: string;
  shortDesc?: string;
  description?: string;
  regulartour?: string | number;
  privatetour?: string | number;
  minage?: string;
  tourincludes?: string;
  duration?: string | number;
  schedule?: string;
  image?: string;
  active?: boolean | string;
};

const Acuatic = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Tipado mínimo para evitar warnings
  const [tours, setTours] = useState<AquaticTour[]>([]);

  // Cargar datos del JSON local (seguro)
  useEffect(() => {
    try {
      if (Array.isArray(aquaticTours)) {
        setTours(aquaticTours as AquaticTour[]);
      } else if ((aquaticTours as any)?.data) {
        // por si el JSON viene envuelto en { data: [...] }
        setTours((aquaticTours as any).data);
      } else {
        console.warn("acuatic.json no tiene un array en la raíz:", aquaticTours);
        setTours([]);
      }
    } catch (err) {
      console.error("Error cargando aquaticTours:", err);
      setTours([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ⭐ HERO VIDEO */}
      <section className="relative h-[60vh] w-full overflow-hidden pt-20">
        <video
          src={aquaticVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* Título */}
        <div className="relative h-full flex items-center justify-center px-4">
          
        </div>
      </section>

      {/* ⭐ MAIN CONTENT */}
      <main className="pt-16 pb-20 bg-[#edf3ed]">
              <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .animate-fadeIn {
              animation: fadeIn 1.5s ease-out forwards;
            }

            .underline-aquatic::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: -10px;
              width: 100%;
              height: 6px;
              background: linear-gradient(
                90deg,
                rgba(0, 119, 182, 0.1),
                #d46414, /* Azul Oceano Profundo */
                rgba(0, 180, 216, 0.1)
              );
              border-radius: 4px;
              transform: skewX(-15deg);
              opacity: 0.9;
              animation: underlineFade 1.2s ease-out forwards;
            }

            @keyframes underlineFade {
              from { opacity: 0; width: 0; }
              to { opacity: 1; width: 100%; }
            }
          `}</style>
        <div className="container mx-auto px-4">
    {/* Title & Description */}
    <div className="text-center mb-16 animate-fadeIn">
      <h2 className="relative inline-block text-4xl md:text-6xl font-bold mb-6 text-primary font-poppins underline-aquatic font-marker">
        The Best Acuatic Tours
      </h2>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body mt-6">
          Dive into refreshing water tours in La Fortuna, exploring lakes, rivers, and hidden natural pools surrounded by volcano views, wildlife, and Costa Rica’s pure natural beauty.
      </p>
    </div>

          {/* ⭐ GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.length === 0 && (
              <p className="text-center text-muted-foreground col-span-full">
                Loading tours...
              </p>
            )}

            {tours.map((tour) => {
              // Normalizar datos y valores por defecto
              const id = tour.id ?? tour.tour ?? Math.random();
              const title = tour.tour ?? (tour as any).title ?? "Untitled tour";
              const description = tour.shortDesc ?? "TBD";
              const duration = tour.duration ? String(tour.duration) : "TBD";
              const imageSrc = tour.image && tour.image.length > 0 ? tour.image : mapPlaceholder;

              return (
                <Link key={id} to={`/tours/acuatic/${id}`}>
                  <Card
                    className="overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 border-border cursor-pointer h-full"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={title}
                        onError={(e) => {
                          // fallback si la ruta de la imagen falla
                          (e.currentTarget as HTMLImageElement).src = mapPlaceholder;
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-2xl font-poppins">
                        {title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 font-body">
                        {description}
                      </p>

                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        <span>{duration === "TBD" ? "TBD" : `${duration} hours`}</span>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90 font-poppins">
                        {t.tours?.learnMore ?? "Discover More"}
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Acuatic;
