import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const AdminLayout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen w-full bg-background md:flex">
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="w-[18rem] border-r border-border bg-background p-0 sm:max-w-[18rem]">
            <AdminSidebar mobile onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="min-w-0 flex-1 overflow-auto">
          <div className="sticky top-0 z-30 border-b border-border/80 bg-background/92 px-4 py-3 backdrop-blur md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Studio Admin</p>
                <h1 className="font-serif text-lg font-semibold text-foreground">Royal Lens Dashboard</h1>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open admin navigation"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="px-4 py-5 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
