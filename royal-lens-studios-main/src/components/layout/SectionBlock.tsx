import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "base" | "alt" | "hero";

interface SectionBlockProps {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: SectionTone;
  compact?: boolean;
}

const toneClassMap: Record<SectionTone, string> = {
  base: "surface-base",
  alt: "surface-alt",
  hero: "surface-hero",
};

const SectionBlock = ({ children, className, id, tone = "base", compact = false }: SectionBlockProps) => (
  <section
    id={id}
    className={cn(
      "relative",
      toneClassMap[tone],
      compact ? "section-space-compact" : "section-space",
      className,
    )}
  >
    {children}
  </section>
);

export default SectionBlock;
