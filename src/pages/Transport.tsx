import React from "react";
import heroVideo from "@/assets/transport.mp4";  
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import { Link } from "react-router-dom";
import { Clock, Route, Banknote, Users, ArrowRight } from "lucide-react";
import shortDistanceBg from "@/assets/vecteezy.jpg";
import longDistanceBg from "@/assets/vecteezy.png";
import vanImage from "@/assets/buseta1.jpg";
const mapPlaceholder =
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800";

import TRANSFER_DATA from "@/data/transfers.json";

const Transport: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const shortConnections = TRANSFER_DATA.filter(item => item.type === "Local");
  const longConnections = TRANSFER_DATA.filter(item => item.type === "Connection");

  const PriceTable = ({ prices }: { prices: any }) => (
    <div className="mt-4 bg-[#d4ded7] rounded-xl p-4 border border-border/60 shadow-inner">
      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground border-b pb-2 mb-2 tracking-widest">
        <span>Passengers</span>
        <span>Total Price</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-foreground/80">
            <Users className="w-3.5 h-3.5 text-[#617065]" /> 1 - 4
          </span>
          <span className="font-bold text-[#617065]">${prices["1_4"]}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-foreground/80">
            <Users className="w-3.5 h-3.5 text-[#617065]" /> 5 - 9
          </span>
          <span className="font-bold text-[#617065]">${prices["5_9"]}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-2 text-foreground/80">
            <Users className="w-3.5 h-3.5 text-[#617065]" /> 10 - 15
          </span>
          <span className="font-bold text-[#617065]">${prices["9_15"]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full font-poppins text-[#4e5a52]">
      {/* HERO */}
      <section className="relative h-[65vh] overflow-hidden flex items-end">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 " />
        <div className="relative z-10 container mx-auto px-6 pb-20 text-center md:text-left">
          <h1 className="text-4xl md:text-7xl font-bold text-[#ffffff] tracking-tight font-marker">
            Private Transportation
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#ffffff] max-w-2xl leading-relaxed">
            Safe, professional, and comfortable door-to-door transfers.
          </p>
        </div>
      </section>

      {/* SECTION: TRUST & EXPERIENCE */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#617065]/10 rounded-full -z-10 animate-pulse" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-[#617065]">
                <img
                  src={vanImage}
                  alt="Arenal Discovery Professional Fleet"
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#617065] text-white p-6 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-xs uppercase tracking-widest opacity-80">
                  Comfort & Exclusive
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-base font-bold text-amber-600 uppercase tracking-[0.2em]">
                  Premium Service
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-[#617065] leading-tight">
                  Commitment to Your Safety & Comfort
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Arenal Discovery, we don't just provide a ride; we offer a seamless
                  travel experience. Our modern fleet is fully equipped with government
                  permits and comprehensive insurance policies.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#f8f6f3] rounded-full flex items-center justify-center text-[#617065]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#617065]">Certified Drivers</h4>
                    <p className="text-sm text-muted-foreground">
                      Professional, bilingual, and local experts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#f8f6f3] rounded-full flex items-center justify-center text-[#617065]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#617065]">Punctuality</h4>
                    <p className="text-sm text-muted-foreground">
                      We value your time. We are always on time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="p-4 bg-[#f8f6f3] rounded-xl border-l-4 border-[#617065] italic text-[#4e5a52]">
                  "Our units accommodate up to 15 passengers, ensuring group safety and
                  space for all your luggage."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RENDER SECTIONS */}
      {[
        {
          title: "La Fortuna Local Transfers",
          subtitle: "Quick trips and local attractions",
          data: shortConnections,
          bgImage: shortDistanceBg
        },
        {
          title: "National Connection Services",
          subtitle: "Travel comfortably between top destinations",
          data: longConnections,
          bgImage: longDistanceBg
        }
      ].map((section, sIdx) => (
        <section
          key={sIdx}
          className={`relative py-8 ${section.bg ?? ""}`}
          style={
            section.bgImage
              ? {
                  backgroundImage: `url(${section.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }
              : undefined
          }
        >
          <div className="relative z-10 container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-6xl font-bold text-[#617065] mb-4 font-marker">
                {section.title}
              </h2>
              <p className="text-lg text-muted-foreground">{section.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {section.data.map(item => (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-border transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image || mapPlaceholder}
                      alt={item.route}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-white text-xs font-bold uppercase tracking-widest bg-amber-600 px-3 py-1 rounded-full">
                        Private
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-[#617065] mb-4 leading-snug">
                      {item.route}
                    </h4>

                    <div className="flex gap-6 mb-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span>{item.time || "Scheduled"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Route className="w-4 h-4 text-green-600" />
                        <span>{item.distance || "Private"}</span>
                      </div>
                    </div>

                    <PriceTable prices={item.prices} />

                    <div className="mt-8">
                      <Link
                        to="/#booking"
                        onClick={() => {
                          setTimeout(() => {
                            const element = document.getElementById("booking");
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 100);
                        }}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#617065] text-white font-bold hover:bg-[#4e5a52] transition-all shadow-md active:scale-95 group"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CONTACT CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h3 className="text-2xl font-bold text-[#617065] mb-4 text-balance">
            Need a custom route or group transport?
          </h3>
          <p className="text-muted-foreground mb-8">
            We offer specialized quotes for groups larger than 15 people or multiple
            destinations.
          </p>
          <a
            href="mailto:info@arenaldiscovery.com"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#617065] text-white font-bold hover:shadow-lg transition-all"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};

export default Transport;
