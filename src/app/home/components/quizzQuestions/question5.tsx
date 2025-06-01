/**
 * Composant `HeaviestAnimalQuestion`
 *
 * Affiche une question sur l’animal le plus lourd et son propriétaire.
 * Utilise `FIND_HEAVIEST_ANIMAL` via GraphQL.
 * Les noms des animaux et des propriétaires sont cliquables.
 * Formatage du poids via `formatWeight`.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_HEAVIEST_ANIMAL } from "@/lib/graphql/queries/quizz";
import { formatWeight, getRandomAvatar } from "@/lib/utils";

type HeaviestAnimal = {
  animalId: number;
  name: string;
  species: string;
  weight: number;
  ownerFullName: string;
  ownerId: number;
};

export default function HeaviestAnimalQuestion() {
  const [result, setResult] = useState<HeaviestAnimal[] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);

  const fetchHeaviestAnimal = async () => {
    setError(false);
    try {
      const data = await graphQLClient.request<{
        findHeaviestAnimal: HeaviestAnimal[];
      }>(FIND_HEAVIEST_ANIMAL);
      setResult(data.findHeaviestAnimal);
    } catch (err) {
      console.error("Erreur lors de la récupération des données", err);
      setError(true);
    }
  };

  const handleClick = () => {
    setShowAnswer(true);
    fetchHeaviestAnimal();
  };

  const formatAnswer = (animals: HeaviestAnimal[]) => {
    return animals.map((a, index) => {
      const avatar = encodeURIComponent(getRandomAvatar());
      return (
        <span key={a.animalId}>
          {index > 0 && " et "}
          <Link
            href={`/person/${a.ownerId}?avatar=${avatar}`}
            className="font-bold hover:opacity-70 transition-colors"
          >
            {a.ownerFullName}
          </Link>{" "}
          possède{" "}
          <Link
            href={`/animal/${a.animalId}`}
            className="font-bold hover:opacity-70 transition-colors"
          >
            {a.name}
          </Link>{" "}
          (<b>{formatWeight(a.weight)}</b>)
        </span>
      );
    });
  };

  return (
    <div className="mb-4 text-sm sm:text-base border-b pb-4 border-[var(--accent)]">
      <p className="font-semibold">
        Qui possède <b>l'animal le plus lourd</b> ? Comment s'appelle cet animal
        et quel est son poids ?
      </p>

      {!showAnswer && (
        <button
          onClick={handleClick}
          className="cursor-pointer mt-2  px-4 py-2 rounded-md text-sm text-[var(--background)] hover:opacity-80 bg-[var(--highlight)]"
        >
          Afficher la réponse
        </button>
      )}

      {showAnswer && (
        <>
          {error && (
            <p className="py-2 text-[var(--danger)] text-sm">
              Une erreur est survenue.
            </p>
          )}

          {!error && result && result.length === 0 && (
            <p className="py-2">Aucun animal trouvé.</p>
          )}

          {!error && result && result.length > 0 && (
            <p className="py-2 text-[var(--answer)] font-medium">
              {formatAnswer(result)}.
            </p>
          )}
        </>
      )}
    </div>
  );
}
