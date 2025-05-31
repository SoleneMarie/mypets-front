/**
 * Composant Pagination
 *
 * Affiche une pagination avec :
 * - des boutons "Précédent" et "Suivant"
 * - des pages numérotées avec ellipses automatiques
 * - un sélecteur du nombre de résultats par page
 *
 * Props :
 * - currentPage : page actuellement sélectionnée
 * - totalPages : nombre total de pages
 * - onPageChange : callback déclenchée lors d’un changement de page
 * - limit : nombre d’éléments par page
 * - setLimit : fonction pour changer la valeur de `limit`
 */

import { getPaginationRange } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CustomSelect from "./CustomSelect";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  setLimit: (newLimit: number) => void;
};

const paginationOptions = [
  { label: "8", value: 8 },
  { label: "20", value: 20 },
  { label: "40", value: 40 },
];

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  setLimit,
}: PaginationProps) {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-between">
      <div className="flex items-center gap-2 mr-8">
        <CustomSelect
          label="Résultats par page :"
          value={limit}
          onChange={(value) => {
            setLimit(Number(value));
            onPageChange(1);
          }}
          options={paginationOptions}
          width="w-14 sm:w-16"
        />
      </div>
      <div className="flex items-center gap-1 mt-2 mb-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-7 px-1.5 mr-1.5 rounded-xl shadow-lg text-[var(--background)] bg-[var(--danger)] text-sm disabled:opacity-40 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={3} />
        </button>

        {paginationRange.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1.5 sm:px-3 text-gray-400 rounded-xl shadow-lg  font-semibold"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`py-1 text-sm rounded-xl shadow-lg transition w-10 ${
                page === currentPage
                  ? "text-[var(--danger)] font-bold"
                  : "hover:bg-gray-100 cursor-pointer font-semibold"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-7 px-1.5 ml-1.5 rounded-xl shadow-lg text-[var(--background)] bg-[var(--danger)] text-sm disabled:opacity-40 cursor-pointer"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
