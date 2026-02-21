import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarIcon, Phone, Camera, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { bookingApi } from "@/lib/services/bookingApi";
import { extractApiErrorMessage } from "@/lib/api";
import type { Booking as BookingItem } from "@/lib/services/types";

const shootTypes = ["Wedding Photography", "Fashion Shoot", "Corporate Portrait", "Event Coverage", "Baby Shoot"];

const Booking = () => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [form, setForm] = useState({ name: "", email: "", phone: "", shootType: "" });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAdminAuth();

  const fetchBookings = useCallback(async () => {
    try {
      const data = await bookingApi.getMyBookings();
      setBookings(data);
    } catch (error) {
      toast({
        title: "Error",
        description: extractApiErrorMessage(error, "Unable to load your bookings."),
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }

    setForm((f) => ({
      ...f,
      name: user.fullName || f.name,
      email: user.email || f.email,
    }));

    void fetchBookings();
  }, [authLoading, user, navigate, fetchBookings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !form.shootType) {
      toast({ title: "Missing Fields", description: "Please select a date and shoot type.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await bookingApi.createBooking({
        name: form.name,
        email: form.email,
        phone: form.phone,
        shootType: form.shootType,
        preferredDate: format(date, "yyyy-MM-dd"),
      });

      toast({ title: "Booking Confirmed!", description: "We'll be in touch shortly to finalize details." });
      setForm((f) => ({ ...f, phone: "", shootType: "" }));
      setDate(undefined);
      await fetchBookings();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: extractApiErrorMessage(error, "Unable to create booking right now."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">Loading...</div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Book a Session" subtitle="Choose your preferred date and shoot type to get started." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Booking Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="glass rounded-xl p-6 md:p-8 space-y-5"
          >
            <h3 className="font-serif text-2xl font-bold text-gold">New Booking</h3>
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-background/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-background/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+44 ..." className="pl-10 bg-background/50" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Preferred Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-background/50", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Shoot Type</label>
              <Select value={form.shootType} onValueChange={(v) => setForm({ ...form, shootType: v })}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select a shoot type" />
                </SelectTrigger>
                <SelectContent>
                  {shootTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gold text-royal-dark hover:bg-gold-light font-semibold">
              <Camera className="w-4 h-4 mr-2" /> {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </motion.form>

          {/* My Bookings */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="font-serif text-2xl font-bold text-gold mb-6">My Bookings</h3>
            {bookings.length === 0 ? (
              <div className="glass rounded-xl p-8 text-center">
                <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No bookings yet. Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="glass rounded-lg p-5 flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold">{b.shootType}</p>
                      <p className="text-sm text-muted-foreground">{b.preferredDate ? format(new Date(b.preferredDate), "PPP") : "No date"}</p>
                      <p className="text-xs text-muted-foreground mt-1">Booked: {format(new Date(b.createdAt), "PPP")}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Booking;