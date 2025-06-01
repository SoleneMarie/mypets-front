/**
 * Composant `MostCommonSpeciesQuestion`
 *
 * Affiche une question sur l’espèce animale la plus représentée dans la base.
 * Utilise la requête GraphQL `FIND_MOST_COMMON_SPECIES` pour récupérer les données.
 * Les noms des espèces sont traduits via une API de traduction utilisant mymemory.
 */

"use client";

import { useState, useEffect } from "react";
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_MOST_COMMON_SPECIES } from "@/lib/graphql/queries/quizz";

type MostCommonSpecies = {
  species: string;
  count: number;
};

export default function MostCommonSpeciesQuestion() {
  const [result, setResult] = useState<MostCommonSpecies[] | null>(null);
  const [translatedList, setTranslatedList] = useState<string[]>([]);
  const [loadingTranslations, setLoadingTranslations] = useState(false);
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

  useEffect(() => {
    if (!result || result.length === 0) return;

    const translateSpecies = async () => {
      setLoadingTranslations(true);
      try {
        const responses = await Promise.all(
          result.map((item) =>
            fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: item.species }),
            }).then((res) => res.json())
          )
        );

        const translated = responses.map(
          (res, index) => res?.translated || result[index].species
        );

        setTranslatedList(translated);
        setShowAnswer(true);
      } catch (err) {
        console.error("Erreur lors de la traduction :", err);
        setTranslatedList(result.map((item) => item.species));
        setShowAnswer(true);
      } finally {
        setLoadingTranslations(false);
      }
    };

    translateSpecies();
  }, [result]);

  const handleShowAnswer = () => {
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
                  <b>
                    {loadingTranslations
                      ? result[0].species
                      : translatedList[0]}
                  </b>
                  , avec <b>{result[0].count}</b> individus.
                </>
              ) : (
                <>
                  Les espèces les mieux représentées sont{" "}
                  <b>
                    {loadingTranslations
                      ? result.map((item) => item.species).join(", ")
                      : translatedList.join(", ")}
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
