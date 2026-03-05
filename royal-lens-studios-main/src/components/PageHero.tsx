import { motion } from "framer-motion";
import LazyVideo from "@/components/LazyVideo";
import { fadeSlideUp } from "@/lib/motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
}

const heroMinHeight = "min-h-[46svh] md:min-h-[54svh]";

const buildUnsplashUrl = (source: string, width: number) => `${source.split("?")[0]}?w=${width}&q=80&auto=format&fit=crop`;

const PageHero = ({ title, subtitle, image, video }: PageHeroProps) => (
  <section className={`relative overflow-hidden pt-[var(--nav-h-mobile)] md:pt-[var(--nav-h-desktop)] ${heroMinHeight}`}>
    {video ? (
      <LazyVideo
        src={video}
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.svg"
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : (
      <img
        src={image && image.includes("images.unsplash.com") ? buildUnsplashUrl(image, 1600) : image}
        srcSet={
          image && image.includes("images.unsplash.com")
            ? `${buildUnsplashUrl(image, 640)} 640w, ${buildUnsplashUrl(image, 1024)} 1024w, ${buildUnsplashUrl(image, 1600)} 1600w`
            : undefined
        }
        sizes="100vw"
        alt=""
        loading="eager"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
    )}

    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.52),rgba(20,20,20,0.88))]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(218,165,32,0.2),transparent_44%)]" />

    <div className={`relative z-10 flex items-center justify-center px-4 text-center ${heroMinHeight}`}>
      <motion.div initial="hidden" animate="visible" variants={fadeSlideUp}>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          <span className="neon-gradient-text">{title}</span>
        </h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/82 md:text-lg">{subtitle}</p>}
        <div className="mx-auto mt-5 h-0.5 w-24 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
      </motion.div>
    </div>
  </section>
);

export default PageHero;
