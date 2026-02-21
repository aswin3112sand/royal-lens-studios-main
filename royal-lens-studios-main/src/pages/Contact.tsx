import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Send, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import PageHero from "@/components/PageHero";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "919876543210";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <main>
      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you. Reach out and let's create something beautiful."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* WhatsApp prominent CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-6 md:p-8 text-center max-w-lg mx-auto mb-16 border-[#25D366]/20"
          >
            <MessageCircle className="w-10 h-10 text-[#25D366] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold mb-2">Quick Connect via WhatsApp</h3>
            <p className="text-muted-foreground text-sm mb-4">Get instant replies — tap to chat now.</p>
            <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#20BD5A] font-semibold">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
              </a>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="font-serif text-2xl font-bold text-gold mb-6">Contact Info</h3>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold">Studio Address</p>
                    <p className="text-muted-foreground text-sm">123 Royal Avenue, Mayfair, London W1K 6TH</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground text-sm">+44 20 7946 0958</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground text-sm">hello@royallens.studio</p>
                  </div>
                </div>
              </div>

              <h4 className="font-serif text-lg font-bold text-gold mb-3">Business Hours</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4 text-gold" /> Mon – Sat: 9 AM – 7 PM
              </div>
              <p className="text-sm text-muted-foreground ml-6 mb-6">Sunday: By Appointment</p>

              <h4 className="font-serif text-lg font-bold text-gold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 glass rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">123 Royal Avenue, Mayfair</p>
                  <p className="text-muted-foreground text-xs mt-1">London W1K 6TH</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="glass rounded-lg p-6 md:p-8 space-y-5">
                <h3 className="font-serif text-2xl font-bold text-gold mb-2">Send a Message</h3>
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Your name" className="bg-background/50 border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="your@email.com" className="bg-background/50 border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required placeholder="Tell us about your project..." rows={5} className="bg-background/50 border-border" />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-gold text-background hover:bg-gold-light font-semibold">
                  <Send className="w-4 h-4 mr-2" /> {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
