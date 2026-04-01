import { useEffect, useState } from "react";
import { adminApi } from "@/lib/services/adminApi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { extractApiErrorMessage } from "@/lib/api";
import type { Project } from "@/lib/services/types";

const categories = ["wedding", "portrait", "fashion", "corporate", "baby", "event", "product"];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", category: "wedding", description: "", story: "", location: "" });
  const { toast } = useToast();

  useEffect(() => {
    void fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await adminApi.getProjects();
      setProjects(data);
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to load projects."), variant: "destructive" });
    }
  };

  const addProject = async () => {
    try {
      await adminApi.createProject(form);
      toast({ title: "Project Added" });
      setShowAdd(false);
      setForm({ title: "", slug: "", category: "wedding", description: "", story: "", location: "" });
      await fetchProjects();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to add project."), variant: "destructive" });
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await adminApi.deleteProject(id);
      await fetchProjects();
    } catch (error) {
      toast({ title: "Error", description: extractApiErrorMessage(error, "Failed to delete project."), variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl">
          <FolderOpen className="h-7 w-7 text-gold md:h-8 md:w-8" /> Projects
        </h1>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gold text-royal-dark hover:bg-gold-light sm:w-auto">
              <Plus className="mr-1 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg border-border glass-strong">
            <DialogHeader>
              <DialogTitle className="font-serif text-gold">Add Project</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] space-y-3 overflow-y-auto">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-background/50" />
              <Input placeholder="Slug (auto-generated if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="bg-background/50" />
              <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-background/50" />
              <Textarea placeholder="Story / Brief" value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} className="bg-background/50" />
              <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="bg-background/50" />
              <Button onClick={addProject} className="w-full bg-gold text-royal-dark hover:bg-gold-light">
                Save Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl glass p-6 text-center text-sm text-muted-foreground">No projects yet.</div>
      ) : (
        <>
          <div className="space-y-4 md:hidden">
            {projects.map((project) => (
              <article key={project.id} className="rounded-xl glass p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{project.title}</p>
                    <p className="text-xs text-muted-foreground">/{project.slug}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive hover:text-destructive" onClick={() => deleteProject(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <p>Category: <span className="capitalize text-foreground/85">{project.category}</span></p>
                  <p>Location: {project.location || "-"}</p>
                  <p>Status: {project.published ? "Published" : "Draft"}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-xl glass md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Title</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Location</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Published</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-border/50 transition-colors hover:bg-white/5">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium">{project.title}</p>
                        <p className="text-xs text-muted-foreground">/{project.slug}</p>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize">{project.category}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{project.location || "-"}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${project.published ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}>
                          {project.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
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

export default AdminProjects;
