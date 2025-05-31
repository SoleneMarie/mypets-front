/**
 * Composant Button
 * Affiche un bouton stylisé avec deux variantes : "header" ou "large".
 * Peut contenir une icône et indiquer s'il est sélectionné.
 */

import { cn } from "@/lib/utils";

type ButtonProps = {
  type?: "header" | "large";
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
};

export default function Button({
  type = "header",
  text,
  icon,
  onClick,
  selected,
  className,
}: ButtonProps) {
  const isHeader = type === "header";
  const baseStyle =
    "flex justify-center py-2 align-center cursor-pointer font-semibold inline-flex items-center gap-2 rounded-xl font-medium transition duration-300 ease-in-out hover:scale-105";

  const variantStyles = {
    header:
      "text-sm bg-[var(--secondary)] text-[var(--foreground)] w-11 sm:w-30 h-10",
    large: "px-3 text-[15px] bg-[var(--foreground)] text-[var(--accent)]",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        baseStyle,
        variantStyles[type],
        isHeader && selected && "border-2 border-[var(--primary)]",
        className
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}

      <span
        className={cn(isHeader ? "hidden sm:inline" : "", "whitespace-nowrap")}
      >
        {text}
      </span>
    </button>
  );
}
