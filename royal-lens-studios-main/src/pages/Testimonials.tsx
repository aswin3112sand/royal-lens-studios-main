import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import TestimonialCard from "@/components/TestimonialCard";
import SiteContainer from "@/components/layout/SiteContainer";
import SectionBlock from "@/components/layout/SectionBlock";
import SectionHeading from "@/components/SectionHeading";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

const testimonials = [
  {
    name: "Victoria Ashford",
    role: "Bride",
    review:
      "Royal Lens captured our wedding in the most magical way. Every photo feels like a scene from a fairy tale. We could not be more grateful.",
    rating: 5,
  },
  {
    name: "James Whitmore",
    role: "CEO, Sterling Corp",
    review:
      "The corporate portraits exceeded our expectations. Professional, elegant, and perfectly on-brand. Highly recommend.",
    rating: 5,
  },
  {
    name: "Sophia Chen",
    role: "Fashion Designer",
    review:
      "Working with Royal Lens was a dream. They understood my vision and elevated it beyond what I imagined. Pure artistry.",
    rating: 5,
  },
  {
    name: "David & Emma Hart",
    role: "New Parents",
    review:
      "The baby shoot was so gentle and beautiful. They captured our little one's personality perfectly. These photos are priceless.",
    rating: 5,
  },
  {
    name: "Amira Patel",
    role: "Event Planner",
    review:
      "For every corporate gala we organize, Royal Lens is our first call. They never miss a moment and deliver stunning results.",
    rating: 4,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = testimonials[current];

  return (
    <main>
      <PageHero
        title="Client Stories"
        subtitle="Hear from those who trusted us with their most precious moments."
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
      />

      <SectionBlock tone="base">
        <SiteContainer>
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeSlideUp}
            className="neon-card mx-auto mb-10 max-w-md rounded-xl p-6 text-center md:mb-12"
          >
            <div className="mb-2 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-4xl font-extrabold text-secondary">4.9</p>
            <p className="mt-1 text-sm text-foreground/72">Based on 200+ client reviews</p>
          </motion.article>

          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.article
                key={current}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="neon-card rounded-xl p-6 text-center md:p-8"
              >
                <Quote className="mx-auto mb-5 h-8 w-8 text-primary/70" />
                <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">"{activeItem.review}"</p>
                <div className="mb-4 mt-5 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className={`h-4 w-4 ${index < activeItem.rating ? "fill-primary text-primary" : "text-foreground/25"}`} />
                  ))}
                </div>
                <h3 className="text-lg font-bold text-primary">{activeItem.name}</h3>
                <p className="text-sm text-foreground/68">{activeItem.role}</p>
              </motion.article>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="ring-focus neon-card inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/75 hover:text-secondary"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`ring-focus h-2.5 rounded-full transition-all ${index === current ? "w-6 bg-primary" : "w-2.5 bg-foreground/25"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                className="ring-focus neon-card inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/75 hover:text-secondary"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </SiteContainer>
      </SectionBlock>

      <SectionBlock tone="alt">
        <SiteContainer>
          <SectionHeading title="All Reviews" subtitle="A selection of recent testimonials from our clients." highlight={false} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {testimonials.map((item, index) => (
              <TestimonialCard key={`${item.name}-${index}`} name={item.name} role={item.role} review={item.review} rating={item.rating} index={index} />
            ))}
          </motion.div>
        </SiteContainer>
      </SectionBlock>
    </main>
  );
};

export default Testimonials;
