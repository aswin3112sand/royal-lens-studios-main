import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["wedding", "portrait", "fashion", "corporate", "baby", "event", "product"];

const AdminProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", category: "wedding", description: "", story: "", location: "" });
  const { toast } = useToast();

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects" as any).select("*").order("created_at", { ascending: false });
    setProjects((data as any[]) || []);
  };

  const addProject = async () => {
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { error } = await supabase.from("projects" as any).insert({ ...form, slug } as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Project Added" });
      setShowAdd(false);
      setForm({ title: "", slug: "", category: "wedding", description: "", story: "", location: "" });
      fetchProjects();
    }
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("projects" as any).delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchProjects();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold flex items-center gap-3">
          <FolderOpen className="w-8 h-8 text-gold" /> Projects
        </h1>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-royal-dark hover:bg-gold-light"><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-border max-w-lg">
            <DialogHeader><DialogTitle className="font-serif text-gold">Add Project</DialogTitle></DialogHeader>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-background/50" />
              <Input placeholder="Slug (auto-generated if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-background/50" />
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-background/50" />
              <Textarea placeholder="Story / Brief" value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} className="bg-background/50" />
              <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="bg-background/50" />
              <Button onClick={addProject} className="w-full bg-gold text-royal-dark hover:bg-gold-light">Save Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Title</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Location</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Published</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No projects yet.</td></tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{p.title}</p>
                      <p className="text-xs text-muted-foreground">/{p.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-sm capitalize">{p.category}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.location || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteProject(p.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default AdminProjects;
