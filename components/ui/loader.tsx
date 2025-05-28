"use client";

import { PawPrint } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center pb-14 animate-pulse text-[var(--accent)]">
      <PawPrint className="w-40 h-40 -rotate-45" />
      <p className="mt-2 text-2xl font-medium tracking-wide ">Chargement ...</p>
    </div>
  );
}
