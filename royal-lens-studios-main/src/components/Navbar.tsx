import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crown, User, LogOut, Shield, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const WHATSAPP_NUMBER = "919876543210";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdminOrStaff, logout, loading } = useAdminAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "glass-strong border-primary/35" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-[var(--nav-h-mobile)] items-center justify-between md:h-[var(--nav-h-desktop)]">
        <Link to="/" className="ring-focus flex items-center gap-2 rounded-md">
          <Crown className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold md:text-2xl">
            Royal <span className="text-primary">Lens</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`ring-focus rounded-md px-1 text-sm font-medium transition-colors ${
                location.pathname === link.to ? "text-primary" : "text-foreground/80 hover:text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="ring-focus inline-flex h-9 w-9 items-center justify-center rounded-full border border-secondary/30 text-secondary transition-colors hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          {loading ? (
            <Button variant="ghost" size="sm" className="cursor-default text-foreground/75">
              <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Checking
            </Button>
          ) : user ? (
            <>
              {isAdminOrStaff && (
                <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/admin")}>
                  <Shield className="mr-1 h-4 w-4" /> Admin
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => navigate("/booking")}>
                <User className="mr-1 h-4 w-4" /> My Bookings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>Login</Button>
              <Button size="sm" className="neon-btn-primary" onClick={() => navigate("/booking")}>Book Now</Button>
            </>
          )}
        </div>

        <button
          className="ring-focus inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-strong border-t border-primary/30 md:hidden"
          >
            <div className="container mx-auto py-4">
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMobile}
                    className={`ring-focus rounded-lg px-3 py-2.5 text-sm font-medium ${
                      location.pathname === link.to ? "bg-primary/15 text-primary" : "text-foreground/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="my-3 h-px bg-border" />

              <div className="grid gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
                    closeMobile();
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>

                {loading ? (
                  <Button variant="ghost" size="sm" className="justify-start text-foreground/75">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking account...
                  </Button>
                ) : user ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => { navigate("/booking"); closeMobile(); }}>
                      <User className="mr-2 h-4 w-4" /> My Bookings
                    </Button>
                    {isAdminOrStaff && (
                      <Button variant="ghost" size="sm" className="justify-start text-primary" onClick={() => { navigate("/admin"); closeMobile(); }}>
                        <Shield className="mr-2 h-4 w-4" /> Admin
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="justify-start" onClick={async () => { await handleLogout(); closeMobile(); }}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => { navigate("/auth"); closeMobile(); }}>
                      Login
                    </Button>
                    <Button size="sm" className="neon-btn-primary justify-start" onClick={() => { navigate("/booking"); closeMobile(); }}>
                      Book Now
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
