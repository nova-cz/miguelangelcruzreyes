import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & { variant?: "dark" | "magenta" };

export default function GlassButton({ variant = "dark", className = "", children, ...rest }: Props) {
  return (
    <a data-variant={variant} className={`glass-btn ${className}`} {...rest}>
      {children}
    </a>
  );
}
