/**
 * Composant PersonCard
 * Affiche les informations d'une personne ainsi que ses animaux.
 * Chaque animal est cliquable et redirige vers sa page de détail.
 */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSpeciePhoto } from "@/lib/utils";

type Animal = {
  id: number;
  name: string;
  species: string;
};

type PersonCardProps = {
  person: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    animals: Animal[];
  };
  avatar: string;
};

export default function PersonCard({ person, avatar }: PersonCardProps) {
  const router = useRouter();
  return (
    <>
      <div className="w-76 sm:w-140 mx-auto bg-[var(--secondary)] text-[var(--primary)] p-4 rounded-lg shadow hover:shadow-lg transition">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-10 mb-4">
          <div className="flex items-center justify-center gap-4">
            <Image
              src={avatar}
              alt={`${person.firstName} ${person.lastName}`}
              width={140}
              height={140}
              className="rounded-full object-cover"
            />
          </div>
          <div className="self-center mb-2">
            <p className="text-2xl sm:text-3xl font-bold text-center mb-4">
              {person.firstName} {person.lastName}
            </p>
            <p className="text-sm mb-1">
              <span className="font-bold">Email :</span>{" "}
              <a
                href={`mailto:${person.email}`}
                className="hover:text-[var(--danger)]"
              >
                {person.email}
              </a>
            </p>
            <p className="text-sm">
              <span className="font-bold">Téléphone:</span> {person.phoneNumber}
            </p>
          </div>
        </div>

        <h2 className="font-bold my-3 sm:text-lg">
          Les bestioles de {person.firstName} :{" "}
        </h2>
        {person.animals.length === 0 ? (
          <p className="text-sm font-medium text-[var(--danger)]">
            {person.firstName} n'a aucun animal pour le moment.
          </p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {person.animals.map((animal) => (
              <li
                key={animal.id}
                className="flex flex-col items-center bg-[var(--background)] p-3 rounded-md"
              >
                <Image
                  src={getSpeciePhoto(animal.species)}
                  alt={animal.species}
                  width={60}
                  height={60}
                  className="mb-2 cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => {
                    router.push(`/animal/${animal.id}`);
                  }}
                />
                <span className="text-center font-bold">{animal.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
