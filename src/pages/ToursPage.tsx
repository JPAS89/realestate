import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import waterfallImg from "@/assets/tour-waterfall.jpg";
import ziplineImg from "@/assets/tour-zipline.jpg";
import hotspringsImg from "@/assets/tour-hotsprings.jpg";
import wildlifeImg from "@/assets/tour-wildlife.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";

const ToursPage = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  const tours = [
    {
      id: "waterfall",
      title: t.tours.waterfall.title,
      description: t.tours.waterfall.desc,
      duration: "4 hours",
      location: t.tours.waterfall.location,
      image: waterfallImg,
    },
    {
      id: "zipline",
      title: t.tours.zipline.title,
      description: t.tours.zipline.desc,
      duration: "3 hours",
      location: t.tours.zipline.location,
      image: ziplineImg,
    },
    {
      id: "hotsprings",
      title: t.tours.hotsprings.title,
      description: t.tours.hotsprings.desc,
      duration: "3-4 hours",
      location: t.tours.hotsprings.location,
      image: hotspringsImg,
    },
    {
      id: "wildlife",
      title: t.tours.wildlife.title,
      description: t.tours.wildlife.desc,
      duration: "2-3 hours",
      location: t.tours.wildlife.location,
      image: wildlifeImg,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              {t.tours.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
              {t.tours.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link key={tour.id} to={`/tours/${tour.id}`}>
                <Card 
                  className="overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2 border-border cursor-pointer h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{tour.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 font-body">
                      {tour.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span>{tour.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {t.tours.learnMore}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToursPage;
