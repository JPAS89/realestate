import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "@/assets/logo21.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = getTranslation(language);
  const location = useLocation();
  const navigate = useNavigate();
  const [navHidden, setNavHidden] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navbar oculto cuando se baja
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsScrolled(true); // activa tu fondo negro + blur
        setNavHidden(false); // oculta nav
      } else {
        setNavHidden(false); // muestra nav
      }
  
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    {
  name: t.nav.tours,
  href: "#tours",
  submenu: [
    { name: "Acuatic", href: "/tours/acuatic" },
    { name: "Adventure", href: "/tours/adventure" },
    { name: "Walking", href: "/tours/walking" },
  ]
},

    { name: t.nav.transportation, href: "/transport" },
    { name: t.nav.gallery, href: "#gallery" },
    { name: t.nav.booking, href: "#booking" },
    { name: t.nav.faq, href: "#faq" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
  
    //  Si es una ruta absoluta como /transport
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
  
    //  Si esta en home, hace el scroll
    if (location.pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/${href}`);
    }
  };
  
  return (
    <nav
    className={`
      fixed left-0 right-0 z-50 transition-all duration-300 font-poppins
      ${navHidden ? "-top-24" : "top-0"}
      ${isScrolled
        ? "bg-gradient-to-b from-[#6d7d71] to-black/40 backdrop-blur-md shadow-elegant"
        : "bg-gradient-to-b from-[#6d7d71]/70 to-black/40 backdrop-blur-md"
      }
      
    `}
  >
      <div className="container mx-full px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center"
          >
            <img
              src={Logo}
              alt="Arenal Discovery Logo"
              className="h-16 md:h-20 lg:h-28 w-auto object-contain transition-all"
            />
          </a>

{/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-6 font-poppins">
  {navItems.map((item) => (
    <div key={item.name} className="relative group">
      
      {/* LINK PRINCIPAL */}
      <a
        href={item.href}
        onClick={(e) => {
          if (!item.submenu) {
            e.preventDefault();
            scrollToSection(item.href);
          }
        }}
        className="relative px-1 py-1 flex items-center gap-1"
      >
        <span className="font-medium text-white group-hover:text-white">
          {item.name}
        </span>

        {/* Flechita solo si tiene submenu */}
        {item.submenu && (
          <svg
            className="w-3 h-3 text-white mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}

        {/* Curva hover */}
        {!item.submenu && (
          <svg
            viewBox="0 0 30 10"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-6 h-3 opacity-0 transform transition-all duration-250 ease-out group-hover:opacity-100 group-hover:translate-y-0"
            aria-hidden="true"
          >
            <path d="M0 0 Q15 10 30 0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </a>

      {/* SUBMENU CON MISMO ESTILO DEL NAVBAR */}
      {item.submenu && (
        <div className="
          absolute left-0 mt-2 w-48 rounded-xl shadow-elegant py-2
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-all duration-200
          bg-gradient-to-b from-[#6d7d71] to-black/40 backdrop-blur-md
        ">
          {item.submenu.map((sub, i) => (
            <a
              key={i}
              href={sub.href}
              className="
                block px-4 py-2 text-white text-sm
                hover:bg-white/10 transition-colors
              "
            >
              {sub.name}
            </a>
          ))}
        </div>
      )}
    </div>
  ))}
</div>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
     {/* Mobile Menu */}
{isMobileMenuOpen && (
  <div className="
    md:hidden py-4 mt-2 font-poppins rounded-lg shadow-elegant
    bg-gradient-to-b from-[#6d7d71] to-black/50 backdrop-blur-md
  ">
    
    {navItems.map((item, index) => {
      const hasSubmenu = !!item.submenu;

      return (
        <div key={index} className="px-4">
          
          {/* ITEM PRINCIPAL */}
          <button
            onClick={(e) => {
              if (!hasSubmenu) {
                e.preventDefault();
                scrollToSection(item.href);
                setIsMobileMenuOpen(false);
                return;
              }
              
              // Toggle submenu
              setOpenSub((prev) => (prev === item.name ? null : item.name));
            }}
            className="w-full flex justify-between items-center py-3 text-white font-medium"
          >
            {item.name}

            {/* Flecha si tiene submenu */}
            {hasSubmenu && (
              <svg
                className={`w-4 h-4 transform transition ${
                  openSub === item.name ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            )}
          </button>

          {/* SUBMENU */}
          {hasSubmenu && (
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSub === item.name ? "max-h-40" : "max-h-0"
              }`}
            >
              {item.submenu.map((sub, i) => (
                <a
                  key={i}
                  href={sub.href}
                  className="
                    block ml-4 mb-2 px-3 py-2 rounded-lg text-white/90 
                    bg-white/10 hover:bg-white/20 text-sm
                    transition
                  "
                >
                  {sub.name}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    })}

    {/* Language & Button 
    <div className="px-4 pt-4 space-y-3">
      <LanguageSwitcher variant="ghost" />

      <Button
        variant="secondary"
        className="w-full font-poppins"
        onClick={() => scrollToSection("#contact")}
      >
        {t.nav.bookNow}
      </Button>
    </div>*/}
  </div>
)}

      </div>
    </nav>
  );
};

export default Navigation;
