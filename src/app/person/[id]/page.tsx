/**
 * Page PersonPage
 * Affiche les informations détaillées d'une personne (et ses animaux).
 * Récupère l'ID depuis l'URL et un avatar depuis les paramètres de recherche.
 */

"use client";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_PERSON_WITH_ANIMALS } from "@/lib/graphql/queries/persons";
import { graphQLClient } from "@/lib/graphql/client";
import Header from "../../../../components/ui/header";
import Loader from "../../../../components/ui/loader";
import PersonCard from "./components/PersonCard";
import Footer from "../../../../components/ui/footer";

type Animal = {
  id: number;
  name: string;
  species: string;
};

type PersonWithAnimals = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  animals: Animal[];
};

type GetPersonWithAnimalsResponse = {
  findPersonWithAnimals: PersonWithAnimals;
};

export default function PersonPage() {
  const params = useParams();
  const id = params.id;
  const [person, setPerson] = useState<PersonWithAnimals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const avatar = searchParams.get("avatar") || "/images/animals/bug.png";

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const fetchPerson = async () => {
      try {
        setLoading(true);
        const data = await graphQLClient.request<GetPersonWithAnimalsResponse>(
          GET_PERSON_WITH_ANIMALS,
          {
            id: parseInt(id),
          }
        );
        setPerson(data.findPersonWithAnimals);
      } catch (error: unknown) {
        console.error("Erreur lors du chargement de la personne :", error);
        setError("Impossible de charger cette personne.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  return (
    <main
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
      className="px-4 max-w-[1100px] w-full flex flex-col justify-between mx-auto bg-[var(--background)] text-[var(--foreground)]"
    >
      <Header partial={true} />

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-[var(--danger)] p-4">{error}</p>
      ) : person ? (
        <PersonCard person={person} avatar={avatar} />
      ) : null}

      <Footer />
    </main>
  );
}
