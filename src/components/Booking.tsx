import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, Users, MapPin, Clock, Info, 
  CarFront, Trees, CheckCircle2, Phone 
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
  countryCode: z.string().min(1),
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

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { 
      bookingType: "tour", 
      serviceType: "regular", 
      guests: "1", 
      tour: "", 
      tourTime: "",
      countryCode: "+506"
    }
  });

  const bookingType = watch("bookingType");
  const selectedTourName = watch("tour");
  const selectedService = watch("serviceType");
  const selectedCountryCode = watch("countryCode");
  const numGuests = parseInt(watch("guests") || "1");

  // --- LÓGICA DE PRECIOS CORREGIDA ---
  const { totalPrice, unitPrice, isFlatRate } = useMemo(() => {
    if (!selectedTourName) return { totalPrice: 0, unitPrice: 0, isFlatRate: false };

    if (bookingType === "tour") {
      const tour = allTours.find(item => item.tour === selectedTourName);
      if (tour) {
        const unit = selectedService === "regular" ? Number(tour.regulartour) : Number(tour.privatetour);
        return { unitPrice: unit, totalPrice: unit * numGuests, isFlatRate: false };
      }
    } else {
      const transfer = transferData.find(item => item.route === selectedTourName);
      if (transfer) {
        let flatPrice = 0;
        if (numGuests <= 4) flatPrice = transfer.prices["1_4"];
        else if (numGuests <= 9) flatPrice = transfer.prices["5_9"];
        else flatPrice = transfer.prices["9_15"];
        return { unitPrice: flatPrice, totalPrice: flatPrice, isFlatRate: true };
      }
    }
    return { totalPrice: 0, unitPrice: 0, isFlatRate: false };
  }, [bookingType, selectedTourName, selectedService, numGuests, allTours]);

  const availableTimes = useMemo(() => {
    if (bookingType === "transfer") return ["Flexible Transfer Time"];
    const tour = allTours.find(item => item.tour === selectedTourName);
    return tour?.schedule ? tour.schedule.split(" | ").map(time => time.trim()) : [];
  }, [bookingType, selectedTourName, allTours]);

  const handleTypeChange = (type: "tour" | "transfer") => {
    setValue("bookingType", type);
    setValue("tour", ""); 
    setValue("tourTime", type === "transfer" ? "Flexible Transfer Time" : "");
    setValue("serviceType", type === "transfer" ? "private" : "regular");
    setValue("guests", "1");
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeFromUrl = params.get("type");
    const idFromUrl = params.get("id");

    if (typeFromUrl === "transfer" && idFromUrl) {
      handleTypeChange("transfer");
      const foundTransfer = transferData.find(tr => tr.id === idFromUrl);
      if (foundTransfer) setValue("tour", foundTransfer.route);
    } else if (params.get("tour")) {
      handleTypeChange("tour");
      setValue("tour", decodeURIComponent(params.get("tour")!));
    }
  }, [location]);

  const onPreSubmit = (data: BookingForm) => {
    setTempData(data);
    setIsConfirmOpen(true);
  };

  const onFinalSubmit = () => {
    if (!tempData) return;
    const templateParams = {
      from_name: tempData.name,
      customer_email: tempData.email,
      customer_phone: `${tempData.countryCode} ${tempData.phone}`,
      tour_name: tempData.tour,
      tour_time: tempData.bookingType === "transfer" ? "PRIVATE TRANSFER" : tempData.tourTime,
      pickup_time: tempData.pickupTime,
      pickup_location: tempData.meetingPlace,
      guests: tempData.guests,
      total_price: totalPrice,
      booking_date: tempData.date,
      service_type: tempData.bookingType === "tour" ? tempData.serviceType.toUpperCase() : "PRIVATE TRANSPORT",
      message: `[TYPE: ${tempData.bookingType.toUpperCase()}] ${tempData.message || ""}`
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
    <section id="booking" className="py-20 bg-muted/30 relative" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-bold font-marker text-[#445249]">{t.booking.title}</h2>
          <p className="text-muted-foreground italic">Professional Tours & Transportation</p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-2xl bg-card overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2 font-poppins"><Calendar className="w-5 h-5" />Reservation Request</CardTitle>
          </CardHeader>
          
          <CardContent className="pt-8 space-y-6">
            <form onSubmit={handleSubmit(onPreSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <Label className="text-primary font-bold">What are you booking? *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant={bookingType === "tour" ? "default" : "outline"} className="h-12" onClick={() => handleTypeChange("tour")}>
                    <Trees className="w-4 h-4 mr-2" /> Tours
                  </Button>
                  <Button type="button" variant={bookingType === "transfer" ? "default" : "outline"} className="h-12" onClick={() => handleTypeChange("transfer")}>
                    <CarFront className="w-4 h-4 mr-2" /> Transportation
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
                  <div className="flex gap-0 ring-1 ring-input rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                    <Select onValueChange={(v) => setValue("countryCode", v)} value={selectedCountryCode}>
                      <SelectTrigger className="w-[110px] border-none bg-muted/50"><SelectValue /></SelectTrigger>
                      <SelectContent>{COUNTRY_CODES.map(c => <SelectItem key={c.code} value={c.code}>{c.flag} {c.code}</SelectItem>)}</SelectContent>
                    </Select>
                    <Input placeholder="8888 8888" className="border-none focus-visible:ring-0" {...register("phone")} />
                  </div>
                </div>
              </div>

              <div key={bookingType} className={bookingType === "tour" ? "grid md:grid-cols-2 gap-4" : "block"}>
                <div className="space-y-2">
                  <Label>{bookingType === "tour" ? "Activity *" : "Route *"}</Label>
                  <Select 
                    value={watch("tour")} 
                    onValueChange={(v) => { 
                      setValue("tour", v); 
                      if(bookingType === "tour") setValue("tourTime", ""); 
                    }}
                  >
                    <SelectTrigger className={errors.tour ? "border-destructive" : ""}>
                      <SelectValue placeholder={bookingType === "tour" ? "Select a Tour..." : "Select a Route..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {bookingType === "tour" 
                        ? allTours.map(t => <SelectItem key={t.id} value={t.tour}>{t.tour}</SelectItem>)
                        : transferData.map(tr => <SelectItem key={tr.id} value={tr.route}>{tr.route}</SelectItem>)
                      }
                    </SelectContent>
                  </Select>
                </div>

                {bookingType === "tour" && (
                  <div className="space-y-2">
                    <Label>Tour Schedule *</Label>
                    <Select value={watch("tourTime")} onValueChange={(v) => setValue("tourTime", v)}>
                      <SelectTrigger className={errors.tourTime ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>{availableTimes.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label>{bookingType === "tour" ? "Meeting Place *" : "Pickup Location *"}</Label>
                  <div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input className="pl-10" {...register("meetingPlace")} /></div>
                </div>
                <div className="space-y-2">
                  <Label>Pickup Time *</Label>
                  <div className="relative"><Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="time" className="pl-10" {...register("pickupTime")} /></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Input type="date" {...register("date")} />
                </div>
                <div className="space-y-2">
                  <Label>{bookingType === "tour" ? "Service Type *" : "People *"}</Label>
                  {bookingType === "tour" ? (
                    <Select value={watch("serviceType")} onValueChange={(v) => setValue("serviceType", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Tour</SelectItem>
                        {allTours.find(t => t.tour === selectedTourName)?.privatetour !== "Not Applicable" && <SelectItem value="private">Private Tour</SelectItem>}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="relative"><Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input type="number" min="1" max="15" className="pl-10 font-bold" {...register("guests")} /></div>
                  )}
                </div>
              </div>

              {totalPrice > 0 && (
                <div className="bg-primary/5 p-6 rounded-xl border-2 border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold italic">Total Estimate</p>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-primary">${totalPrice}</span>
                        <span className="text-sm font-medium text-muted-foreground italic">Total</span>
                      </div>
                      <p className="text-sm text-primary/80 font-semibold italic">
                        {isFlatRate 
                          ? `(Flat rate for up to ${numGuests <= 4 ? '4' : numGuests <= 9 ? '9' : '15'} pax)` 
                          : `($${unitPrice} per person x ${numGuests} pax)`}
                      </p>
                    </div>
                  </div>
                  
                  {bookingType === "tour" && (
                    <div className="text-right bg-white p-3 rounded-lg shadow-sm border border-primary/10">
                      <Label className="mb-1 block text-[10px] font-bold uppercase text-primary">Guests</Label>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <Input type="number" min="1" max="15" className="w-16 text-center font-bold border-none h-8 text-lg focus-visible:ring-0" {...register("guests")} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg flex gap-3 items-start">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 leading-relaxed">
                  <span className="font-bold">Important:</span> This is a pre-booking request. Once submitted, our team will verify availability and contact you within
                  <span className="font-bold"> 12 hours</span> via email or WhatsApp to finalize your reservation.
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-poppins text-xl py-8 shadow-xl">Send Booking Request</Button>
              <div className="text-center pt-2"><PolicyTermsDialog /></div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent className="max-w-md rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-primary flex items-center gap-2"><CheckCircle2 className="w-6 h-6 text-green-500" /> Confirm Details</AlertDialogTitle>
            <AlertDialogDescription>Please verify your selection before sending.</AlertDialogDescription>
          </AlertDialogHeader>
          {tempData && (
            <div className="space-y-4 py-2 text-sm">
              <div className="bg-muted/50 rounded-2xl p-4 border border-border/50">
                <p className="font-bold text-primary mb-2 uppercase text-[10px] tracking-widest">Contact Info</p>
                <p><strong>Name:</strong> {tempData.name}</p>
                <p><strong>Phone:</strong> <span className="text-green-600 font-bold">{tempData.countryCode} {tempData.phone}</span></p>
                <p><strong>Email:</strong> {tempData.email}</p>
              </div>

              <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                <p className="font-bold text-primary mb-2 uppercase text-[10px] tracking-widest">Order Summary</p>
                <p><strong>{tempData.bookingType === "tour" ? "Activity:" : "Route:"}</strong> {tempData.tour}</p>
                <p><strong>Date:</strong> {tempData.date} {tempData.bookingType === "tour" ? `(${tempData.tourTime})` : ""}</p>
                <p><strong>Pickup:</strong> {tempData.pickupTime} - {tempData.meetingPlace}</p>
                <div className="mt-2 pt-2 border-t border-primary/20 flex justify-between items-center">
                  <span className="font-bold text-primary">Total for {tempData.guests} Pax:</span>
                  <span className="font-black text-xl text-primary">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Edit</AlertDialogCancel>
            <AlertDialogAction onClick={onFinalSubmit} className="bg-primary rounded-xl px-8 font-bold">Submit Now</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default Booking;