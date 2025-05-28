"use client";
import { useRouter } from "next/navigation";

import Button from "../../components/ui/button";
import { PawPrint, UserPlus } from "lucide-react";
import MainLogo from "../../components/ui/mainLogo";
import FetchButton from "../../components/ui/fetchButton";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <MainLogo />
      <Button
        type="large"
        text="Retour à l'accueil"
        icon={<PawPrint />}
        onClick={() => console.log("Clique sur adopter")}
      />
      <Button
        type="header"
        text="Animaux"
        icon={<UserPlus className="w-5 h-5" />}
        onClick={() => console.log("Clique sur créer un compte")}
        selected={true}
      />
      <p className="text-[var(--highlight)]">Un texte doux</p>
      <p className="text-[var(--foreground)]">Un texte foncé</p>
      <p className="text-[var(--danger)]">Un avertissement</p>
      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="logo text-7xl text-[var(--danger)] mb-8">My Pets</h1>
        <FetchButton onClick={() => router.push("/home")} />
      </div>
    </div>
  );
}
