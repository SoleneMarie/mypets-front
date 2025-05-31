import { gql } from "graphql-request";

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

export const FIND_MOST_COMMON_SPECIES = gql`
  query FindMostCommonSpecies {
    findMostCommonSpecies {
      species
      count
    }
  }
`;
