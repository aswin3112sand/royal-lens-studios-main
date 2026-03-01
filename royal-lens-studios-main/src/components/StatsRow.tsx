import { motion } from "framer-motion";
import { Award, Calendar, Camera, Users } from "lucide-react";
import { fadeSlideUp, staggerContainer } from "@/lib/motion";

const stats = [
  { icon: Calendar, value: "12+", label: "Years Experience" },
  { icon: Camera, value: "10K+", label: "Sessions" },
  { icon: Award, value: "25+", label: "Awards Won" },
  { icon: Users, value: "5K+", label: "Happy Clients" },
];

const StatsRow = () => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
    variants={staggerContainer}
    className="grid grid-cols-2 gap-4 lg:grid-cols-4"
  >
    {stats.map((stat) => (
      <motion.article key={stat.label} variants={fadeSlideUp} className="neon-card rounded-xl p-4 text-center md:p-6">
        <stat.icon className="mx-auto mb-2 h-6 w-6 text-secondary" />
        <p className="text-2xl font-extrabold text-primary md:text-3xl">{stat.value}</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-foreground/70">{stat.label}</p>
      </motion.article>
    ))}
  </motion.div>
);

export default StatsRow;
