import { Link } from "react-router-dom";
import { ChevronRight, Clock, Crown, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "919876543210";

const Footer = () => (
  <footer className="border-t border-border/70 bg-card/35">
    <div className="border-b border-border/70">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
        <div>
          <h3 className="text-2xl font-bold">
            Ready to Create <span className="neon-gradient-text">Magic</span>?
          </h3>
          <p className="mt-2 text-sm text-foreground/72">Book your session today or chat with us on WhatsApp.</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild className="neon-btn-primary w-full sm:w-auto">
            <Link to="/booking">
              Book a Session <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto border-secondary/50 text-secondary hover:text-primary">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>

    <div className="container mx-auto section-space-compact">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="stack-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">
              Royal <span className="text-primary">Lens</span>
            </span>
          </Link>
          <p className="text-sm text-foreground/72">
            Crafting timeless visual stories with a premium modern style. Every frame is designed for elegance and impact.
          </p>
        </div>

        <div className="stack-4">
          <h4 className="text-base font-semibold text-primary">Quick Links</h4>
          <div className="grid gap-2 text-sm">
            {["Portfolio", "Services", "About", "Testimonials", "Contact"].map((label) => (
              <Link key={label} to={`/${label.toLowerCase()}`} className="text-foreground/72 transition-colors hover:text-secondary">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="stack-4">
          <h4 className="text-base font-semibold text-primary">Contact</h4>
          <div className="grid gap-3 text-sm text-foreground/72">
            <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-secondary" /> 123 Royal Avenue, London</span>
            <span className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-secondary" /> +44 20 7946 0958</span>
            <span className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-secondary" /> hello@royallens.studio</span>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 transition-colors hover:text-secondary">
              <MessageCircle className="mt-0.5 h-4 w-4 text-secondary" /> WhatsApp Chat
            </a>
          </div>
        </div>

        <div className="stack-4">
          <h4 className="text-base font-semibold text-primary">Business Hours</h4>
          <div className="grid gap-2 text-sm text-foreground/72">
            <span className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-secondary" /> Mon - Sat: 9 AM - 7 PM</span>
            <span className="pl-6">Sunday: By Appointment</span>
          </div>

          <h4 className="pt-2 text-base font-semibold text-primary">Follow Us</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, index) => (
              <Link
                key={index}
                to="/contact"
                aria-label="Visit contact page for social links"
                className="ring-focus neon-card inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/75 transition-colors hover:text-secondary"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border/60 pt-4 text-center text-sm text-foreground/62">
        © {new Date().getFullYear()} Royal Lens Studio. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
