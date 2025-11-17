import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animated?: boolean;
  delay?: number;
  hover?: boolean;
}

export default function AnimatedCard({
  children,
  animated = true,
  delay = 0,
  hover = true,
  className,
  style,
  ...props
}: AnimatedCardProps) {
  const baseClasses = "rounded-2xl border bg-white shadow-sm";
  const hoverClasses = hover ? "card-animated hover:shadow-md active:shadow-xs" : "";
  const animationClasses = animated
    ? "animate-scale-in"
    : "";

  return (
    <div
      className={cn(baseClasses, hoverClasses, animationClasses, className)}
      style={{
        ...style,
        animationDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
