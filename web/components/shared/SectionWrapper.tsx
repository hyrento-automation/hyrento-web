import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  theme?: "light" | "soft" | "navy";
  noPadding?: boolean;
  children: ReactNode;
}

export function SectionWrapper({
  id,
  className,
  theme = "light",
  noPadding = false,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        theme === "light" && "section-light",
        theme === "soft" && "section-soft",
        theme === "navy" && "section-navy text-white",
        !noPadding && "section-padded",
        className
      )}
    >
      <div className="content-container">
        {children}
      </div>
    </section>
  );
}
