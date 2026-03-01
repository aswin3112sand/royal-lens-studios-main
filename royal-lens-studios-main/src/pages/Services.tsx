import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Baby, Briefcase, ChevronRight, Heart, MessageCircle, PartyPopper, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import StatsRow from "@/components/StatsRow";
import SectionHeading from "@/components/SectionHeading";
import SiteContainer from "@/components/layout/SiteContainer";
import SectionBlock from "@/components/layout/SectionBlock";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";
import servicesHeroVideo from "@/assets/services-hero-video.mp4";

const WHATSAPP_NUMBER = "919876543210";

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    desc: "Timeless imagery that captures every emotion of your special day, from intimate moments to grand celebrations.",
    price: "From Rs 25,000",
  },
  {
    icon: Shirt,
    title: "Fashion Shoots",
    desc: "High-end editorial and commercial photography for brands, designers, and models seeking a bold visual identity.",
    price: "From Rs 12,000",
  },
  {
    icon: Briefcase,
    title: "Corporate Portraits",
    desc: "Professional headshots and team photography that conveys confidence, trust, and corporate excellence.",
    price: "From Rs 5,000",
  },
  {
    icon: PartyPopper,
    title: "Event Coverage",
    desc: "Comprehensive coverage of galas, conferences, launches, and celebrations with cinematic storytelling.",
    price: "From Rs 18,000",
  },
  {
    icon: Baby,
    title: "Baby Shoots",
    desc: "Adorable, heartwarming photography sessions for newborns, milestones, and family portraits.",
    price: "From Rs 4,000",
  },
];

const Services = () => (
  <main>
    <PageHero
      title="Our Services"
      subtitle="Premium photography services tailored to capture your most important moments."
      video={servicesHeroVideo}
    />

    <SectionBlock tone="base">
      <SiteContainer>
        <SectionHeading title="Service Lines" subtitle="Everything you need, from premium portraits to large event campaigns." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.article key={service.title} variants={fadeSlideUp} className="neon-card relative overflow-hidden rounded-xl p-6">
              <span className="absolute right-4 top-4 text-4xl font-extrabold text-primary/10">{String(index + 1).padStart(2, "0")}</span>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/18">
                <service.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm text-foreground/75">{service.desc}</p>
              <p className="mt-4 text-sm font-semibold text-primary">{service.price}</p>
              <Button asChild variant="outline" size="sm" className="neon-btn-outline mt-5">
                <Link to="/booking">
                  Book Now <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.article>
          ))}
        </motion.div>
      </SiteContainer>
    </SectionBlock>

    <SectionBlock tone="alt" compact>
      <SiteContainer>
        <SectionHeading title="Why Choose Us" subtitle="Numbers that reflect consistent quality and delivery." />
        <StatsRow />
      </SiteContainer>
    </SectionBlock>

    <SectionBlock tone="base" compact>
      <SiteContainer narrow>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={fadeSlideUp} className="text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Need a <span className="neon-gradient-text">Custom Package</span>?
          </h2>
          <p className="mt-4 text-sm text-foreground/75 md:text-base">Chat with us on WhatsApp for tailored solutions.</p>
          <Button asChild size="lg" className="neon-btn-primary mt-6">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
            </a>
          </Button>
        </motion.div>
      </SiteContainer>
    </SectionBlock>
  </main>
);

export default Services;
