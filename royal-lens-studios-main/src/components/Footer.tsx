import { Link } from "react-router-dom";
import { ChevronRight, Crown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "919876543210";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="mt-12 border-t border-border bg-[#181818] md:mt-16">
    <div className="border-b border-border/80">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-7 text-center md:flex-row md:text-left">
        <div>
          <h3 className="text-3xl font-semibold md:text-4xl">
            Ready to Create <span className="neon-gradient-text">Cinematic Memories</span>?
          </h3>
          <p className="mt-2 text-sm text-foreground/70 md:text-base">Book your shoot or message us directly on WhatsApp.</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild className="neon-btn-primary w-full sm:w-auto">
            <Link to="/booking">
              Book a Shoot <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="neon-btn-outline w-full sm:w-auto">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>

    <div className="container mx-auto section-space-compact">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="stack-4">
          <Link to="/" className="ring-focus inline-flex items-center gap-2 rounded-md">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-wide text-foreground">Royal Lens Studios</span>
          </Link>
          <p className="text-sm text-foreground/70">
            Premium photography with cinematic framing, elegant tones, and timeless storytelling for every milestone.
          </p>
        </div>

        <div className="stack-4">
          <h4 className="text-base font-semibold text-primary">Explore</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="ring-focus rounded-md text-foreground/75 transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="stack-4">
          <h4 className="text-base font-semibold text-primary">Contact</h4>
          <div className="grid gap-3 text-sm text-foreground/72">
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" /> 123 Royal Avenue, London
            </span>
            <span className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-primary" /> +44 20 7946 0958
            </span>
            <span className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-primary" /> hello@royallens.studio
            </span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ring-focus inline-flex items-start gap-2 rounded-md text-foreground/75 transition-colors hover:text-primary"
            >
              <MessageCircle className="mt-0.5 h-4 w-4 text-primary" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border/70 pt-4 text-center text-sm text-foreground/60">
        &copy; {new Date().getFullYear()} Royal Lens Studios. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

