/**
 * Composant AnimalPage
 * Affiche les détails d’un animal et les informations de son propriétaire.
 * Les données sont récupérées via GraphQL à partir de l’ID en URL.
 */

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { graphQLClient } from "@/lib/graphql/client";
import { GET_ANIMAL_WITH_OWNER } from "@/lib/graphql/queries/animals";

import Header from "../../../../components/ui/header";
import Loader from "../../../../components/ui/loader";
import AnimalCard from "./components/AnimalCard";
import Footer from "../../../../components/ui/footer";

type AnimalWithOwner = {
  id: number;
  name: string;
  species: string;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

type GetAnimalWithOwnerResponse = {
  findAnimalWithOwner: AnimalWithOwner;
};

export default function AnimalPage() {
  const params = useParams();
  const id = params.id;
  const [animal, setAnimal] = useState<AnimalWithOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchAnimal = async () => {
      try {
        setLoading(true);

        const data = await graphQLClient.request<GetAnimalWithOwnerResponse>(
          GET_ANIMAL_WITH_OWNER,
          {
            id: parseInt(id),
          }
        );
        setAnimal(data.findAnimalWithOwner);
      } catch (error: any) {
        console.error("Erreur lors du chargement de l'animal :", error);
        setError("Impossible de charger cet animal.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  return (
    <main className="px-4 min-h-screen max-w-[1100px] w-full flex flex-col justify-between mx-auto bg-[var(--background)] text-[var(--foreground)]">
      <Header partial={true} />

      {loading && <Loader />}

      {!loading && error && (
        <div className="text-[var(--danger)] text-center py-4 font-semibold">
          {error}
        </div>
      )}

      {!loading && animal && <AnimalCard animal={animal} />}

      <Footer />
    </main>
  );
}
