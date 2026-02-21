import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

const categories = ["All", "Weddings", "Portraits", "Fashion", "Events", "Baby Shoots"];

const projects = [
  { id: 1, title: "The Grand Wedding", category: "Weddings", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", desc: "An opulent celebration of love at a historic estate." },
  { id: 2, title: "Golden Hour Portrait", category: "Portraits", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", desc: "Capturing the soul in warm, natural light." },
  { id: 3, title: "Haute Couture", category: "Fashion", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", desc: "Where fashion meets art in every frame." },
  { id: 4, title: "Corporate Gala", category: "Events", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", desc: "Documenting prestigious corporate events." },
  { id: 5, title: "Little Prince", category: "Baby Shoots", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80", desc: "Tiny moments, everlasting memories." },
  { id: 6, title: "Romantic Elopement", category: "Weddings", image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", desc: "Intimate love stories in breathtaking settings." },
  { id: 7, title: "Studio Elegance", category: "Portraits", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", desc: "Refined studio portraits with a royal aesthetic." },
  { id: 8, title: "Runway Ready", category: "Fashion", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", desc: "Behind the scenes of fashion's finest." },
  { id: 9, title: "Charity Ball", category: "Events", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80", desc: "Elegant events captured with grace." },
];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const getCategoryCount = (cat: string) =>
    cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;

  return (
    <main>
      <PageHero
        title="Portfolio"
        subtitle="A curated showcase of our finest work across every genre."
        image="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&q=80"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-gold text-background"
                    : "glass text-foreground/70 hover:text-gold hover:border-gold"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-60">{getCategoryCount(cat)}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group relative rounded-lg overflow-hidden border border-border glass cursor-pointer break-inside-avoid"
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                    <span className="text-xs text-gold font-semibold uppercase tracking-wider">{project.category}</span>
                    <h3 className="font-serif text-xl font-bold mt-1">{project.title}</h3>
                    <p className="text-sm text-foreground/70 mt-1">{project.desc}</p>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-gold font-semibold uppercase tracking-wider">{project.category}</span>
                    <h3 className="font-serif text-lg font-bold mt-1">{project.title}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
