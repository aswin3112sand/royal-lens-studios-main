import { Link, useLocation, useNavigate } from "react-router-dom";
import { Crown, LayoutDashboard, CalendarDays, Users, UserCheck, FolderOpen, Package, Settings, LogOut, ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/bookings", icon: CalendarDays, label: "Bookings" },
  { to: "/admin/leads", icon: Users, label: "Leads" },
  { to: "/admin/clients", icon: UserCheck, label: "Clients" },
  { to: "/admin/projects", icon: FolderOpen, label: "Projects" },
  { to: "/admin/packages", icon: Package, label: "Packages" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen glass-strong border-r border-border flex flex-col shrink-0">
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-gold" />
          <span className="font-serif text-lg font-bold">Royal <span className="text-gold">Admin</span></span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{isAdmin ? "Administrator" : "Staff"}</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(link.to, link.exact)
                ? "bg-gold/10 text-gold border border-gold/20"
                : "text-foreground/70 hover:text-foreground hover:bg-white/5"
            }`}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground/70 hover:text-destructive hover:bg-white/5 transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
