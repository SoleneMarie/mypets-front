/**
 * Composant `HeaviestGroupQuestion`
 *
 * Affiche une question sur le propriétaire possédant le groupe d’animaux le plus lourd.
 * Utilise `FIND_HEAVIEST_GROUPS` pour récupérer les données.
 * Le nom du propriétaire est cliquable, et le poids total est mis en valeur.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_HEAVIEST_GROUPS } from "@/lib/graphql/queries/quizz";
import { formatWeight, getRandomAvatar } from "@/lib/utils";

type HeaviestGroup = {
  ownerId: number;
  fullName: string;
  totalWeight: number;
};

export default function HeaviestGroupQuestion() {
  const [result, setResult] = useState<HeaviestGroup[] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);

  const fetchHeaviestGroups = async () => {
    setError(false);
    try {
      const data = await graphQLClient.request<{
        findHeaviestGroups: HeaviestGroup[];
      }>(FIND_HEAVIEST_GROUPS);
      setResult(data.findHeaviestGroups);
    } catch (err) {
      console.error("Erreur lors de la récupération des groupes :", err);
      setError(true);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    fetchHeaviestGroups();
  };

  const formatAnswer = (groups: HeaviestGroup[]) => {
    return groups.map((g, index) => {
      const avatar = encodeURIComponent(getRandomAvatar());
      return (
        <span key={g.ownerId}>
          {index > 0 && " et "}
          <Link
            href={`/person/${g.ownerId}?avatar=${avatar}`}
            className="font-bold hover:opacity-70 transition-colors"
          >
            {g.fullName}
          </Link>{" "}
          avec un total de <b>{formatWeight(g.totalWeight)}</b>
        </span>
      );
    });
  };

  return (
    <div className="mb-4 text-sm sm:text-base">
      <p className="font-semibold">
        Qui possède <b>le groupe d&rsquo;animaux le plus lourd</b> ? Quel est le
        poids total de ce groupe ?
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
        <>
          {error && (
            <p className="py-2 text-[var(--danger)] text-sm">
              Une erreur est survenue.
            </p>
          )}

          {!error && result && result.length === 0 && (
            <p className="py-2 text-[var(--answer)] font-medium">
              Aucune donnée trouvée.
            </p>
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
