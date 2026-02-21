import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const statuses = ["pending", "confirmed", "rescheduled", "completed", "cancelled"];

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setBookings((data as any[]) || []);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Updated", description: `Booking status changed to ${status}.` });
      fetchBookings();
    }
  };

  const filtered = bookings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase()) ||
    b.shoot_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-gold" /> Bookings
        </h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookings..." className="pl-10 bg-background/50" />
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Client</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No bookings found.</td></tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">{b.shoot_type}</td>
                    <td className="px-4 py-3 text-sm text-gold">{b.preferred_date ? format(new Date(b.preferred_date), "PP") : "—"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{b.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                        <SelectTrigger className="w-32 h-8 text-xs bg-background/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
