import { gql } from "graphql-request";

export const GET_ALL_PERSONS = gql`
  query GetAllPersons($start: Int, $limit: Int) {
    paginatedPersons(start: $start, limit: $limit) {
      persons {
        id
        firstName
        lastName
      }
      totalCount
    }
  }
`;

export const GET_PERSON_WITH_ANIMALS = gql`
  query GetPersonWithAnimals($id: Int!) {
    findPersonWithAnimals(id: $id) {
      id
      firstName
      lastName
      email
      animals {
        id
        name
        species
      }
    }
  }
`;
