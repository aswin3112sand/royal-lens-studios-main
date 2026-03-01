import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { fadeSlideUp } from "@/lib/motion";

interface TestimonialCardProps {
  name: string;
  role?: string;
  review: string;
  rating: number;
  index: number;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TestimonialCard = ({ name, role, review, rating }: TestimonialCardProps) => (
  <motion.article variants={fadeSlideUp} className="neon-card flex h-full flex-col rounded-xl p-5 md:p-6">
    <Quote className="mb-3 h-5 w-5 text-primary/70" />
    <p className="flex-1 text-sm leading-relaxed text-foreground/82">"{review}"</p>

    <div className="mt-4 flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} className={`h-3.5 w-3.5 ${idx < rating ? "fill-primary text-primary" : "text-foreground/25"}`} />
      ))}
    </div>

    <div className="mt-4 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
        {getInitials(name)}
      </div>
      <div>
        <p className="text-sm font-semibold">{name}</p>
        {role && <p className="text-xs text-foreground/65">{role}</p>}
      </div>
    </div>
  </motion.article>
);

export default TestimonialCard;
