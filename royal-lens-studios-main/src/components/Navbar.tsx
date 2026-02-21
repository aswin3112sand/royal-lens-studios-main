import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crown, User, LogOut, Shield, MessageCircle } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20 border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <Crown className="w-7 h-7 text-gold" />
          <span className="font-serif text-xl md:text-2xl font-bold text-foreground">
            Royal <span className="text-gold">Lens</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === link.to ? "text-gold" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground/60 hover:text-[#25D366] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          {loading ? null : user ? (
            <>
              {isAdminOrStaff && (
                <Button variant="ghost" size="sm" className="text-gold hover:text-gold-light" onClick={() => navigate("/admin")}>
                  <Shield className="w-4 h-4 mr-1" /> Admin
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-gold" onClick={() => navigate("/booking")}>
                <User className="w-4 h-4 mr-1" /> My Bookings
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-gold" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-gold" onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button size="sm" className="bg-gold text-background hover:bg-gold-light font-semibold" onClick={() => navigate("/booking")}>
                Book Now
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-gold/10"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors hover:text-gold hover:bg-gold/5 ${
                      location.pathname === link.to ? "text-gold bg-gold/5" : "text-foreground/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-gold/10 my-2" />
              <div className="flex flex-col gap-1">
                {!loading && user ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start text-foreground/80" onClick={() => { navigate("/booking"); setMobileOpen(false); }}>
                      <User className="w-4 h-4 mr-1" /> My Bookings
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start text-foreground/80" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-1" /> Logout
                    </Button>
                  </>
                ) : !loading ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => { navigate("/auth"); setMobileOpen(false); }}>Login</Button>
                    <Button size="sm" className="bg-gold text-background hover:bg-gold-light font-semibold" onClick={() => { navigate("/booking"); setMobileOpen(false); }}>Book Now</Button>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
