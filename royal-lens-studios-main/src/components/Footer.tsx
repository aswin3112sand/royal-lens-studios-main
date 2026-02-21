import { Link } from "react-router-dom";
import { Crown, Instagram, Facebook, Twitter, Mail, Phone, MapPin, MessageCircle, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "919876543210";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    {/* Booking CTA Strip */}
    <div className="border-b border-border">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold">Ready to Create <span className="text-gold">Magic</span>?</h3>
          <p className="text-muted-foreground text-sm mt-1">Book your session today or chat with us on WhatsApp.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-gold text-background hover:bg-gold-light font-semibold">
            <Link to="/booking">Book a Session <ChevronRight className="w-4 h-4 ml-1" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366]/10">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-gold" />
            <span className="font-serif text-xl font-bold">Royal <span className="text-gold">Lens</span></span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Crafting timeless visual stories with a royal touch. Every frame tells a story of elegance and beauty.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg font-semibold text-gold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Portfolio", "Services", "About", "Testimonials", "Contact"].map((label) => (
              <Link key={label} to={`/${label.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg font-semibold text-gold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold shrink-0" /> 123 Royal Avenue, London</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold shrink-0" /> +44 20 7946 0958</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold shrink-0" /> hello@royallens.studio</span>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" /> WhatsApp Chat
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg font-semibold text-gold mb-4">Business Hours</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-5">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold shrink-0" /> Mon – Sat: 9 AM – 7 PM</span>
            <span className="ml-6">Sunday: By Appointment</span>
          </div>
          <h4 className="font-serif text-lg font-semibold text-gold mb-3">Follow Us</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gold/10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Royal Lens Studio. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
