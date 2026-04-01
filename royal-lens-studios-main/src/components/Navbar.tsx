import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Crown, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "glass-strong border-border/90" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-[var(--nav-h-mobile)] items-center justify-between md:h-[var(--nav-h-desktop)]">
        <Link to="/" className="ring-focus inline-flex items-center gap-2 rounded-md">
          <Crown className="h-7 w-7 text-primary" />
          <span className="text-lg font-semibold tracking-wide text-foreground md:text-xl">
            Royal <span className="text-primary">Lens</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link-item ring-focus rounded-md px-1 py-1 text-sm font-medium transition-colors ${
                  isActive ? "is-active text-primary" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="ring-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <Button asChild size="sm" className="neon-btn-primary">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>

        <button
          className="ring-focus inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass-strong border-t border-border md:hidden">
          <div className="container mx-auto py-4">
            <div className="grid gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={isActive ? "page" : undefined}
                    className={`ring-focus rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive ? "bg-primary/16 text-primary" : "text-foreground/88 hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="my-3 h-px bg-border" />

            <div className="grid gap-2">
              <Button
                variant="outline"
                size="sm"
                className="neon-btn-outline justify-start"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer")}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </Button>
              <Button asChild size="sm" className="neon-btn-primary justify-start">
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
