import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined in .env");
}

export const graphQLClient = new GraphQLClient(endpoint);
