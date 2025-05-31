"use client";

import { useState } from "react";
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
    return animals.map((a) => a.name).join(", ");
  };

  return (
    <div className="mb-4">
      <p className="font-semibold">
        Quel animal est <b>le plus vieux</b> ?
      </p>
      {!showAnswer && (
        <button
          onClick={handleClick}
          className="cursor-pointer mt-1 px-4 py-2 rounded-md text-sm text-[var(--background)] hover:opacity-80 bg-[var(--highlight)]"
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

          {!error && result && result.length === 1 && (
            <p className="py-2">
              L’animal le plus vieux est <b>{result[0].name}</b>.
            </p>
          )}

          {!error && result && result.length > 1 && (
            <p className="py-2">
              Les animaux les plus vieux sont {formatNames(result)}.
            </p>
          )}
        </>
      )}
    </div>
  );
}
