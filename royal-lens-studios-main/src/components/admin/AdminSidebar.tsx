import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronLeft,
  Crown,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";
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

interface AdminSidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const AdminSidebar = ({ mobile = false, onNavigate }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAdminAuth();

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const handleLogout = async () => {
    onNavigate?.();
    await logout();
    navigate("/");
  };

  return (
    <aside
      className={
        mobile
          ? "flex h-full min-h-screen flex-col bg-background"
          : "flex min-h-screen w-64 shrink-0 flex-col border-r border-border glass-strong"
      }
    >
      <div className="border-b border-border p-5">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-gold" />
          <span className="font-serif text-lg font-bold">
            Royal <span className="text-gold">Admin</span>
          </span>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">{isAdmin ? "Administrator" : "Staff"}</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-auto p-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all ${
              isActive(link.to, link.exact)
                ? "border border-gold/20 bg-gold/10 text-gold"
                : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="space-y-1 border-t border-border p-3">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-foreground/70 transition-all hover:bg-white/5 hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-foreground/70 transition-all hover:bg-white/5 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
