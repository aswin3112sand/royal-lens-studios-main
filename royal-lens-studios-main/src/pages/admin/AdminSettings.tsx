import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, Save } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("studio_settings" as any).select("*").limit(1).single();
    if (data) setSettings(data);
  };

  const saveSettings = async () => {
    if (!settings) return;
    setLoading(true);
    const { error } = await supabase
      .from("studio_settings" as any)
      .update({
        studio_name: settings.studio_name,
        whatsapp_number: settings.whatsapp_number,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
      } as any)
      .eq("id", settings.id);
    setLoading(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Settings Saved!" });
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
          <Input value={settings.studio_name || ""} onChange={(e) => setSettings({ ...settings, studio_name: e.target.value })} className="bg-background/50" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">WhatsApp Number</label>
          <Input value={settings.whatsapp_number || ""} onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })} className="bg-background/50" placeholder="+91..." />
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
