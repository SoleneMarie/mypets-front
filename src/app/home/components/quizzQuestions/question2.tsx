/**
 * Composant `MostCommonSpeciesQuestion`
 *
 * Affiche une question sur l’espèce animale la plus représentée dans la base.
 * Utilise la requête GraphQL `FIND_MOST_COMMON_SPECIES` pour récupérer les données.
 */

"use client";

import { useState } from "react";
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_MOST_COMMON_SPECIES } from "@/lib/graphql/queries/quizz";

type MostCommonSpecies = {
  species: string;
  specieTranslated: string;
  count: number;
};

export default function MostCommonSpeciesQuestion() {
  const [result, setResult] = useState<MostCommonSpecies[] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);

  const fetchMostCommonSpecies = async () => {
    setError(false);
    try {
      const data = await graphQLClient.request<{
        findMostCommonSpecies: MostCommonSpecies[];
      }>(FIND_MOST_COMMON_SPECIES);
      setResult(data.findMostCommonSpecies);
    } catch (err) {
      console.error("Erreur lors de la récupération des espèces :", err);
      setError(true);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    fetchMostCommonSpecies();
  };

  return (
    <div className="mb-4 text-sm sm:text-base border-b pb-4 border-[var(--accent)]">
      <p className="font-semibold">
        Quelle espèce est <b>la mieux représentée</b> ?
      </p>

      {!showAnswer && (
        <button
          onClick={handleShowAnswer}
          className="cursor-pointer mt-2  px-4 py-2 rounded-md text-sm text-[var(--background)] hover:opacity-80 bg-[var(--highlight)]"
        >
          Afficher la réponse
        </button>
      )}

      {showAnswer && (
        <div className="py-2">
          {error && (
            <p className="text-[var(--danger)] text-sm">
              Une erreur est survenue.
            </p>
          )}

          {!error && result && result.length > 0 && (
            <p className="text-[var(--answer)] font-medium">
              {result.length === 1 ? (
                <>
                  L'espèce la mieux représentée est{" "}
                  <b>{result[0].specieTranslated}</b>, avec{" "}
                  <b>{result[0].count}</b> individus.
                </>
              ) : (
                <>
                  Les espèces les mieux représentées sont{" "}
                  <b>
                    {result.map((item) => item.specieTranslated).join(", ")}
                  </b>
                  , avec <b>{result[0].count}</b> individus chacune.
                </>
              )}
            </p>
          )}

          {!error && result && result.length === 0 && (
            <p>Aucune espèce trouvée.</p>
          )}
        </div>
      )}
    </div>
  );
}
