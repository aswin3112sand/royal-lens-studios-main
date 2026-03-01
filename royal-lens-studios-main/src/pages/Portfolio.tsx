import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import SiteContainer from "@/components/layout/SiteContainer";
import SectionBlock from "@/components/layout/SectionBlock";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

const categories = ["All", "Weddings", "Portraits", "Fashion", "Events", "Baby Shoots"];

const projects = [
  { id: 1, title: "The Grand Wedding", category: "Weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", desc: "An opulent celebration of love at a historic estate." },
  { id: 2, title: "Golden Hour Portrait", category: "Portraits", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", desc: "Capturing the soul in warm, natural light." },
  { id: 3, title: "Haute Couture", category: "Fashion", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", desc: "Where fashion meets art in every frame." },
  { id: 4, title: "Corporate Gala", category: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", desc: "Documenting prestigious corporate events." },
  { id: 5, title: "Little Prince", category: "Baby Shoots", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80", desc: "Tiny moments, everlasting memories." },
  { id: 6, title: "Romantic Elopement", category: "Weddings", image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", desc: "Intimate love stories in breathtaking settings." },
  { id: 7, title: "Studio Elegance", category: "Portraits", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", desc: "Refined studio portraits with a premium aesthetic." },
  { id: 8, title: "Runway Ready", category: "Fashion", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", desc: "Behind the scenes of fashion's finest." },
  { id: 9, title: "Charity Ball", category: "Events", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80", desc: "Elegant events captured with grace." },
];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((project) => project.category === active);

  const getCategoryCount = (category: string) =>
    category === "All" ? projects.length : projects.filter((project) => project.category === category).length;

  return (
    <main>
      <PageHero
        title="Portfolio"
        subtitle="A curated showcase of our finest work across every genre."
        image="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80"
      />

      <SectionBlock tone="base">
        <SiteContainer>
          <div className="mb-8 flex flex-wrap justify-center gap-2 md:mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`ring-focus rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active === category
                    ? "bg-primary text-primary-foreground"
                    : "neon-card text-foreground/78 hover:text-secondary"
                }`}
              >
                {category}
                <span className="ml-1.5 text-xs opacity-70">{getCategoryCount(category)}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3"
            >
              {filtered.map((project) => (
                <motion.article
                  key={project.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeSlideUp}
                  className="neon-card group relative cursor-pointer break-inside-avoid overflow-hidden rounded-xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/25 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{project.category}</span>
                    <h3 className="mt-1 text-xl font-bold">{project.title}</h3>
                    <p className="mt-1 text-sm text-foreground/75">{project.desc}</p>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{project.category}</span>
                    <h3 className="mt-1 text-lg font-bold">{project.title}</h3>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </SiteContainer>
      </SectionBlock>
    </main>
  );
};

export default Portfolio;
