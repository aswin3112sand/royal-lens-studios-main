import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AdminClients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const { toast } = useToast();

  useEffect(() => { fetchClients(); }, []);

  const fetchClients = async () => {
    const { data } = await supabase.from("clients" as any).select("*").order("created_at", { ascending: false });
    setClients((data as any[]) || []);
  };

  const addClient = async () => {
    const { error } = await supabase.from("clients" as any).insert(form as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Client Added" });
      setShowAdd(false);
      setForm({ name: "", email: "", phone: "", notes: "" });
      fetchClients();
    }
  };

  const filtered = clients.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <UserCheck className="w-8 h-8 text-gold" /> Clients
        </h1>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." className="pl-10 bg-background/50" />
          </div>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button className="bg-gold text-royal-dark hover:bg-gold-light"><Plus className="w-4 h-4 mr-1" /> Add Client</Button>
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
                  {c.tags.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold">{tag}</span>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">{c.total_bookings} bookings</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminClients;
