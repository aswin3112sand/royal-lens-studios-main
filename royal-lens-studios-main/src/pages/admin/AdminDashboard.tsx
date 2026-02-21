import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, DollarSign, Clock, TrendingUp, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, leads: 0, clients: 0, todayBookings: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const today = format(new Date(), "yyyy-MM-dd");

    const [bookingsRes, leadsRes, clientsRes, todayRes, recentBookRes, recentLeadRes] = await Promise.all([
      supabase.from("bookings").select("id", { count: "exact", head: true }),
      supabase.from("leads" as any).select("id", { count: "exact", head: true }),
      supabase.from("clients" as any).select("id", { count: "exact", head: true }),
      supabase.from("bookings").select("id", { count: "exact", head: true }).eq("preferred_date", today),
      supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("leads" as any).select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    setStats({
      bookings: bookingsRes.count || 0,
      leads: leadsRes.count || 0,
      clients: clientsRes.count || 0,
      todayBookings: todayRes.count || 0,
    });
    setRecentBookings((recentBookRes.data as any[]) || []);
    setRecentLeads((recentLeadRes.data as any[]) || []);
  };

  const statCards = [
    { icon: CalendarDays, label: "Total Bookings", value: stats.bookings, color: "text-gold" },
    { icon: Clock, label: "Today's Bookings", value: stats.todayBookings, color: "text-green-400" },
    { icon: Users, label: "Leads", value: stats.leads, color: "text-blue-400" },
    { icon: UserPlus, label: "Clients", value: stats.clients, color: "text-purple-400" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="font-serif text-3xl font-bold">{card.value}</div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="glass rounded-xl p-5">
          <h3 className="font-serif text-xl font-bold text-gold mb-4">Recent Bookings</h3>
          {recentBookings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b: any) => (
                <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.shoot_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gold">{b.preferred_date || "No date"}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      b.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                      b.status === "completed" ? "bg-blue-500/20 text-blue-400" :
                      "bg-gold/20 text-gold"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="glass rounded-xl p-5">
          <h3 className="font-serif text-xl font-bold text-gold mb-4">Recent Leads</h3>
          {recentLeads.length === 0 ? (
            <p className="text-muted-foreground text-sm">No leads yet.</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((l: any) => (
                <div key={l.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.email || l.phone}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    l.status === "new" ? "bg-gold/20 text-gold" :
                    l.status === "contacted" ? "bg-blue-500/20 text-blue-400" :
                    l.status === "won" ? "bg-green-500/20 text-green-400" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {l.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
