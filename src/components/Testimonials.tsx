import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";

const Testimonials = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  // 1. Estado para almacenar las reseñas
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Simulación de carga desde API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Aquí llamarías a tu API: const res = await fetch('/api/google-reviews');
        // Por ahora, usamos un pequeño retraso para simular la carga
        setIsLoading(false);
      } catch (error) {
        console.error("Error cargando reviews", error);
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            {t.testimonials.subtitle}
          </p>
          {/* Badge de Google para dar credibilidad */}
          <div className="mt-4 flex justify-center items-center gap-2">
            <span className="text-sm font-medium">Excelente 4.9/5 en</span>
            <img src="/google-logo.svg" alt="Google" className="h-5" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            <p className="col-span-3 text-center">Cargando experiencias...</p>
          ) : (
            reviews.map((testimonial, index) => (
              <Card key={index} className="border-border hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'fill-accent text-accent' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 font-body italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    {/* Añadimos avatar para que se vea más real como en Google */}
                    <img 
                      src={testimonial.profile_photo_url} 
                      alt={testimonial.author_name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author_name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.relative_time_description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;