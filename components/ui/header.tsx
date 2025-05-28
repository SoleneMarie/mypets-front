"use client";

import { useRouter } from "next/navigation";
import Button from "./button";
import MainLogo from "./mainLogo";
import { User, Rabbit, HelpCircle, ArrowLeft } from "lucide-react";

type HeaderProps = {
  selectedView: "persons" | "animals" | "quizz";
  setSelectedView: (view: "persons" | "animals" | "quizz") => void;
  partial?: boolean;
};

export default function Header({
  selectedView,
  setSelectedView,
  partial,
}: HeaderProps) {
  const router = useRouter();

  return (
    <section className="sticky top-0 z-50 w-full bg-[var(--background)] flex justify-between items-end border-b pb-4 pt-4 border-gray-200">
      <MainLogo />
      {partial && (
        <div className="flex justify-end items-center">
          <Button
            type="header"
            text="Retour"
            icon={<ArrowLeft className="w-5 h-5" strokeWidth={3} />}
            onClick={() => router.push("/home")}
          />
        </div>
      )}
      {!partial && (
        <div className="flex justify-between max-w-100 gap-3">
          <Button
            type="header"
            text="Maîtres"
            icon={<User className="w-5 h-5" strokeWidth={3} />}
            onClick={() => setSelectedView("persons")}
            selected={selectedView === "persons"}
          />
          <Button
            type="header"
            text="Animaux"
            icon={<Rabbit className="w-5 h-5" strokeWidth={3} />}
            onClick={() => setSelectedView("animals")}
            selected={selectedView === "animals"}
          />
          <Button
            type="header"
            text="Quizz"
            icon={<HelpCircle className="w-5 h-5" strokeWidth={3} />}
            onClick={() => setSelectedView("quizz")}
            selected={selectedView === "quizz"}
          />
        </div>
      )}
    </section>
  );
}
