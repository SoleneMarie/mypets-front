import { gql } from "graphql-request";

/**
 * Requête GraphQL : GetAllPersons
 * Récupère une liste paginée de personnes (maîtres) avec leur prénom et nom.
 *
 * Variables :
 * - start (Int) : index de départ pour la pagination
 * - limit (Int) : nombre maximum de résultats à récupérer
 *
 * Utilisée dans : PersonsView
 */
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

/**
 * Requête GraphQL : GetPersonWithAnimals
 * Récupère les détails d'une personne, ainsi que la liste de ses animaux.
 *
 * Variables :
 * - id (Int!) : identifiant unique de la personne
 *
 * Utilisée dans : PersonPage
 */
export const GET_PERSON_WITH_ANIMALS = gql`
  query GetPersonWithAnimals($id: Int!) {
    findPersonWithAnimals(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      animals {
        id
        name
        species
      }
    }
  }
`;
