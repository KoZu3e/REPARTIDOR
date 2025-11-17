import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "right" | "left" | "up" | "down";
}

export default function PageTransition({
  children,
  direction = "right",
}: PageTransitionProps) {
  const animationClass = {
    right: "animate-slide-in-right",
    left: "animate-slide-out-left",
    up: "animate-slide-in-up",
    down: "animate-slide-out-down",
  }[direction];

  return <div className={`${animationClass}`}>{children}</div>;
}
