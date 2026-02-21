import { motion } from "framer-motion";
import { MessageSquare, Camera, Image, Package } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Enquiry", desc: "Share your vision & we'll plan together" },
  { icon: Camera, title: "Shoot Day", desc: "Relax while we capture the magic" },
  { icon: Image, title: "Shortlist", desc: "Same-day preview of your best shots" },
  { icon: Package, title: "Delivery", desc: "Edited gallery within 7 working days" },
];

const ProcessTimeline = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
    {/* Connecting line (desktop only) */}
    <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    
    {steps.map((step, i) => (
      <motion.div
        key={step.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.15 }}
        className="text-center relative"
      >
        <div className="w-20 h-20 rounded-full glass border-gold/30 border flex items-center justify-center mx-auto mb-4 relative z-10">
          <step.icon className="w-8 h-8 text-gold" />
          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center font-serif">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <h4 className="font-serif text-lg font-bold mb-1">{step.title}</h4>
        <p className="text-muted-foreground text-sm">{step.desc}</p>
      </motion.div>
    ))}
  </div>
);

export default ProcessTimeline;
