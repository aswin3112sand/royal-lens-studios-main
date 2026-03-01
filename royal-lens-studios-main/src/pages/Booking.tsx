import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarIcon, Camera, CheckCircle, Clock, Phone } from "lucide-react";
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
import SectionBlock from "@/components/layout/SectionBlock";
import SiteContainer from "@/components/layout/SiteContainer";
import { fadeSlideLeft, fadeSlideRight } from "@/lib/motion";

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

    setForm((current) => ({
      ...current,
      name: user.fullName || current.name,
      email: user.email || current.email,
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

      toast({ title: "Booking Confirmed", description: "We'll be in touch shortly to finalize details." });
      setForm((current) => ({ ...current, phone: "", shootType: "" }));
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
      <main className="pt-[var(--nav-h-mobile)] md:pt-[var(--nav-h-desktop)]">
        <SectionBlock compact>
          <SiteContainer>
            <p className="text-center text-sm text-foreground/70">Loading...</p>
          </SiteContainer>
        </SectionBlock>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="pt-[var(--nav-h-mobile)] md:pt-[var(--nav-h-desktop)]">
      <SectionBlock tone="base">
        <SiteContainer>
          <SectionHeading title="Book a Session" subtitle="Choose your preferred date and shoot type to get started." />

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <motion.form
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
              variants={fadeSlideLeft}
              className="neon-card rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold text-primary">New Booking</h3>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Name</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-background/55" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-background/55" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-foreground/55" />
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+44 ..." className="bg-background/55 pl-10" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Preferred Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start bg-background/55 text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} disabled={(day) => day < new Date()} initialFocus className="pointer-events-auto p-3" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Shoot Type</label>
                  <Select value={form.shootType} onValueChange={(value) => setForm({ ...form, shootType: value })}>
                    <SelectTrigger className="bg-background/55">
                      <SelectValue placeholder="Select a shoot type" />
                    </SelectTrigger>
                    <SelectContent>
                      {shootTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={loading} className="neon-btn-primary w-full font-semibold">
                  <Camera className="mr-2 h-4 w-4" /> {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </motion.form>

            <motion.section initial="hidden" animate="visible" variants={fadeSlideRight}>
              <h3 className="mb-4 text-2xl font-bold text-primary">My Bookings</h3>

              {bookings.length === 0 ? (
                <div className="neon-card rounded-2xl p-6 text-center">
                  <Clock className="mx-auto mb-3 h-9 w-9 text-foreground/55" />
                  <p className="text-sm text-foreground/75">No bookings yet. Create your first booking.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <article key={booking.id} className="neon-card flex items-start gap-3 rounded-xl p-5">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <div>
                        <p className="font-semibold">{booking.shootType}</p>
                        <p className="text-sm text-foreground/75">
                          {booking.preferredDate ? format(new Date(booking.preferredDate), "PPP") : "No date"}
                        </p>
                        <p className="mt-1 text-xs text-foreground/68">Booked: {format(new Date(booking.createdAt), "PPP")}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </motion.section>
          </div>
        </SiteContainer>
      </SectionBlock>
    </main>
  );
};

export default Booking;
