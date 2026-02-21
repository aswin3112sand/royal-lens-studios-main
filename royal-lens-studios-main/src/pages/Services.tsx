import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Shirt, Briefcase, PartyPopper, Baby, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import StatsRow from "@/components/StatsRow";
import SectionHeading from "@/components/SectionHeading";
import servicesHeroVideo from "@/assets/services-hero-video.mp4";

const WHATSAPP_NUMBER = "919876543210";

const services = [
  { icon: Heart, title: "Wedding Photography", desc: "Timeless imagery that captures every emotion of your special day, from intimate moments to grand celebrations.", price: "From ₹25,000" },
  { icon: Shirt, title: "Fashion Shoots", desc: "High-end editorial and commercial photography for brands, designers, and models seeking a bold visual identity.", price: "From ₹12,000" },
  { icon: Briefcase, title: "Corporate Portraits", desc: "Professional headshots and team photography that conveys confidence, trust, and corporate excellence.", price: "From ₹5,000" },
  { icon: PartyPopper, title: "Event Coverage", desc: "Comprehensive coverage of galas, conferences, launches, and celebrations with cinematic storytelling.", price: "From ₹18,000" },
  { icon: Baby, title: "Baby Shoots", desc: "Adorable, heartwarming photography sessions for newborns, milestones, and family portraits.", price: "From ₹4,000" },
];

const Services = () => (
  <main>
    <PageHero
      title="Our Services"
      subtitle="Premium photography services tailored to capture your most important moments."
      video={servicesHeroVideo}
    />

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-lg p-6 md:p-8 group hover:border-gold/50 hover:gold-glow transition-all duration-500 relative overflow-hidden"
            >
              <span className="absolute top-4 right-4 font-serif text-5xl font-bold text-gold/5 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <service.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.desc}</p>
              <p className="text-gold font-semibold mb-5">{service.price}</p>
              <Button asChild variant="outline" size="sm" className="border-gold/30 text-gold hover:bg-gold/10">
                <Link to="/booking">Book Now <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 md:py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <SectionHeading title="Why Choose Us" subtitle="Numbers that speak for themselves." />
        <div className="max-w-4xl mx-auto">
          <StatsRow />
        </div>
      </div>
    </section>

    {/* WhatsApp CTA */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h3 className="font-serif text-2xl md:text-4xl font-bold mb-4">
          Need a <span className="text-gold">Custom Package</span>?
        </h3>
        <p className="text-muted-foreground mb-6">Chat with us on WhatsApp for tailored solutions.</p>
        <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#20BD5A] font-semibold">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5 mr-2" /> Chat on WhatsApp
          </a>
        </Button>
      </div>
    </section>
  </main>
);

export default Services;
