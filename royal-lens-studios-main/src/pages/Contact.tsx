import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import PageHero from "@/components/PageHero";
import SiteContainer from "@/components/layout/SiteContainer";
import SectionBlock from "@/components/layout/SectionBlock";
import { publicApi } from "@/lib/services/publicApi";
import { extractApiErrorMessage } from "@/lib/api";
import { fadeSlideLeft, fadeSlideRight, fadeSlideUp } from "@/lib/motion";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await publicApi.createContactMessage({
        name: form.name,
        email: form.email,
        message: form.message,
      });

      toast({ title: "Message Sent", description: "Our team will contact you shortly." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: extractApiErrorMessage(error, "Please try once again."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <PageHero
        title="Contact"
        subtitle="Tell us your goal. We will design a premium visual plan for it."
        image="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?w=1920&q=80"
      />

      <SectionBlock tone="alt">
        <SiteContainer>
          <motion.header
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeSlideUp}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-extrabold md:text-5xl">
              Let us build your <span className="neon-gradient-text">next growth campaign</span>.
            </h2>
            <p className="mt-4 text-sm text-foreground/80 md:text-base">
              Fast response, clear process, and premium execution from first call to final delivery.
            </p>
          </motion.header>

          <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-stretch">
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideLeft}
              className="neon-card flex h-full flex-col rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold">Contact Details</h3>
              <p className="mt-2 text-sm text-foreground/75">Reach us through any channel below.</p>

              <div className="mt-6 grid gap-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">Studio Address</p>
                    <p className="text-sm text-foreground/72">123 Royal Avenue, Mayfair, London W1K 6TH</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-foreground/72">+44 20 7946 0958</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-foreground/72">hello@royallens.studio</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-primary/30 bg-background/45 p-4">
                <p className="text-sm font-semibold text-primary">Business Hours</p>
                <p className="mt-1 text-sm text-foreground/75">Mon - Sat: 9 AM - 7 PM</p>
                <p className="text-sm text-foreground/75">Sunday: By Appointment</p>
              </div>
            </motion.article>

            <motion.form
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeSlideRight}
              className="neon-card flex h-full flex-col rounded-2xl p-6"
            >
              <h3 className="text-2xl font-bold">Send Message</h3>
              <p className="mt-2 text-sm text-foreground/75">Share your shoot requirement and preferred timeline.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Your name"
                    className="bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                    className="bg-background/60"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Message</label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    placeholder="Tell us your project goals"
                    rows={6}
                    className="bg-background/60"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" disabled={loading} className="neon-btn-primary mt-6 w-full font-semibold">
                <Send className="mr-2 h-4 w-4" /> {loading ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </div>
        </SiteContainer>
      </SectionBlock>
    </main>
  );
};

export default Contact;
