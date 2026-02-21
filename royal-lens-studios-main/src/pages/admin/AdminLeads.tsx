import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, Search, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const leadStatuses = ["new", "contacted", "visit_scheduled", "won", "lost"];

const AdminLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", source: "manual", notes: "" });
  const { toast } = useToast();

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    const { data } = await supabase.from("leads" as any).select("*").order("created_at", { ascending: false });
    setLeads((data as any[]) || []);
  };

  const addLead = async () => {
    const { error } = await supabase.from("leads" as any).insert(form as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Lead Added" });
      setShowAdd(false);
      setForm({ name: "", email: "", phone: "", source: "manual", notes: "" });
      fetchLeads();
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads" as any).update({ status } as any).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchLeads();
  };

  const filtered = leads.filter((l) =>
    l.name?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <Users className="w-8 h-8 text-gold" /> Leads
        </h1>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="pl-10 bg-background/50" />
          </div>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button className="bg-gold text-royal-dark hover:bg-gold-light"><Plus className="w-4 h-4 mr-1" /> Add Lead</Button>
            </DialogTrigger>
            <DialogContent className="glass-strong border-border">
              <DialogHeader><DialogTitle className="font-serif text-gold">Add Lead</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50" />
                <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background/50" />
                <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background/50" />
                <Textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-background/50" />
                <Button onClick={addLead} className="w-full bg-gold text-royal-dark hover:bg-gold-light">Save Lead</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Contact</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Source</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No leads found.</td></tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-medium text-sm">{l.name}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm">{l.email || "—"}</p>
                      <p className="text-xs text-muted-foreground">{l.phone || ""}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground capitalize">{l.source}</td>
                    <td className="px-4 py-3">
                      <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v)}>
                        <SelectTrigger className="w-36 h-8 text-xs bg-background/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {leadStatuses.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs capitalize">{s.replace("_", " ")}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate">{l.notes || "—"}</td>
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

export default AdminLeads;
