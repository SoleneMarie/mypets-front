/**
 * Composant NotFound
 * Page 404
 */

"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center text-[var(--foreground)]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        404 - Page introuvable
      </h1>
      <Image
        src="/images/lost.jpg"
        alt="not found"
        width={200}
        height={200}
        className="rounded-full object-cover cursor-pointer"
      />
      <p className="mb-6 text-sm sm:text-base font-medium">
        Désolé, cette page n’existe pas ou n’est plus disponible...
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-[var(--highlight)] text-[var(--background)] rounded-md hover:opacity-80 transition text-sm sm:text-base"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
