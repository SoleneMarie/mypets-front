import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:3306/graphql";

export const graphQLClient = new GraphQLClient(endpoint);
