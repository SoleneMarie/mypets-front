/**
 * Composant `MostAnimalsOwnerQuestion`
 *
 * Affiche une question sur le ou les propriétaires possédant le plus d’animaux.
 * Utilise `FIND_TOP_OWNERS` pour récupérer les résultats via GraphQL.
 * Les noms sont cliquables et mènent vers la fiche du propriétaire avec un avatar aléatoire en query param.
 */

"use client";

import { useState } from "react";
import Link from "next/link"; //
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_TOP_OWNERS } from "@/lib/graphql/queries/quizz";
import { getRandomAvatar } from "@/lib/utils";

type TopOwner = {
  ownerId: number;
  fullName: string;
  count: number;
};

export default function MostAnimalsOwnerQuestion() {
  const [result, setResult] = useState<TopOwner[] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);

  // Requête vers l'API Nest pour obtenir les espèces les plus fréquentes
  const fetchTopOwner = async () => {
    setError(false);
    try {
      const data = await graphQLClient.request<{ findTopOwners: TopOwner[] }>(
        FIND_TOP_OWNERS
      );
      setResult(data.findTopOwners);
    } catch (err) {
      console.error("Erreur lors de la récupération des espèces :", err);
      setError(true);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    fetchTopOwner();
  };

  // Générer un avatar pour chaque personne dès qu'on a les résultats
  const getLinkWithAvatar = (owner: TopOwner) => {
    const avatar = getRandomAvatar();
    return `/person/${owner.ownerId}?avatar=${avatar}`;
  };

  const formatNames = (owners: TopOwner[]) => {
    return owners.map((owner, index) => (
      <span key={owner.ownerId}>
        {index > 0 && ", "}
        <Link
          href={getLinkWithAvatar(owner)}
          className="font-bold hover:opacity-70 transition-colors"
        >
          {owner.fullName}
        </Link>
      </span>
    ));
  };

  return (
    <div className="mb-4 text-sm sm:text-base border-b pb-4 border-[var(--accent)]">
      <p className="font-semibold">
        Qui possède <b>le plus d’animaux</b> ?
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
              Aucun propriétaire trouvé.
            </p>
          )}

          {!error && result && result.length === 1 && (
            <p className="py-2 text-[var(--answer)] font-medium">
              C’est{" "}
              <Link
                href={getLinkWithAvatar(result[0])}
                className="cursor-pointer font-bold hover:opacity-70 transition-colors"
              >
                {result[0].fullName}
              </Link>
              , avec <b>{result[0].count} animaux</b>.
            </p>
          )}

          {!error && result && result.length > 1 && (
            <p className="py-2 text-[var(--answer)] font-medium">
              Ce sont <b>{formatNames(result)}</b>, avec chacun{" "}
              <b>{result[0].count} animaux</b>.
            </p>
          )}
        </>
      )}
    </div>
  );
}
