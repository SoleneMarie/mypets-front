/**
 * Composant MainLogo
 * Affiche le logo principal de l'application "My Pets" avec une icône de patte
 * Lien vers la page d'accueil
 */

import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function MainLogo() {
  return (
    <Link href="/" className="flex items-center gap-3  cursor-pointer">
      <PawPrint
        className="w-10 h-10 sm:w-14 sm:h-14 text-[var(--danger)] -rotate-45"
        strokeWidth={2.5}
      />
      <p className="logo text-2xl sm:text-4xl text-[var(--danger)] mt-2">
        My Pets
      </p>
    </Link>
  );
}
