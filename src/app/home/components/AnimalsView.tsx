/**
 * Composant AnimalsView
 * Affiche une liste paginée d'animaux avec possibilité de filtrer par espèce.
 * Utilise GraphQL pour récupérer les données côté client.
 */

"use client";
import { useEffect, useState } from "react";
import { graphQLClient } from "@/lib/graphql/client";
import { GET_ALL_ANIMALS } from "@/lib/graphql/queries/animals";
import { getSpeciePhoto } from "@/lib/utils";

import CustomSelect from "./CustomSelect";
import Loader from "../../../../components/ui/loader";
import Pagination from "./Pagination";
import OneSmallCard from "../../../../components/ui/OneSmallCard";

type Animal = {
  id: number;
  name: string;
  species: string;
};

const speciesOptions = [
  { label: "Toutes", value: "" },
  { label: "Chien", value: "Dog" },
  { label: "Chat", value: "Cat" },
  { label: "Lapin", value: "Rabbit" },
  { label: "Tortue", value: "Turtle" },
  { label: "Hamster", value: "Hamster" },
  { label: "Oiseau", value: "Bird" },
];

export default function AnimalsView() {
  const [isLoading, setIsLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSpecie, setFilteredSpecie] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const start = (currentPage - 1) * limit;
        const data = await graphQLClient.request<{
          paginatedAnimals: {
            animals: Animal[];
            totalCount: number;
          };
        }>(GET_ALL_ANIMALS, { start, limit, species: filteredSpecie });

        if (data.paginatedAnimals.animals.length === 0) {
          setError("Il n'y a aucun animal à afficher");
        }
        setAnimals(data.paginatedAnimals.animals);
        setTotalCount(data.paginatedAnimals.totalCount);
      } catch (error) {
        console.error("Erreur lors du chargement des animaux", error);
        setError("Impossible de charger les animaux. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnimals();
  }, [currentPage, limit, filteredSpecie]);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-[var(--danger)] p-4 text-sm sm:text-normal text-center">
        {error}
      </div>
    );

  return (
    <div className="w-full flex-1">
      <div className="pt-6 flex flex-wrap text-balance ">
        <h2 className="text-xl sm:text-2xl font-semibold mr-2">
          Les bestioles
        </h2>
        <h2 className="text-xl sm:text-2xl font-semibold">de My Pets 🐾</h2>
      </div>
      <p className="pb-4 font-medium text-sm sm:text-base mt-2 opacity-90">
        Cliquez sur un animal pour avoir plus d'informations
      </p>
      <div className="md:flex items-center justify-between">
        <CustomSelect
          label="Espèces :"
          value={filteredSpecie}
          onChange={(value) => {
            setFilteredSpecie(value as string);
            setCurrentPage(1);
          }}
          options={speciesOptions}
          width="w-22"
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / limit)}
          onPageChange={(page) => setCurrentPage(page)}
          limit={limit}
          setLimit={setLimit}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 mb-4">
        {animals.map((animal) => (
          <OneSmallCard
            key={animal.id}
            id={animal.id}
            firstName={animal.name}
            lastName=""
            avatar={getSpeciePhoto(animal.species)}
            path={`/animal/${animal.id}`}
          />
        ))}
      </div>
    </div>
  );
}
