import { useEffect, useState } from "react";
import { adminApi } from "@/lib/services/adminApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { extractApiErrorMessage } from "@/lib/api";
import type { Booking } from "@/lib/services/types";

const statuses = ["pending", "confirmed", "rescheduled", "completed", "cancelled"];

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    void fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await adminApi.getBookings();
      setBookings(data);
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to load bookings."), variant: "destructive" });
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await adminApi.updateBookingStatus(id, status);
      toast({ title: "Updated", description: `Booking status changed to ${status}.` });
      await fetchBookings();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to update booking status."), variant: "destructive" });
    }
  };

  const filtered = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(search.toLowerCase()) ||
    booking.email.toLowerCase().includes(search.toLowerCase()) ||
    booking.shootType.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl">
          <CalendarDays className="h-7 w-7 text-gold md:h-8 md:w-8" /> Bookings
        </h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookings..." className="bg-background/50 pl-10" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl glass p-6 text-center text-sm text-muted-foreground">No bookings found.</div>
      ) : (
        <>
          <div className="space-y-4 md:hidden">
            {filtered.map((booking) => (
              <article key={booking.id} className="rounded-xl glass p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{booking.name}</p>
                    <p className="text-xs text-muted-foreground">{booking.email}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-primary">
                    {booking.shootType}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <p>Date: {booking.preferredDate ? format(new Date(booking.preferredDate), "PP") : "-"}</p>
                  <p>Phone: {booking.phone || "-"}</p>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</label>
                  <Select value={booking.status} onValueChange={(value) => updateStatus(booking.id, value)}>
                    <SelectTrigger className="h-10 w-full bg-background/30 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status} className="text-xs capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-xl glass md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Client</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Phone</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking) => (
                    <tr key={booking.id} className="border-b border-border/50 transition-colors hover:bg-white/5">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium">{booking.name}</p>
                        <p className="text-xs text-muted-foreground">{booking.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">{booking.shootType}</td>
                      <td className="px-4 py-3 text-sm text-gold">{booking.preferredDate ? format(new Date(booking.preferredDate), "PP") : "-"}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{booking.phone || "-"}</td>
                      <td className="px-4 py-3">
                        <Select value={booking.status} onValueChange={(value) => updateStatus(booking.id, value)}>
                          <SelectTrigger className="h-8 w-32 bg-background/30 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status} className="text-xs capitalize">
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBookings;
