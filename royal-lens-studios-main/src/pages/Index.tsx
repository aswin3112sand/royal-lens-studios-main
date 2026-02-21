import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, ChevronRight, Sparkles, Heart, Shirt, Briefcase, PartyPopper, Baby, MessageCircle } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import StatsRow from "@/components/StatsRow";
import ProcessTimeline from "@/components/ProcessTimeline";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "919876543210";

// Hero video is imported above

const serviceSnap = [
  { icon: Heart, title: "Weddings", desc: "Timeless love stories" },
  { icon: Shirt, title: "Fashion", desc: "Bold editorial looks" },
  { icon: Briefcase, title: "Corporate", desc: "Professional portraits" },
  { icon: PartyPopper, title: "Events", desc: "Every moment captured" },
  { icon: Baby, title: "Baby Shoots", desc: "Tiny precious memories" },
];

const portfolioHighlights = [
  { image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", title: "The Grand Wedding", cat: "Weddings" },
  { image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", title: "Golden Hour", cat: "Portraits" },
  { image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", title: "Haute Couture", cat: "Fashion" },
  { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", title: "Corporate Gala", cat: "Events" },
  { image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80", title: "Little Prince", cat: "Baby" },
  { image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", title: "Romantic Elopement", cat: "Weddings" },
];

const Index = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("packages").select("*").eq("active", true).order("sort_order").limit(3).then(({ data }) => {
      if (data) setPackages(data);
    });
    supabase.from("testimonials").select("*").eq("published", true).eq("featured", true).limit(6).then(({ data }) => {
      if (data) setTestimonials(data);
    });
  }, []);

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Camera className="w-14 h-14 text-gold" />
            </div>
            <h1 className="font-serif text-4xl md:text-7xl font-bold mb-6 leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              Capture Your{" "}
              <span className="text-gold" style={{ textShadow: '0 0 30px hsl(35 55% 65% / 0.4)' }}>Royal</span>{" "}
              Moments
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>
              Where every frame tells a story of elegance, passion, and timeless beauty.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 text-sm text-foreground/70">
              {["5+ Years", "2000+ Shoots", "Same-day Shortlist"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 glass rounded-full px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-background hover:bg-gold-light font-semibold text-base px-8 shadow-lg shadow-gold/30 hover:scale-105 transition-transform">
                <Link to="/booking">Book a Session <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gold/40 text-gold bg-white/5 hover:bg-gold/10 hover:shadow-md hover:shadow-gold/20 font-semibold text-base px-8">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <StatsRow />
        </div>
      </section>

      {/* ═══ SERVICES SNAPSHOT ═══ */}
      <section className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Services" subtitle="Premium photography tailored to your vision." crown />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {serviceSnap.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-lg p-5 text-center group hover:border-gold/30 hover:gold-glow transition-all duration-500 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 transition-colors">
                  <s.icon className="w-6 h-6 text-gold" />
                </div>
                <h4 className="font-serif text-sm font-bold">{s.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
              <Link to="/services">View All Services <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ PORTFOLIO HIGHLIGHTS ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Work" subtitle="A curated showcase of our finest captures." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioHighlights.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-lg cursor-pointer ${
                  i === 0 ? "md:row-span-2 md:aspect-auto aspect-square" : "aspect-[4/3]"
                }`}
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                  <span className="text-xs text-gold font-semibold uppercase tracking-wider">{p.cat}</span>
                  <h3 className="font-serif text-lg font-bold">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
              <Link to="/portfolio">View Full Portfolio <ChevronRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ PACKAGES ═══ */}
      {packages.length > 0 && (
        <section className="py-16 md:py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <SectionHeading title="Our Packages" subtitle="Choose the perfect plan for your special occasion." crown />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {packages.map((pkg, i) => (
                <PackageCard
                  key={pkg.id}
                  name={pkg.name}
                  price={pkg.price}
                  tier={pkg.tier}
                  deliverables={Array.isArray(pkg.deliverables) ? pkg.deliverables : []}
                  isPopular={pkg.is_popular}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ PROCESS TIMELINE ═══ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="How It Works" subtitle="From enquiry to delivery — a seamless experience." />
          <div className="max-w-4xl mx-auto">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <SectionHeading title="Client Stories" subtitle="Hear from those who trusted us with their moments." crown />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <TestimonialCard key={t.id} name={t.client_name} role={t.client_role} review={t.review} rating={t.rating} index={i} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
                <Link to="/testimonials">Read All Reviews <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <SectionHeading title="Our Story" subtitle="A legacy of capturing life's most precious moments with an artistic royal touch." />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              For over a decade, Royal Lens Studio has been the premier destination for those who seek
              photography that transcends the ordinary. Our team of award-winning photographers combines
              artistic vision with technical mastery to create images that are nothing short of extraordinary.
            </p>
            <Button asChild variant="outline" className="border-gold/50 text-gold hover:bg-gold/10">
              <Link to="/about">
                <Sparkles className="w-4 h-4 mr-2" /> Discover Our Journey
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT CTA ═══ */}
      <section className="py-16 md:py-20 royal-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Let's Create Something <span className="text-gold">Beautiful</span>
            </h2>
            <p className="text-foreground/70 text-lg mb-8 max-w-xl mx-auto">
              Get in touch today and let's plan your perfect shoot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-background hover:bg-gold-light font-semibold text-base px-8">
                <Link to="/contact">Get in Touch <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 font-semibold text-base px-8">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
