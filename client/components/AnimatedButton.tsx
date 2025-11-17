import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const baseClasses =
    "btn-interactive btn-ripple relative overflow-hidden transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-xl";

  const variantClasses = {
    primary: "bg-primary text-primary-foreground shadow hover:shadow-md active:shadow-sm",
    secondary: "bg-muted text-foreground hover:bg-gray-200 active:bg-gray-300",
    ghost: "hover:bg-secondary active:bg-muted",
  }[variant];

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg h-12 w-full",
  }[size];

  return (
    <button
      className={cn(baseClasses, variantClasses, sizeClasses, className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
