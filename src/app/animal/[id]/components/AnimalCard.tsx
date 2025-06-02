/**
 * Composant AnimalCard
 * Affiche les détails d'un animal avec sa photo, ses caractéristiques traduites,
 * et une section sur son propriétaire (avec un avatar aléatoire).
 */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSpeciePhoto } from "@/lib/utils";
import { formatWeight } from "@/lib/utils";
import { calculateAge } from "@/lib/utils";
import { getRandomAvatar } from "@/lib/utils";

type Person = {
  id: number;
  firstName: string;
  lastName: string;
};

type AnimalCardProps = {
  animal: {
    id: number;
    name: string;
    dateOfBirth: string;
    species: string;
    specieTranslated: string;
    breed: string;
    breedTranslated: string;
    color: string;
    colorTranslated: string;
    weight: number;
    owner: Person;
  };
};

export default function AnimalCard({ animal }: AnimalCardProps) {
  const router = useRouter();
  const ownerAvatar = getRandomAvatar();

  return (
    <div className="w-76 sm:w-140 mx-auto bg-[var(--secondary)] text-[var(--primary)] p-4 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-10 mb-2">
        <div className="flex items-center justify-center gap-4">
          <Image
            src={getSpeciePhoto(animal.species)}
            alt={animal.species}
            width={120}
            height={120}
            className="mb-2 sm:mt-4 cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="self-center mb-2">
          <p className="text-2xl sm:text-3xl font-bold text-center mb-4">
            {animal.name}
          </p>
          <p className="text-sm mb-1">
            <span className="font-bold">Espèce :</span>{" "}
            {animal.specieTranslated}
          </p>
          {animal.breed && (
            <p className="text-sm mb-1">
              <span className="font-bold">Race :</span> {animal.breedTranslated}
            </p>
          )}
          <p className="text-sm mb-1">
            <span className="font-bold">Poids:</span>{" "}
            {formatWeight(animal.weight)}
          </p>
          <p className="text-sm mb-1">
            <span className="font-bold">Âge:</span>{" "}
            {calculateAge(animal.dateOfBirth)}
          </p>
          <p className="text-sm mb-1">
            <span className="font-bold">Couleur:</span> {animal.colorTranslated}
          </p>
        </div>
      </div>
      <div className="sm:flex items-center gap-4">
        <h2 className="font-bold my-3 sm:text-lg text-center sm:text-start">
          Propriétaire de {animal.name} :
        </h2>
        <div className="flex items-center gap-2 justify-center">
          <Image
            src={ownerAvatar}
            alt={animal.owner.firstName}
            width={60}
            height={60}
            className="mb-2 cursor-pointer transition-transform duration-300 hover:scale-105 rounded-full"
            onClick={() => {
              router.push(`/person/${animal.owner.id}?avatar=${ownerAvatar}`);
            }}
          />
          <p className="font-semibold">
            {animal.owner.firstName} {animal.owner.lastName}
          </p>
        </div>
      </div>
    </div>
  );
}
