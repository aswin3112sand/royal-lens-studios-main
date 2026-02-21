import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role?: string;
  review: string;
  rating: number;
  index: number;
}

const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const TestimonialCard = ({ name, role, review, rating, index }: TestimonialCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="glass rounded-lg p-6 flex flex-col"
  >
    <Quote className="w-6 h-6 text-gold/30 mb-3" />
    <p className="text-foreground/80 text-sm leading-relaxed flex-1 italic">"{review}"</p>
    <div className="flex items-center gap-1 mt-4 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-gold fill-gold" : "text-foreground/20"}`} />
      ))}
    </div>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/40 to-gold/10 flex items-center justify-center text-xs font-bold text-gold">
        {getInitials(name)}
      </div>
      <div>
        <p className="text-sm font-semibold">{name}</p>
        {role && <p className="text-xs text-muted-foreground">{role}</p>}
      </div>
    </div>
  </motion.div>
);

export default TestimonialCard;
