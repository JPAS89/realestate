import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";

const Contact = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <section
  id="contact"
  className="relative py-24 bg-[#F4F5F4] text-[#2E2E2E] overflow-hidden"
>
  <div className="container mx-auto px-4">
    {/* Header */}
    <div className="max-w-3xl mx-auto text-center mb-16">
    <h2 className="relative inline-block text-4xl md:text-7xl text-primary font-bold mb-6 underline-effect light font-marker">
        {t.contact.title}
      </h2>
      <p className="text-lg text-muted-foreground font-body leading-relaxed">
        {t.contact.subtitle}
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
      {/* Left – CTA */}
      <div className="space-y-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-black/5">
          <h3 className="text-2xl font-semibold mb-4">
            Let’s plan your journey together
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed font-body">
            Whether you need airport transportation, private transfers or
            help organizing your trip, our local team is ready to assist
            you — quickly, safely and personally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/+50683156229"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>

            <a
              href="tel:+50683156229"
              className="inline-flex items-center justify-center gap-2 border border-black/15 px-6 py-3 rounded-xl font-medium hover:bg-black/5 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-primary" />
              <span className="font-semibold">Email</span>
            </div>
            <a
              href="mailto:info@arenaldiscovery.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              info@arenaldiscovery.com
            </a>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold">Location</span>
            </div>
            <p className="text-sm text-muted-foreground">
              La Fortuna, San Carlos<br />
              Alajuela, Costa Rica
            </p>
          </div>
        </div>
      </div>

      {/* Right – Map (smaller, calmer) */}
      <div className="relative rounded-3xl overflow-hidden shadow-md h-[280px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31455.83964893204!2d-84.66753!3d10.46788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0145c44bd9041%3A0x7f6a0f2f8e7b7b7c!2sLa%20Fortuna%2C%20Alajuela%20Province%2C%20Costa%20Rica!5e0!3m2!1sen!2sus!4v1234567890"
          className="w-full h-full "
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

  );
};

export default Contact;
