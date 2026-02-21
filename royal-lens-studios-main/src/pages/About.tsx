import { motion } from "framer-motion";
import { Award, Users, Camera, Calendar } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import aboutHeroVideo from "@/assets/about-hero-video.mp4";

const milestones = [
  { year: "2012", title: "Studio Founded", desc: "Royal Lens Studio was born from a passion for cinematic storytelling." },
  { year: "2015", title: "First Major Award", desc: "Recognized as 'Best Wedding Photographer' at the International Photo Awards." },
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
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const About = () => (
  <main>
    <PageHero
      title="Our Royal Journey"
      subtitle="A decade of capturing life's most precious moments with an artist's eye."
      video={aboutHeroVideo}
    />

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-lg p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
              <div className="font-serif text-3xl font-bold text-gold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Studio Gallery Bento */}
        <SectionHeading title="Our Studio" subtitle="Where magic happens — state-of-the-art spaces designed for perfection." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-lg overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img src={img} alt="Studio" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mb-20">
          <h3 className="font-serif text-2xl font-bold text-center text-gold mb-10">Milestones</h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-start mb-10 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 mt-1.5 z-10 gold-glow" />
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-gold font-bold font-serif text-lg">{m.year}</span>
                  <h4 className="font-serif text-xl font-semibold mt-1">{m.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <SectionHeading title="Meet the Team" subtitle="The creative minds behind every royal frame." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-lg p-6 text-center group hover:border-gold/50 transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 mx-auto mb-4 flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-gold">{getInitials(member.name)}</span>
              </div>
              <h4 className="font-serif text-lg font-bold">{member.name}</h4>
              <p className="text-gold text-sm mt-1">{member.role}</p>
              <p className="text-muted-foreground text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
