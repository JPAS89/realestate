import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, Users, MapPin, Clock, Info, 
  CarFront, Trees, CheckCircle2, User, Phone, Mail 
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/translations";
import PolicyTermsDialog from "./PolicyTermsDialog";
import emailjs from '@emailjs/browser';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import aquaticTours from "@/data/acuatic.json";
import adventureTours from "@/data/adventure.json";  
import walkingTours from "@/data/hiking.json";
import transferData from "@/data/transfers.json";
const COUNTRY_CODES = [
  { code: "+506", label: "CR", flag: "🇨🇷" },
  { code: "+1", label: "US/CA", flag: "🇺🇸" },
  { code: "+34", label: "ES", flag: "🇪🇸" },
  { code: "+52", label: "MX", flag: "🇲🇽" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+33", label: "FR", flag: "🇫🇷" },
  { code: "+54", label: "AR", flag: "🇦🇷" },
  { code: "+57", label: "CO", flag: "🇨🇴" },
];

import bgimage from "@/assets/tress.png";
const convertToMinutes = (timeString: string): number => {
  if (!timeString) return 0;
  const str = timeString.trim().toUpperCase();
  if (/^\d{1,2}:\d{2}$/.test(str)) {
    const [hours, minutes] = str.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const match = str.match(/(\d+)(?::(\d+))?\s*(AM|PM)/i);
  if (match) {
    let hours = parseInt(match[1]);
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }
  return 0;
};

const bookingSchema = z.object({
  bookingType: z.enum(["tour", "transfer"]),
  name: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email format"),
  countryCode: z.string().min(1), // Nuevo campo
  phone: z.string().min(7, "Valid number required").regex(/^\d+$/, "Only numbers allowed"),
  age: z.string().min(1, "Age is required"),
  tour: z.string().min(1, "Please select an option"),
  tourTime: z.string().min(1, "Please select a time"),
  serviceType: z.string().min(1, "Service type required"),
  date: z.string().min(1, "Please select a date"),
  guests: z.string().min(1, "Please enter number of guests"),
  meetingPlace: z.string().min(5, "Please specify location"),
  pickupTime: z.string().min(1, "Please select pickup time"),
  message: z.string().max(1000).optional(),
}).refine((data) => {
  if (data.bookingType === "transfer") return true;
  const pickupMin = convertToMinutes(data.pickupTime);
  const tourMin = convertToMinutes(data.tourTime);
  return pickupMin < tourMin;
}, {
  message: "Pickup must be earlier than the tour start time",
  path: ["pickupTime"], 
});

type BookingForm = z.infer<typeof bookingSchema>;

const Booking = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const location = useLocation();
  const allTours = useMemo(() => [...aquaticTours, ...adventureTours, ...walkingTours], []);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [tempData, setTempData] = useState<BookingForm | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch, trigger } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { bookingType: "tour", serviceType: "regular", guests: "1" }
  });

  const bookingType = watch("bookingType");
  const selectedTourName = watch("tour"); // Cambiado para consistencia
  const selectedService = watch("serviceType");
  const selectedCountryCode = watch("countryCode");
  const numGuests = parseInt(watch("guests") || "1");

  // --- LÓGICA DE PRECIOS CORREGIDA ---
  const totalPrice = useMemo(() => {
    if (bookingType === "tour") {
      const tour = allTours.find(item => item.tour === selectedTourName);
      if (!tour) return 0;
      // Corregido: Acceso a regulartour y privatetour
      const unitPrice = selectedService === "regular" 
        ? Number(tour.regulartour) 
        : Number(tour.privatetour);
      return unitPrice * numGuests;
    } else {
      const transfer = transferData.find(item => item.route === selectedTourName);
      if (!transfer) return 0;
      if (numGuests <= 4) return transfer.prices["1_4"];
      if (numGuests <= 9) return transfer.prices["5_9"];
      return transfer.prices["9_15"];
    }
  }, [bookingType, selectedTourName, selectedService, numGuests, allTours]);

  const availableTimes = useMemo(() => {
    if (bookingType === "transfer") return ["Flexible Transfer Time"];
    const tour = allTours.find(item => item.tour === selectedTourName);
    if (!tour?.schedule) return [];
    return tour.schedule.split(" | ").map(time => time.trim());
  }, [bookingType, selectedTourName, allTours]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeFromUrl = params.get("type");
    const idFromUrl = params.get("id");

    if (typeFromUrl === "transfer" && idFromUrl) {
      setValue("bookingType", "transfer");
      const foundTransfer = transferData.find(tr => tr.id === idFromUrl);
      if (foundTransfer) {
        setValue("tour", foundTransfer.route);
        setValue("tourTime", "Flexible Transfer Time");
      }
    } else if (params.get("tour")) {
      const decodedTour = decodeURIComponent(params.get("tour")!);
      setValue("bookingType", "tour");
      setValue("tour", decodedTour);
    }
  }, [location, setValue]);

  const onPreSubmit = (data: BookingForm) => {
    setTempData(data);
    setIsConfirmOpen(true);
  };

  const onFinalSubmit = () => {
    if (!tempData) return;

    const templateParams = {
      from_name: tempData.name,
      age: tempData.age,
      customer_email: tempData.email,
      customer_phone: `${tempData.countryCode} ${tempData.phone}`, // <--- UNE EL CÓDIGO CON EL NÚMERO
      tour_name: tempData.tour,
      tour_time: tempData.bookingType === "transfer" ? "PRIVATE TRANSFER" : tempData.tourTime,
      pickup_time: tempData.pickupTime,
      pickup_location: tempData.meetingPlace,
      guests: tempData.guests,
      total_price: totalPrice,
      booking_date: tempData.date,
      service_type: tempData.bookingType === "tour" ? tempData.serviceType.toUpperCase() : "PRIVATE TRANSPORT",
      message: `[TYPE: ${tempData.bookingType.toUpperCase()}] ${tempData.message || "No comments"}`
    };

    emailjs.send('service_v0cprld', 'template_bouski5', templateParams, 'vgK0Qk_CvZUNucNET')
    .then(() => {
      toast({ title: "Request Received!", description: "We'll contact you within 12 hours." });
      reset();
      setIsConfirmOpen(false);
      setTempData(null);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      toast({ variant: "destructive", title: "Submission Error", description: "Please try again." });
    });
  };

  return (
    <section id="booking" className="py-20 bg-muted/30 relative"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-bold mb-4-[#445249] font-marker">{t.booking.title}</h2>
          <p className="text-muted-foreground italic">Professional Tours & Transportation</p>
        </div>

        <Card className="max-w-3xl mx-auto border-border shadow-2xl bg-card overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2 font-poppins"><Calendar className="w-5 h-5" />Reservation Request</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-8 space-y-6">
            <form onSubmit={handleSubmit(onPreSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <Label className="text-primary font-bold">What are you booking? *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    type="button"
                    variant={bookingType === "tour" ? "default" : "outline"}
                    className="flex gap-2 items-center h-12"
                    onClick={() => { setValue("bookingType", "tour"); setValue("tour", ""); }}
                  >
                    <Trees className="w-4 h-4" /> Tours
                  </Button>
                  <Button 
                    type="button"
                    variant={bookingType === "transfer" ? "default" : "outline"}
                    className="flex gap-2 items-center h-12"
                    onClick={() => { setValue("bookingType", "transfer"); setValue("tour", ""); setValue("tourTime", "Flexible Transfer Time"); setValue("serviceType", "private"); }}
                  >
                    <CarFront className="w-4 h-4" /> Transportation
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label>Full Name *</Label>
                  <Input {...register("name")} className={errors.name ? "border-destructive" : ""} />
                </div>
                <div className="space-y-2">
                  <Label>Age *</Label>
                  <Input type="number" {...register("age")} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" {...register("email")} />
                </div>
                <div className="space-y-2">
                <Label>Phone Number *</Label>
                  <div className="flex gap-0 shadow-sm rounded-md overflow-hidden ring-1 ring-input focus-within:ring-2 focus-within:ring-primary">
                    <Select 
                      onValueChange={(v) => setValue("countryCode", v)} 
                      value={selectedCountryCode}
                    >
                      <SelectTrigger className="w-[110px] border-none bg-muted/50 rounded-none focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="flex gap-2">{c.flag} {c.code}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="8888 8888" 
                      className="border-none rounded-none focus-visible:ring-0 flex-1"
                      {...register("phone")} 
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-destructive">{errors.phone.message}</p>}
                </div>
              </div>

              <div className={bookingType === "tour" ? "grid md:grid-cols-2 gap-4" : "block"}>
                <div className="space-y-2">
                  <Label>{bookingType === "tour" ? "Activity *" : "Route *"}</Label>
                  <Select onValueChange={(v) => { setValue("tour", v); if(bookingType === "tour") setValue("tourTime", ""); }} value={selectedTourName}>
                    <SelectTrigger className={errors.tour ? "border-destructive" : ""}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {bookingType === "tour" 
                        ? allTours.map((t) => <SelectItem key={t.id} value={t.tour}>{t.tour}</SelectItem>)
                        : transferData.map((tr) => <SelectItem key={tr.id} value={tr.route}>{tr.route}</SelectItem>)
                      }
                    </SelectContent>
                  </Select>
                </div>
                
                {bookingType === "tour" && (
                  <div className="space-y-2">
                    <Label>Tour Schedule *</Label>
                    <Select onValueChange={(v) => setValue("tourTime", v)} value={watch("tourTime")}>
                      <SelectTrigger className={errors.tourTime ? "border-destructive" : ""}><SelectValue placeholder="Select time" /></SelectTrigger>
                      <SelectContent>
                        {availableTimes.map((time) => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label>{bookingType === "tour" ? "Meeting Place *" : "Pickup Location"}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" {...register("meetingPlace")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Pickup Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="time" className="pl-10" {...register("pickupTime")} />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input type="date" {...register("date")} />
                </div>
                {bookingType === "tour" ? (
                  <div className="space-y-2">
                    <Label>Service Type *</Label>
                    <Select onValueChange={(v) => setValue("serviceType", v)} value={selectedService}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Tour</SelectItem>
                        {/* Validación para mostrar opción privada solo si aplica */}
                        {allTours.find(t => t.tour === selectedTourName)?.privatetour !== "Not Applicable" && (
                          <SelectItem value="private">Private Tour</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>People*</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="number" min="1" max="15" className="pl-10 font-bold" {...register("guests")} />
                    </div>
                  </div>
                )}
              </div>

              {totalPrice > 0 && (
                <div className="bg-primary/5 p-6 rounded-xl border-2 border-primary/20 flex justify-between items-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold italic">Total Estimate</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-primary">${totalPrice}</span>
                      <span className="text-sm text-muted-foreground">for {numGuests} pax</span>
                    </div>
                  </div>
                  {bookingType === "tour" && (
                    <div className="text-right">
                      <Label className="mb-2 block text-xs font-bold uppercase">Guests</Label>
                      <Input type="number" min="1" className="w-20 text-center font-bold" {...register("guests")} />
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg flex gap-3 items-start">
                <Info className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800 leading-relaxed">
                <span className="font-bold">Important:</span> This is a pre-booking request. Once submitted, our team will verify availability and contact you within 
                <span className="font-bold"> 12 hours</span> via email or WhatsApp to finalize your reservation.
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-poppins text-xl py-8 shadow-xl">
                Send Booking Request
              </Button>
              
              <div className="text-center pt-2">
                <PolicyTermsDialog />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="max-w-md rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" /> Confirm Details
            </AlertDialogTitle>
            <AlertDialogDescription>
            Double check your contact info and booking details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {tempData && (
            <div className="space-y-4 py-2 text-sm">
              <div className="bg-muted/50 rounded-2xl p-4 border border-border/50">
                <p className="font-bold text-primary mb-2 flex items-center gap-2 uppercase text-[10px] tracking-widest"><Phone className="w-3 h-3"/> Contact Info</p>
                <p><strong>Name:</strong> {tempData.name}</p>
                <p><strong>Phone:</strong> <span className="text-green-600 font-bold">{tempData.countryCode} {tempData.phone}</span></p>
                <p><strong>Email:</strong> {tempData.email}</p>
              </div>

              <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                <p className="font-bold text-primary mb-2 flex items-center gap-2 uppercase text-[10px] tracking-widest">
                  {tempData.bookingType === "tour" ? <Trees className="w-3 h-3"/> : <CarFront className="w-3 h-3"/>} Order Summary
                </p>
                <p><strong>Activity:</strong> {tempData.tour}</p>
                <p><strong>Date:</strong> {tempData.date} ({tempData.tourTime})</p>
                <p><strong>Pickup:</strong> {tempData.pickupTime} from {tempData.meetingPlace}</p>
                <div className="mt-2 pt-2 border-t border-primary/20 flex justify-between items-center">
                  <span className="font-bold text-primary">Total for {tempData.guests} Pax:</span>
                  <span className="font-black text-xl text-primary">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Edit</AlertDialogCancel>
            <AlertDialogAction onClick={onFinalSubmit} className="bg-primary rounded-xl px-8 font-bold">
              Submit Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Booking;