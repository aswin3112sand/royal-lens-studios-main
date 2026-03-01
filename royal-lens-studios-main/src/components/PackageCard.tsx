import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeSlideUp } from "@/lib/motion";

interface PackageCardProps {
  name: string;
  price: number;
  tier: string;
  deliverables: string[];
  isPopular?: boolean;
  index: number;
}

const PackageCard = ({ name, price, tier, deliverables, isPopular }: PackageCardProps) => (
  <motion.article
    variants={fadeSlideUp}
    className={`neon-card relative flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.01] ${
      isPopular ? "border-primary shadow-[0_0_26px_hsl(var(--primary)/0.35)]" : ""
    }`}
  >
    {isPopular && (
      <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-primary/65 bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
        <Crown className="h-3 w-3" /> Most Popular
      </div>
    )}

    <header className="text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-secondary">{tier}</p>
      <h3 className="mt-2 text-2xl font-bold">{name}</h3>
      <p className="mt-3 text-4xl font-extrabold text-primary">Rs {price.toLocaleString("en-IN")}</p>
    </header>

    <ul className="mt-6 flex-1 space-y-3">
      {deliverables.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-foreground/82">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <Button asChild className={`mt-6 w-full ${isPopular ? "neon-btn-primary" : "neon-btn-outline"}`} variant={isPopular ? "default" : "outline"}>
      <Link to="/booking">Book Now</Link>
    </Button>
  </motion.article>
);

export default PackageCard;
