/**
 * Composant `TopCatOwnersQuestion`
 *
 * Affiche une question ciblée sur les propriétaires de chats.
 * Requête GraphQL avec paramètre (`species: "Cat"`) via `FIND_TOP_OWNERS_BY_SPECIES`.
 * Liens vers les fiches des personnes, avec avatar généré dynamiquement.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { graphQLClient } from "@/lib/graphql/client";
import { FIND_TOP_OWNERS_BY_SPECIES } from "@/lib/graphql/queries/quizz";
import { getRandomAvatar } from "@/lib/utils";

type TopOwner = {
  ownerId: number;
  fullName: string;
  count: number;
};

export default function TopCatOwnersQuestion() {
  const [result, setResult] = useState<TopOwner[] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);

  const fetchTopCatOwners = async () => {
    setError(false);

    try {
      const data = await graphQLClient.request<{
        findTopOwnersBySpecies: TopOwner[];
      }>(FIND_TOP_OWNERS_BY_SPECIES, { species: "Cat" });
      setResult(data.findTopOwnersBySpecies);
    } catch (err) {
      console.error("Erreur lors de la récupération des propriétaires", err);
      setError(true);
    }
  };

  const handleClick = () => {
    setShowAnswer(true);
    fetchTopCatOwners();
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
        Qui possède <b>le plus de chats</b> ?
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
            <p className="py-2 text-[var(--answer)] font-medium">
              Aucun propriétaire de chats trouvé.
            </p>
          )}

          {!error && result && result.length === 1 && (
            <p className="py-2 text-[var(--answer)] font-medium">
              C’est{" "}
              <Link
                href={getLinkWithAvatar(result[0])}
                className="font-bold hover:opacity-70 transition-colors"
              >
                {result[0].fullName}
              </Link>
              , avec <b>{result[0].count} chats</b>.
            </p>
          )}

          {!error && result && result.length > 1 && (
            <p className="py-2 text-[var(--answer)] font-medium">
              C’est {formatNames(result)} qui ont chacun{" "}
              <b>{result[0].count} chats</b> .
            </p>
          )}
        </>
      )}
    </div>
  );
}
