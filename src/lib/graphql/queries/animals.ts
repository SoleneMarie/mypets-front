import { gql } from "graphql-request";

/**
 * Requête GraphQL : GetAllAnimals
 * Récupère une liste paginée d'animaux avec un filtre optionnel sur l'espèce.
 *
 * Variables :
 * - start (Int) : index de départ pour la pagination
 * - limit (Int) : nombre maximum de résultats à récupérer
 * - species (String, optionnel) : espèce à filtrer (ex: "Dog", "Cat", etc.)
 *
 * Utilisée dans : AnimalsView
 */
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

/**
 * Requête GraphQL : GetAnimalWithOwner
 * Récupère les détails complets d’un animal (y compris son propriétaire) par son ID.
 *
 * Variables :
 * - id (Int!) : identifiant unique de l’animal
 *
 * Utilisée dans : AnimalPage
 */
export const GET_ANIMAL_WITH_OWNER = gql`
  query GetAnimalWithOwner($id: Int!) {
    findAnimalWithOwner(id: $id) {
      id
      name
      dateOfBirth
      species
      breed
      color
      weight
      owner {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
