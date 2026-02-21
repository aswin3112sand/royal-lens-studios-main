import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PackageCardProps {
  name: string;
  price: number;
  tier: string;
  deliverables: string[];
  isPopular?: boolean;
  index: number;
}

const PackageCard = ({ name, price, tier, deliverables, isPopular, index }: PackageCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 }}
    className={`relative glass rounded-xl p-8 flex flex-col ${
      isPopular ? "border-gold/50 gold-glow" : "hover:border-gold/30"
    } transition-all duration-500`}
  >
    {isPopular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-background text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
        <Crown className="w-3 h-3" /> Most Popular
      </div>
    )}
    <div className="text-center mb-6">
      <span className="text-xs uppercase tracking-widest text-gold/70">{tier}</span>
      <h3 className="font-serif text-2xl font-bold mt-1">{name}</h3>
      <div className="mt-3">
        <span className="font-serif text-4xl font-bold text-gold">₹{price.toLocaleString()}</span>
      </div>
    </div>
    <ul className="space-y-3 flex-1 mb-6">
      {deliverables.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
    <Button asChild className={isPopular ? "bg-gold text-background hover:bg-gold-light font-semibold" : "border-gold/30 text-gold hover:bg-gold/10"} variant={isPopular ? "default" : "outline"}>
      <Link to="/booking">Book Now</Link>
    </Button>
  </motion.div>
);

export default PackageCard;
