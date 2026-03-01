import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SiteContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

const SiteContainer = ({ children, className, narrow = false }: SiteContainerProps) => (
  <div className={cn("container mx-auto", narrow && "max-w-[760px]", className)}>
    {children}
  </div>
);

export default SiteContainer;
