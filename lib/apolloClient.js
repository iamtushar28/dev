import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "/api/graphql", // <-- updated path
  cache: new InMemoryCache(),
});
