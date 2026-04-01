import { useEffect, useState } from "react";
import { adminApi } from "@/lib/services/adminApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { extractApiErrorMessage } from "@/lib/api";
import type { Client } from "@/lib/services/types";

const AdminClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const { toast } = useToast();

  useEffect(() => { void fetchClients(); }, []);

  const fetchClients = async () => {
    try {
      const data = await adminApi.getClients();
      setClients(data);
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to load clients."), variant: "destructive" });
    }
  };

  const addClient = async () => {
    try {
      await adminApi.createClient(form);
      toast({ title: "Client Added" });
      setShowAdd(false);
      setForm({ name: "", email: "", phone: "", notes: "" });
      await fetchClients();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to add client."), variant: "destructive" });
    }
  };

  const filtered = clients.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl">
          <UserCheck className="h-7 w-7 text-gold md:h-8 md:w-8" /> Clients
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." className="pl-10 bg-background/50" />
          </div>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gold text-royal-dark hover:bg-gold-light sm:w-auto"><Plus className="mr-1 h-4 w-4" /> Add Client</Button>
            </DialogTrigger>
            <DialogContent className="glass-strong border-border">
              <DialogHeader><DialogTitle className="font-serif text-gold">Add Client</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50" />
                <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background/50" />
                <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background/50" />
                <Textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-background/50" />
                <Button onClick={addClient} className="w-full bg-gold text-royal-dark hover:bg-gold-light">Save Client</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-8">No clients found.</p>
        ) : (
          filtered.map((c) => (
            <div key={c.id} className="glass rounded-xl p-5">
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-muted-foreground">{c.email || "No email"}</p>
              <p className="text-sm text-muted-foreground">{c.phone || "No phone"}</p>
              {c.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold">{tag}</span>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">{c.totalBookings} bookings</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminClients;
