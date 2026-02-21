import { motion } from "framer-motion";
import { Calendar, Camera, Award, Users } from "lucide-react";

const stats = [
  { icon: Calendar, value: "12+", label: "Years Experience" },
  { icon: Camera, value: "10K+", label: "Sessions" },
  { icon: Award, value: "25+", label: "Awards Won" },
  { icon: Users, value: "5K+", label: "Happy Clients" },
];

const StatsRow = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat, i) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="glass rounded-lg p-6 text-center hover:border-gold/30 transition-colors"
      >
        <stat.icon className="w-7 h-7 text-gold mx-auto mb-2" />
        <div className="font-serif text-3xl font-bold text-gold">{stat.value}</div>
        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</div>
      </motion.div>
    ))}
  </div>
);

export default StatsRow;
