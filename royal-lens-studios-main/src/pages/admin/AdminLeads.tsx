import { useEffect, useState } from "react";
import { adminApi } from "@/lib/services/adminApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Users, Search, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { extractApiErrorMessage } from "@/lib/api";
import type { Lead } from "@/lib/services/types";

const leadStatuses = ["new", "contacted", "visit_scheduled", "won", "lost"];

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", source: "manual", notes: "" });
  const { toast } = useToast();

  useEffect(() => {
    void fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await adminApi.getLeads();
      setLeads(data);
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to load leads."), variant: "destructive" });
    }
  };

  const addLead = async () => {
    try {
      await adminApi.createLead(form);
      toast({ title: "Lead Added" });
      setShowAdd(false);
      setForm({ name: "", email: "", phone: "", source: "manual", notes: "" });
      await fetchLeads();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to add lead."), variant: "destructive" });
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await adminApi.updateLeadStatus(id, status);
      await fetchLeads();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to update lead status."), variant: "destructive" });
    }
  };

  const filtered = leads.filter((lead) =>
    lead.name?.toLowerCase().includes(search.toLowerCase()) ||
    lead.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl">
          <Users className="h-7 w-7 text-gold md:h-8 md:w-8" /> Leads
        </h1>
        <div className="flex flex-col gap-3 sm:flex-row md:items-center">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search leads..." className="bg-background/50 pl-10" />
          </div>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gold text-royal-dark hover:bg-gold-light sm:w-auto">
                <Plus className="mr-1 h-4 w-4" /> Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="border-border glass-strong">
              <DialogHeader>
                <DialogTitle className="font-serif text-gold">Add Lead</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50" />
                <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background/50" />
                <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background/50" />
                <Textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-background/50" />
                <Button onClick={addLead} className="w-full bg-gold text-royal-dark hover:bg-gold-light">
                  Save Lead
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl glass p-6 text-center text-sm text-muted-foreground">No leads found.</div>
      ) : (
        <>
          <div className="space-y-4 md:hidden">
            {filtered.map((lead) => (
              <article key={lead.id} className="rounded-xl glass p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email || lead.phone || "No contact info"}</p>
                  </div>
                  <span className="rounded-full bg-secondary/10 px-2 py-1 text-[11px] uppercase tracking-wide text-secondary">
                    {lead.source || "manual"}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">{lead.notes || "No notes"}</p>

                <div className="mt-4">
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</label>
                  <Select value={lead.status} onValueChange={(value) => updateStatus(lead.id, value)}>
                    <SelectTrigger className="h-10 w-full bg-background/30 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {leadStatuses.map((status) => (
                        <SelectItem key={status} value={status} className="text-xs capitalize">
                          {status.replace("_", " ")}
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
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Contact</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Source</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 transition-colors hover:bg-white/5">
                      <td className="px-4 py-3 text-sm font-medium">{lead.name}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm">{lead.email || "-"}</p>
                        <p className="text-xs text-muted-foreground">{lead.phone || ""}</p>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize text-muted-foreground">{lead.source}</td>
                      <td className="px-4 py-3">
                        <Select value={lead.status} onValueChange={(value) => updateStatus(lead.id, value)}>
                          <SelectTrigger className="h-8 w-36 bg-background/30 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {leadStatuses.map((status) => (
                              <SelectItem key={status} value={status} className="text-xs capitalize">
                                {status.replace("_", " ")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="max-w-[220px] px-4 py-3 text-xs text-muted-foreground">{lead.notes || "-"}</td>
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

export default AdminLeads;
