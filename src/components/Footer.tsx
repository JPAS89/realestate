import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import Logo from "@/assets/logo21.png";
import PaymentMethods from "@/assets/paypal visa.webp"; 
import tiktokicon from "@/assets/tiktok3.png";

const Footer = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-gradient-to-b from-[#6d7d71] to-[#0a0a0a] text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src={Logo}
              alt="Arenal Discovery Logo"
              width={200}
              height={80}
              className="h-16 md:h-20 lg:h-28 w-auto object-contain transition-all"
            />
            <p className="font-body opacity-90 mt-4">
              Your gateway to authentic Costa Rican adventures in La Fortuna.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body">
              <li><a href="#tours" className="opacity-90 hover:opacity-100">Tours</a></li>
              <li><a href="#transportation" className="opacity-90 hover:opacity-100">Transportation</a></li>
              <li><a href="#booking" className="opacity-90 hover:opacity-100">Booking</a></li>
              <li><a href="#about" className="opacity-90 hover:opacity-100">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Tours</h4>
            <ul className="space-y-2 font-body">
              <li className="opacity-90">Waterfall Adventure</li>
              <li className="opacity-90">Canopy Zipline</li>
              <li className="opacity-90">Hot Springs</li>
              <li className="opacity-90">Wildlife Watching</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1MqjV6Y1xq/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/arenal.discovery?igsh=MWNhZnFsZ2ViNWNmNQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              
              {/* AJUSTE TIKTOK: Usamos img para el archivo SVG importado */}
              <a 
                  href="https://www.tiktok.com/@arenal.discovery" target="_blank" rel="noopener noreferrer" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                <img 
                  src={tiktokicon} 
                  alt="TikTok" 
                  className="w-5 h-5 " // Invert ayuda a que se vea blanco si el SVG original es negro
                />
              </a>

              <a href="mailto:info@arenaldiscovery.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <p className="text-xs font-semibold mb-3 uppercase tracking-wider opacity-70">Secure Payment Methods We Accept</p>
              <img 
                src={PaymentMethods} 
                alt="Pay Pal Payment Methods"
                width={250}
                height={50}
                className="h-12 w-auto object-contain brightness-110 grayscale-[0.5] hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-8 text-center font-body opacity-80">
          <p>&copy; {currentYear} Arenal Discovery. All rights reserved. By Aldea Studio.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;