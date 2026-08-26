import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent-strong to-fuchsia text-background font-semibold shadow-[0_0_28px_-6px_var(--glow)] hover:shadow-[0_0_40px_-4px_var(--glow)] hover:brightness-110",
  secondary:
    "bg-surface-2 text-foreground border border-border hover:border-border-strong hover:bg-surface",
  ghost: "text-foreground hover:bg-surface-2",
  outline:
    "border border-border-strong text-foreground hover:border-accent hover:text-accent-bright",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-2",
  md: "h-11 px-6 text-sm gap-2.5",
  lg: "h-13 px-8 text-base gap-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ring-focus",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { variant?: Variant; size?: Size }) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 select-none active:scale-[0.97] ring-focus",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
