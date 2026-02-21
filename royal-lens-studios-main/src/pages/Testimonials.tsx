import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import TestimonialCard from "@/components/TestimonialCard";

const testimonials = [
  { name: "Victoria Ashford", role: "Bride", review: "Royal Lens captured our wedding in the most magical way. Every photo feels like a scene from a fairy tale. We couldn't be more grateful.", rating: 5 },
  { name: "James Whitmore", role: "CEO, Sterling Corp", review: "The corporate portraits exceeded our expectations. Professional, elegant, and perfectly on-brand. Highly recommend.", rating: 5 },
  { name: "Sophia Chen", role: "Fashion Designer", review: "Working with Royal Lens was a dream. They understood my vision and elevated it beyond what I imagined. Pure artistry.", rating: 5 },
  { name: "David & Emma Hart", role: "New Parents", review: "The baby shoot was so gentle and beautiful. They captured our little one's personality perfectly. These photos are priceless.", rating: 5 },
  { name: "Amira Patel", role: "Event Planner", review: "For every corporate gala we organize, Royal Lens is our first call. They never miss a moment and deliver stunning results.", rating: 4 },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <main>
      <PageHero
        title="Client Stories"
        subtitle="Hear from those who trusted us with their most precious moments."
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Google-style rating banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-6 md:p-8 text-center max-w-md mx-auto mb-16"
          >
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-gold fill-gold" />
              ))}
            </div>
            <div className="font-serif text-4xl font-bold text-gold">4.9</div>
            <p className="text-muted-foreground text-sm mt-1">Based on 200+ client reviews</p>
          </motion.div>

          {/* Carousel */}
          <div className="max-w-3xl mx-auto relative mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-xl p-8 md:p-12 text-center"
              >
                <Quote className="w-10 h-10 text-gold/30 mx-auto mb-6" />
                <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-foreground/90 mb-6">"{t.review}"</p>
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < t.rating ? "text-gold fill-gold" : "text-foreground/20"}`} />
                  ))}
                </div>
                <h4 className="font-serif text-lg font-bold text-gold">{t.name}</h4>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-gold transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-gold w-6" : "bg-foreground/20"}`} />
                ))}
              </div>
              <button onClick={() => setCurrent((p) => (p + 1) % testimonials.length)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/70 hover:text-gold transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* All testimonials grid */}
          <h3 className="font-serif text-2xl font-bold text-center text-gold mb-8">All Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} name={t.name} role={t.role} review={t.review} rating={t.rating} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
