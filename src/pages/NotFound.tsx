import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, Home, ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.png"; // Importamos tu logo

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#edf3ed] flex flex-col items-center justify-center px-6 py-12">
      
      {/* ESPACIO PARA EL LOGO */}
      <div className="mb-12 animate-fadeIn">
        <Link to="/">
          <img 
            src={Logo} 
            alt="Arenal Discovery Logo" 
            className="h-20 md:h-24 w-auto object-contain hover:opacity-80 transition-opacity"
          />
        </Link>
      </div>

      <div className="max-w-md w-full text-center">
        {/* ICONO Y EFECTO VISUAL */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#617066]/10 blur-3xl rounded-full scale-150" />
          <div className="relative flex justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-elegant border border-[#617066]/10">
              <Map className="w-16 h-16 md:w-20 md:h-20 text-[#617066] animate-bounce" />
            </div>
          </div>
        </div>

        {/* TEXTO */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-[#4e5a52]">404</h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#617066]">
            Oops! You've strayed off the trail
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed font-body">
            The page you are looking for doesn't exist or has been moved to a new secret location in the rainforest.
          </p>
        </div>

        {/* ACCIONES */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link to="/" className="w-full sm:w-auto">
            <Button className="bg-[#617066] hover:bg-[#4e5a52] text-white px-8 py-6 rounded-full w-full flex gap-2 items-center shadow-lg transition-transform active:scale-95">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-[#617066] text-[#617066] px-8 py-6 rounded-full w-full sm:w-auto flex gap-2 items-center hover:bg-[#617066]/5 transition-transform active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
      </div>

      {/* CSS para la animación de entrada suave */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NotFound;