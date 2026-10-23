"use client";

import type { ReactNode } from "react";

// Botón de vidrio que abre la ventana de contacto (ContactDialog escucha este evento).
export default function OpenContact({
  variant = "dark",
  className = "",
  children,
}: {
  variant?: "dark" | "magenta";
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-variant={variant}
      onClick={() => window.dispatchEvent(new Event("contact:open"))}
      className={`glass-btn ${className}`}
    >
      {children}
    </button>
  );
}
