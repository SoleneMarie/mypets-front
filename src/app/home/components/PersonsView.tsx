"use client";
import { useEffect, useState } from "react";
import { graphQLClient } from "@/lib/graphql/client";
import { GET_ALL_PERSONS } from "@/lib/graphql/queries/persons";
import { assignRandomAvatars } from "@/lib/utils";

import Loader from "../../../../components/ui/loader";
import Pagination from "./Pagination";
import OneSmallCard from "../../../../components/ui/OneSmallCard";

type Person = {
  id: number;
  firstName: string;
  lastName: string;
};

export default function PersonsView() {
  const [isLoading, setIsLoading] = useState(true);
  const [persons, setPersons] = useState<Person[]>([]);
  const [avatars, setAvatars] = useState<string[]>([]);

  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchPersons() {
      try {
        const start = (currentPage - 1) * limit;
        const data = await graphQLClient.request<{
          paginatedPersons: {
            persons: Person[];
            totalCount: number;
          };
        }>(GET_ALL_PERSONS, { start, limit });

        setPersons(data.paginatedPersons.persons);
        setAvatars(assignRandomAvatars(data.paginatedPersons.persons.length));
        setTotalCount(data.paginatedPersons.totalCount);
      } catch (error) {
        console.error("Erreur lors du chargement des personnes", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPersons();
  }, [currentPage, limit]);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex-1">
      <div className="pt-6 flex flex-wrap text-balance ">
        <h2 className="text-xl sm:text-2xl font-semibold mr-2">
          Les maîtres et maîtresses
        </h2>
        <h2 className="text-xl sm:text-2xl font-semibold">de My Pets 🐾</h2>
      </div>
      <p className="pb-4 font-medium text-sm sm:text-base mt-2 opacity-90">
        Cliquez sur un maître pour avoir plus d'informations
      </p>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / limit)}
        onPageChange={(page) => setCurrentPage(page)}
        limit={limit}
        setLimit={setLimit}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 mb-4">
        {persons.map((person, index) => (
          <OneSmallCard
            key={person.id}
            id={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
            avatar={avatars[index]}
          />
        ))}
      </div>
    </div>
  );
}
