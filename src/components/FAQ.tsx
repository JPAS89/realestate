import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import waterfall from "@/assets/waterfall.jpg";

const FAQ = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <section
      id="faq"
      className="relative py-28 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${waterfall})` }}
    >
      {/* Overlay general */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative container mx-auto px-4">

        {/* TÍTULO */}
        <div className="text-center mb-20 text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-9 h-9 text-white/90" />
            <h2 className="text-4xl md:text-5xl font-bold font-poppins">
              {t.faq.title}
            </h2>
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-body leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* PANEL FAQ */}
          <div className="relative lg:mt-12 bg-background/80 backdrop-blur-2xl rounded-[28px] p-10 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">

            {/* Línea orgánica superior */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent rounded-t-[28px]" />

            <Accordion type="single" collapsible className="space-y-6">
              {t.faq.questions.map((faq: any, index: number) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-none"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground text-lg md:text-xl hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body text-base md:text-lg leading-relaxed pt-4">

                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* ESPACIO PARA QUE LA IMAGEN RESPIRE */}
          <div className="hidden lg:block" />
        </div>

      </div>
    </section>
  );
};

export default FAQ;
