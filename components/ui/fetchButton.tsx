/**
 * Composant FetchButton
 * Bouton stylisé en forme de patte avec le texte "Fetch!".
 * Sert à naviguer vers /home.
 */

import { PawPrint } from "lucide-react";

export default function FetchButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer relative hover:scale-105 transition-transform duration-200"
    >
      <PawPrint
        className="w-50 h-50 sm:w-60 sm:h-60 text-[var(--primary)] -rotate-45"
        strokeWidth={1}
      />

      <span className="logo absolute text-[27px] text-[var(--primary)] bottom-10 sm:bottom-12 left-15 sm:left-19 sm:text-[32px]">
        Fetch!
      </span>
    </button>
  );
}
