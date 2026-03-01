import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeSlideUp } from "@/lib/motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  highlight?: boolean;
  crown?: boolean;
  className?: string;
}

const SectionHeading = ({ title, subtitle, highlight = true, crown = false, className }: SectionHeadingProps) => (
  <motion.header
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
    variants={fadeSlideUp}
    className={cn("mx-auto mb-8 max-w-3xl text-center md:mb-12", className)}
  >
    {crown && <Crown className="mx-auto mb-3 h-7 w-7 text-primary" />}
    <h2 className="text-3xl font-extrabold md:text-5xl">
      {highlight ? <span className="neon-gradient-text">{title}</span> : title}
    </h2>
    {subtitle && <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/78 md:text-base">{subtitle}</p>}
  </motion.header>
);

export default SectionHeading;
