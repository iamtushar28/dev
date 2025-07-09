import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "/api/graphql", // <-- updated path
  cache: new InMemoryCache(),
   defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first", // Use cache, no background fetch
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only", // Only when manually refetch
      errorPolicy: "all",
    },
  },
});
