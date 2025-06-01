/**
 * Composant `OldestAnimalQuestion`
 *
 * Affiche une question sur l'animal le plus vieux, avec un bouton pour révéler la réponse.
 * Utilise une requête GraphQL (`FIND_OLDEST_ANIMALS`) pour récupérer l'information côté client.
 * Les noms des animaux sont cliquables et mènent à leur page dédiée.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_OLDEST_ANIMALS } from "@/lib/graphql/queries/quizz";

type Animal = {
  id: number;
  name: string;
};

export default function OldestAnimalQuestion() {
  const [result, setResult] = useState<Animal[] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);
  const fetchOldestAnimals = async () => {
    setError(false);

    try {
      const data = await graphQLClient.request<{ findOldestAnimals: Animal[] }>(
        FIND_OLDEST_ANIMALS
      );
      setResult(data.findOldestAnimals);
    } catch (err) {
      console.error("Erreur lors de la récupération des données", err);
      setError(true);
    }
  };

  const handleClick = () => {
    setShowAnswer(true);
    fetchOldestAnimals();
  };

  const formatNames = (animals: Animal[]) => {
    return animals.map((a, index) => (
      <span key={a.id}>
        {index > 0 && ", "}
        <Link
          href={`/animal/${a.id}`}
          className="cursor-pointer font-bold hover:opacity-70 transition-colors"
        >
          {a.name}
        </Link>
      </span>
    ));
  };

  return (
    <div className="mb-4 text-sm sm:text-base border-b pb-4 border-[var(--accent)]">
      <p className="font-semibold">
        Quel animal est <b>le plus vieux</b> ?
      </p>
      {!showAnswer && (
        <button
          onClick={handleClick}
          className="cursor-pointer mt-2 px-4 py-2 rounded-md text-sm text-[var(--background)] hover:opacity-80 bg-[var(--highlight)]"
        >
          Afficher la réponse
        </button>
      )}

      {showAnswer && (
        <div className="text-[var(--answer)] font-medium">
          {error && (
            <p className="py-2 text-[var(--danger)] text-sm">
              Une erreur est survenue.
            </p>
          )}

          {!error && result && result.length === 0 && (
            <p className="py-2">Aucun animal trouvé.</p>
          )}

          {!error && result && result.length === 1 && (
            <p className="py-2">
              L’animal le plus vieux est {formatNames(result)}.
            </p>
          )}

          {!error && result && result.length > 1 && (
            <p className="py-2">
              Les animaux les plus vieux sont {formatNames(result)}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
