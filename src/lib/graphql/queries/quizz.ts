import { gql } from "graphql-request";

/**
 * Requête `FindOldestAnimals`
 *
 * Récupère la ou les entrées correspondant aux animaux les plus âgés.
 * Retourne un tableau d’animaux avec leur `id`, `name`, `dateOfBirth` et `species`.
 */
export const FIND_OLDEST_ANIMALS = gql`
  query FindOldestAnimals {
    findOldestAnimals {
      id
      name
      dateOfBirth
      species
    }
  }
`;

/**
 * Requête `FindMostCommonSpecies`
 *
 * Récupère l’espèce la plus représentée dans la base de données.
 * Peut retourner plusieurs espèces en cas d’égalité.
 * Retourne pour chaque espèce son `nom` et le `nombre d’individus` associés.
 */
export const FIND_MOST_COMMON_SPECIES = gql`
  query FindMostCommonSpecies {
    findMostCommonSpecies {
      species
      count
    }
  }
`;

/**
 * Requête `FindTopOwners`
 *
 * Récupère le ou les propriétaires possédant le plus d’animaux (toutes espèces confondues).
 * Retourne pour chacun leur `ownerId`, `fullName` et le `nombre d’animaux`.
 */
export const FIND_TOP_OWNERS = gql`
  query FindTopOwners {
    findTopOwners {
      ownerId
      fullName
      count
    }
  }
`;

/**
 * Requête `FindTopOwnersBySpecies`
 *
 * Récupère les propriétaires qui possèdent le plus d’animaux d’une espèce donnée.
 * Reçoit un paramètre `species` (ex: "Cat").
 * Retourne les `ownerId`, `fullName` et le `nombre` d’animaux correspondants.
 */
export const FIND_TOP_OWNERS_BY_SPECIES = gql`
  query FindTopOwnersBySpecies($species: String!) {
    findTopOwnersBySpecies(species: $species) {
      ownerId
      fullName
      count
    }
  }
`;

/**
 * Requête `FindHeaviestAnimal`
 *
 * Récupère l’animal le plus lourd (ou les animaux à égalité).
 * Retourne `animalId`, `name`, `species`, `weight`, et les infos du propriétaire (`ownerId`, `ownerFullName`).
 */
export const FIND_HEAVIEST_ANIMAL = gql`
  query FindHeaviestAnimal {
    findHeaviestAnimal {
      animalId
      name
      species
      weight
      ownerFullName
      ownerId
    }
  }
`;

/**
 * Requête `FindHeaviestGroups`
 *
 * Récupère le ou les propriétaires dont le groupe d’animaux a le poids total le plus élevé.
 * Retourne le `ownerId`, `fullName` et le `poids total` de leurs animaux (`totalWeight`).
 */
export const FIND_HEAVIEST_GROUPS = gql`
  query FindHeaviestGroups {
    findHeaviestGroups {
      ownerId
      fullName
      totalWeight
    }
  }
`;
