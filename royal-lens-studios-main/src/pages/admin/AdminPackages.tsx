import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, Trash2, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const AdminPackages = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", tier: "silver", price: "", description: "", is_popular: false });
  const { toast } = useToast();

  useEffect(() => { fetchPackages(); }, []);

  const fetchPackages = async () => {
    const { data } = await supabase.from("packages" as any).select("*").order("sort_order", { ascending: true });
    setPackages((data as any[]) || []);
  };

  const addPackage = async () => {
    const { error } = await supabase.from("packages" as any).insert({
      ...form,
      price: parseFloat(form.price) || 0,
    } as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Package Added" });
      setShowAdd(false);
      setForm({ name: "", tier: "silver", price: "", description: "", is_popular: false });
      fetchPackages();
    }
  };

  const deletePackage = async (id: string) => {
    const { error } = await supabase.from("packages" as any).delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchPackages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <Package className="w-8 h-8 text-gold" /> Packages
        </h1>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-royal-dark hover:bg-gold-light"><Plus className="w-4 h-4 mr-1" /> Add Package</Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-border">
            <DialogHeader><DialogTitle className="font-serif text-gold">Add Package</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Package Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50" />
              <Input placeholder="Tier (silver/gold/platinum)" value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="bg-background/50" />
              <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-background/50" />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-background/50" />
              <div className="flex items-center gap-3">
                <Switch checked={form.is_popular} onCheckedChange={(v) => setForm({ ...form, is_popular: v })} />
                <span className="text-sm">Mark as Popular</span>
              </div>
              <Button onClick={addPackage} className="w-full bg-gold text-royal-dark hover:bg-gold-light">Save Package</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-8">No packages yet. Add your first package!</p>
        ) : (
          packages.map((p) => (
            <div key={p.id} className="glass rounded-xl p-6 relative">
              {p.is_popular && (
                <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold flex items-center gap-1">
                  <Star className="w-3 h-3" /> Popular
                </span>
              )}
              <h3 className="font-serif text-xl font-bold">{p.name}</h3>
              <p className="text-gold font-bold text-2xl mt-2">₹{Number(p.price).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground uppercase mt-1">{p.tier}</p>
              <p className="text-sm text-muted-foreground mt-3">{p.description || "No description"}</p>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deletePackage(p.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPackages;
