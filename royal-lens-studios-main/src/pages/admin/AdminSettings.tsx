import { useEffect, useState } from "react";
import { adminApi } from "@/lib/services/adminApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save } from "lucide-react";
import { extractApiErrorMessage } from "@/lib/api";
import type { StudioSettings } from "@/lib/services/types";

const AdminSettings = () => {
  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => { void fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const data = await adminApi.getSettings();
      setSettings(data);
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Unable to load settings."), variant: "destructive" });
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    setLoading(true);
    try {
      const updated = await adminApi.updateSettings({
        studioName: settings.studioName,
        whatsappNumber: settings.whatsappNumber,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
      });
      setSettings(updated);
      toast({ title: "Settings Saved!" });
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to save settings."), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!settings) return <div className="text-muted-foreground">Loading settings...</div>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold flex items-center gap-3 mb-8">
        <Settings className="w-8 h-8 text-gold" /> Settings
      </h1>

      <div className="glass rounded-xl p-6 md:p-8 max-w-2xl space-y-5">
        <div>
          <label className="text-sm font-medium mb-1 block">Studio Name</label>
          <Input value={settings.studioName || ""} onChange={(e) => setSettings({ ...settings, studioName: e.target.value })} className="bg-background/50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">WhatsApp Number</label>
          <Input value={settings.whatsappNumber || ""} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} className="bg-background/50" placeholder="+91..." />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Phone</label>
          <Input value={settings.phone || ""} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="bg-background/50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <Input value={settings.email || ""} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="bg-background/50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Address</label>
          <Input value={settings.address || ""} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="bg-background/50" />
        </div>
        <Button onClick={saveSettings} disabled={loading} className="bg-gold text-royal-dark hover:bg-gold-light font-semibold">
          <Save className="w-4 h-4 mr-2" /> {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;