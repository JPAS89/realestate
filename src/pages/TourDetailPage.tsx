import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Check, ArrowLeft, Users, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
//import mapPlaceholder from "@/assets/tour-waterfall.jpg";

// 1. Importación de datos
import aquaticTours from "@/data/acuatic.json";
import adventureTours from "@/data/adventure.json";  
import walkingTours from "@/data/hiking.json";

const TourDetailPage = () => {
  const { category, tourId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);

  // 2. Mapeo de archivos JSON
  const categoryData: Record<string, any[]> = {
    acuatic: aquaticTours,
    adventure: adventureTours,
    walking: walkingTours,
    hiking: walkingTours 
  };

  const selectedCategoryTours = category ? categoryData[category] : [];
  const tour = selectedCategoryTours?.find((item) => String(item.id) === tourId);

  if (!tour) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-32 pb-20 bg-background flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-primary font-poppins">Tour Not Found</h1>
          <p className="mb-8 text-muted-foreground">The tour you are looking for does not exist.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </main>
      </div>
    );
  }

  const imageSrc = tour.image && tour.image.length > 0 ? tour.image : mapPlaceholder;
  const includesList = tour.tourincludes ? tour.tourincludes.split(" | ") : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <Button
             
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-accent text-muted-foreground text-white "
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.tours?.backToTours || "Back to Tours"}
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img
                src={imageSrc}
                alt={tour.tour}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2">
                {category} Experience
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-poppins">
                {tour.tour}
              </h1>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-muted-foreground bg-accent/50 px-3 py-1 rounded-full border border-border">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-body text-sm font-medium">{tour.duration} hours</span>
                </div>
                <div className="flex items-center text-muted-foreground bg-accent/50 px-3 py-1 rounded-full border border-border">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-body text-sm font-medium">{tour.minage}</span>
                </div>
                <div className="flex items-center text-muted-foreground bg-accent/50 px-3 py-1 rounded-full border border-border">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-body text-sm font-medium">{tour.schedule}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Regular Tour</p>
                  <p className="text-2xl font-bold text-primary">${tour.regulartour}</p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Private Tour</p>
                  <p className="text-2xl font-bold text-primary">
                    {typeof tour.privatetour === 'number' ? `$${tour.privatetour}` : tour.privatetour}
                  </p>
                </div>
              </div>

              <div className="prose prose-slate mb-8">
                <p className="text-lg text-muted-foreground font-body leading-relaxed border-l-4 border-primary/30 pl-4">
                  {tour.description === "TBD" ? "Our team is putting the final touches on this tour's description." : tour.description}
                </p>
              </div>

              {/* BOTÓN ACTUALIZADO CON LÓGICA DE TRANSPORTE */}
              <Link
                to={`/?tour=${encodeURIComponent(tour.tour)}#booking`}
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById('booking');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="flex items-center justify-center gap-2 w-full lg:w-auto bg-primary hover:bg-primary/90 text-white text-lg py-5 px-10 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 font-bold group"
              >
                {t.tours?.bookThisTour || "Book This Tour Now"} 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-border shadow-md bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-8 text-primary font-poppins flex items-center justify-center sm:justify-start">
                  <div className="bg-primary/10 p-2 rounded-lg mr-3">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  {t.tours?.whatsIncluded || "What's Included"}
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 px-2">
                  {includesList.map((item, index) => (
                    <div key={index} className="flex items-center group">
                      <div className="mr-3 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span className="font-body text-base text-muted-foreground group-hover:text-foreground transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>    
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TourDetailPage;