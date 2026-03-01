import { motion } from "framer-motion";
import { Award, Calendar, Camera, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SiteContainer from "@/components/layout/SiteContainer";
import SectionBlock from "@/components/layout/SectionBlock";
import { fadeSlideLeft, fadeSlideRight, fadeSlideUp, staggerContainer } from "@/lib/motion";
import aboutHeroVideo from "@/assets/about-hero-video.mp4";

const milestones = [
  { year: "2012", title: "Studio Founded", desc: "Royal Lens Studio was born from a passion for cinematic storytelling." },
  { year: "2015", title: "First Major Award", desc: "Recognized as Best Wedding Photographer at the International Photo Awards." },
  { year: "2018", title: "500+ Clients Served", desc: "A milestone celebrating half a thousand stories beautifully told." },
  { year: "2021", title: "Studio Expansion", desc: "Opened a second studio location with state-of-the-art equipment." },
  { year: "2024", title: "10,000 Sessions", desc: "Reaching the landmark of ten thousand photography sessions completed." },
];

const stats = [
  { icon: Calendar, value: "12+", label: "Years Experience" },
  { icon: Camera, value: "10K+", label: "Sessions" },
  { icon: Award, value: "25+", label: "Awards" },
  { icon: Users, value: "5K+", label: "Happy Clients" },
];

const team = [
  { name: "Alexander Crown", role: "Lead Photographer & Founder", bio: "With 15 years in cinematic photography, Alexander's vision drives every Royal Lens creation." },
  { name: "Isabella Reign", role: "Senior Portrait Artist", bio: "A master of light and emotion, Isabella crafts portraits that speak volumes." },
  { name: "Marcus Sterling", role: "Wedding Specialist", bio: "Marcus turns wedding days into timeless visual narratives." },
  { name: "Sophia Laurent", role: "Fashion & Editorial", bio: "Bringing haute couture to life with bold compositions and striking imagery." },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80",
  "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
  "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=600&q=80",
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const About = () => (
  <main>
    <PageHero
      title="Our Royal Journey"
      subtitle="A decade of capturing life's most precious moments with an artist's eye."
      video={aboutHeroVideo}
    />

    <SectionBlock tone="base">
      <SiteContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.article key={stat.label} variants={fadeSlideUp} className="neon-card rounded-xl p-5 text-center">
              <stat.icon className="mx-auto mb-3 h-7 w-7 text-secondary" />
              <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-foreground/72">{stat.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </SiteContainer>
    </SectionBlock>

    <SectionBlock tone="alt">
      <SiteContainer>
        <SectionHeading title="Our Studio" subtitle="Where magic happens with spaces designed for precision and creativity." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {galleryImages.map((img, index) => (
            <motion.div
              key={img}
              variants={fadeSlideUp}
              className={`overflow-hidden rounded-xl ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img
                src={img}
                alt="Studio"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </SiteContainer>
    </SectionBlock>

    <SectionBlock tone="base">
      <SiteContainer narrow>
        <SectionHeading title="Milestones" subtitle="Key moments that shaped our creative journey." />

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-primary/45 via-primary/25 to-transparent md:left-1/2" />
          <div className="grid gap-6">
            {milestones.map((item, index) => (
              <motion.article
                key={item.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={index % 2 === 0 ? fadeSlideLeft : fadeSlideRight}
                className={`relative flex ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <span className="absolute left-4 top-3 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(108,92,231,0.6)] md:left-1/2" />
                <div className={`ml-9 rounded-xl border border-primary/20 bg-background/40 p-4 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:mr-10" : "md:ml-10"}`}>
                  <p className="text-sm font-semibold text-secondary">{item.year}</p>
                  <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-foreground/75">{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </SiteContainer>
    </SectionBlock>

    <SectionBlock tone="alt">
      <SiteContainer>
        <SectionHeading title="Meet the Team" subtitle="The creative minds behind every premium frame." />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member) => (
            <motion.article key={member.name} variants={fadeSlideUp} className="neon-card rounded-xl p-5 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/18 text-lg font-bold text-primary">
                {getInitials(member.name)}
              </div>
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="mt-1 text-sm text-secondary">{member.role}</p>
              <p className="mt-3 text-sm text-foreground/72">{member.bio}</p>
            </motion.article>
          ))}
        </motion.div>
      </SiteContainer>
    </SectionBlock>
  </main>
);

export default About;
