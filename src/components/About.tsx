import { Award, Shield, Heart, Leaf, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import slothImage from "@/assets/w1.jpg";
import volcanoImage from "@/assets/w3.jpg";
import bridgesImage from "@/assets/w2.jpg";

const About = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  const features = [
    {
      icon: Award,
      title: t.about.features.expertise.title,
      description: t.about.features.expertise.desc,
    },
    {
      icon: Shield,
      title: t.about.features.safety.title,
      description: t.about.features.safety.desc,
    },
    {
      icon: Heart,
      title: t.about.features.authentic.title,
      description: t.about.features.authentic.desc,
    },
    {
      icon: Leaf,
      title: t.about.features.eco.title,
      description: t.about.features.eco.desc,
    },
  ];

  const highlights = [
    "Local expert guides",
    "Small group experiences",
    "Sustainable tourism",
    "24/7 support",
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground relative inline-block font-marker">
                {t.about.title}

                {/* Underline orgánico */}
                <span
                  className="
                    absolute left-1/2 -bottom-3
                    w-[120%] h-3
                    -translate-x-1/2
                    bg-primary/20
                    rounded-full
                    blur-sm
                  "
                  aria-hidden="true"
                />
              </h2>

          <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl mx-auto">
            {t.about.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-elegant group">
                  <img 
                    src={slothImage} 
                    alt="Sloth in Costa Rica rainforest" 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-elegant group">
                  <img 
                    src={bridgesImage} 
                    alt="Hanging bridges in the jungle" 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
              <div className="pt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-elegant group h-full">
                  <img 
                    src={volcanoImage} 
                    alt="Arenal Volcano" 
                    className="w-full h-full min-h-[320px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card px-6 py-4 rounded-xl shadow-elegant border border-border/50">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary">15+</span>
                  <span className="text-xs text-muted-foreground">Years Experience</span>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary">5000+</span>
                  <span className="text-xs text-muted-foreground">Happy Guests</span>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary">4.9</span>
                  <span className="text-xs text-muted-foreground">Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Content */}
          <div className="lg:pl-8">
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Your Trusted Partner for Costa Rica Adventures
            </h3>
            <p className="text-muted-foreground font-body mb-6 leading-relaxed">
              At Arenal Discovery, we don't just offer tours — we create unforgettable memories. 
              As a local family-owned business, we know the hidden gems, the best times to spot wildlife, 
              and the secret trails that make Costa Rica truly magical.
            </p>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Our commitment to sustainable tourism means you'll experience the authentic beauty 
              of Costa Rica while helping preserve it for future generations. From the moment you 
              arrive, you're part of our family.
            </p>
            
            {/* Quick Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a 
                href="#booking" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-soft"
              >
                Start Your Adventure
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

          </div>
        </div>

{/* Features Grid */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {features.map((feature, index) => (
    <div
      key={index}
      className="
        bg-[#617066]
        p-4 md:p-6        /* Padding reducido en mobile (p-4) */
        rounded-xl
        shadow-soft
        hover:shadow-elegant
        transition-all duration-300
        transform hover:-translate-y-2
        border border-white/10
        flex flex-col      /* Asegura que el contenido se alinee bien */
      "
    >
      {/* Icono más pequeño en mobile (w-10) y normal en desktop (md:w-14) */}
      <div className="w-10 h-10 md:w-14 md:h-14 bg-white/15 rounded-lg flex items-center justify-center mb-3 md:mb-4">
        <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
      </div>

      {/* Título más pequeño en mobile (text-base) para evitar saltos de línea feos */}
      <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2 text-white">
        {feature.title}
      </h3>

      {/* Descripción con texto pequeño y menos líneas en mobile si es necesario */}
      <p className="text-white/85 font-body text-[12px] md:text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default About;
