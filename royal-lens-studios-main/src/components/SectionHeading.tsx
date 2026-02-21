import { motion } from "framer-motion";
import { Crown } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gold?: boolean;
  crown?: boolean;
}

const SectionHeading = ({ title, subtitle, gold = true, crown = false }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12 md:mb-16"
  >
    {crown && <Crown className="w-8 h-8 text-gold mx-auto mb-3" />}
    <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
      {gold ? <span className="text-gold">{title}</span> : title}
    </h2>
    {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
    <div className="mt-4 mx-auto w-20 h-0.5 bg-gold/50 rounded-full" />
  </motion.div>
);

export default SectionHeading;
