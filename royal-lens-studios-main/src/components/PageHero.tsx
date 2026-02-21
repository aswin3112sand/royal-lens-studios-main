import { motion } from "framer-motion";
import LazyVideo from "@/components/LazyVideo";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
}

const PageHero = ({ title, subtitle, image, video }: PageHeroProps) => (
  <section className="relative h-[42svh] md:h-[50vh] pt-16 md:pt-20 flex items-center justify-center overflow-hidden">
    {video ? (
      <LazyVideo
        src={video}
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.svg"
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      <img src={image} alt="" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
    )}
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-10 text-center px-4"
    >
      <h1 className="font-serif text-4xl md:text-6xl font-bold mb-3">
        <span className="text-gold">{title}</span>
      </h1>
      {subtitle && <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">{subtitle}</p>}
      <div className="mt-4 mx-auto w-20 h-0.5 bg-gold/50 rounded-full" />
    </motion.div>
  </section>
);

export default PageHero;
