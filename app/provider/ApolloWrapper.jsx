// app/provider/ApolloWrapper.jsx
"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";

export default function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
