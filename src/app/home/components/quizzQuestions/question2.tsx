"use client";

import { useState, useEffect } from "react";
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_MOST_COMMON_SPECIES } from "@/lib/graphql/queries/quizz";

type MostCommonSpecies = {
  species: string;
  count: number;
};

export default function MostCommonSpecies() {
  const [result, setResult] = useState<MostCommonSpecies[] | null>(null);
  const [translatedList, setTranslatedList] = useState<string[]>([]);
  const [loadingTranslations, setLoadingTranslations] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);

  // Requête vers l'API Nest pour obtenir les espèces les plus fréquentes
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

  // Traduction des espèces après la récupération
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
      } catch (err) {
        console.error("Erreur lors de la traduction :", err);
        setTranslatedList(result.map((item) => item.species));
      } finally {
        setLoadingTranslations(false);
      }
    };

    translateSpecies();
  }, [result]);

  // Clic sur "Afficher la réponse"
  const handleShowAnswer = () => {
    setShowAnswer(true);
    fetchMostCommonSpecies();
  };

  return (
    <div className="mb-4">
      <p className="font-semibold">
        Quelle espèce est <b>la mieux représentée</b> ?
      </p>

      {!showAnswer && (
        <button
          onClick={handleShowAnswer}
          className="cursor-pointer mt-1 px-4 py-2 rounded-md text-sm text-[var(--background)] hover:opacity-80 bg-[var(--highlight)]"
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
            <p>
              {result.length === 1 ? (
                <>
                  L'espèce la mieux représentée est{" "}
                  <b>
                    {loadingTranslations
                      ? result[0].species
                      : translatedList[0]}
                  </b>
                  , avec {result[0].count} individus.
                </>
              ) : (
                <>
                  Les espèces les mieux représentées sont{" "}
                  <b>
                    {loadingTranslations
                      ? result.map((item) => item.species).join(", ")
                      : translatedList.join(", ")}
                  </b>
                  , avec {result[0].count} individus chacune.
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
