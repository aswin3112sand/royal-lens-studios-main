import { useEffect, useState } from "react";
import { adminApi } from "@/lib/services/adminApi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, Trash2, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { extractApiErrorMessage } from "@/lib/api";
import type { PackageItem } from "@/lib/services/types";

const AdminPackages = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", tier: "silver", price: "", description: "", isPopular: false });
  const { toast } = useToast();

  useEffect(() => { void fetchPackages(); }, []);

  const fetchPackages = async () => {
    try {
      const data = await adminApi.getPackages();
      setPackages(data);
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to load packages."), variant: "destructive" });
    }
  };

  const addPackage = async () => {
    try {
      await adminApi.createPackage({
        ...form,
        price: parseFloat(form.price) || 0,
      });
      toast({ title: "Package Added" });
      setShowAdd(false);
      setForm({ name: "", tier: "silver", price: "", description: "", isPopular: false });
      await fetchPackages();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to add package."), variant: "destructive" });
    }
  };

  const deletePackage = async (id: number) => {
    try {
      await adminApi.deletePackage(id);
      await fetchPackages();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to delete package."), variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl">
          <Package className="h-7 w-7 text-gold md:h-8 md:w-8" /> Packages
        </h1>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gold text-royal-dark hover:bg-gold-light sm:w-auto"><Plus className="mr-1 h-4 w-4" /> Add Package</Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-border">
            <DialogHeader><DialogTitle className="font-serif text-gold">Add Package</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Package Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background/50" />
              <Input placeholder="Tier (silver/gold/platinum)" value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="bg-background/50" />
              <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-background/50" />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-background/50" />
              <div className="flex items-center gap-3">
                <Switch checked={form.isPopular} onCheckedChange={(v) => setForm({ ...form, isPopular: v })} />
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
              {p.isPopular && (
                <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold flex items-center gap-1">
                  <Star className="w-3 h-3" /> Popular
                </span>
              )}
              <h3 className="font-serif text-xl font-bold">{p.name}</h3>
              <p className="text-gold font-bold text-2xl mt-2">?{Number(p.price).toLocaleString()}</p>
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
