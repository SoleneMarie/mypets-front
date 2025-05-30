import { gql } from "graphql-request";

export const GET_ALL_ANIMALS = gql`
  query GetAllAnimals($start: Int, $limit: Int, $species: String) {
    paginatedAnimals(start: $start, limit: $limit, species: $species) {
      animals {
        id
        name
        species
      }
      totalCount
    }
  }
`;
