"use client";
import apolloClient from "@/app/libs/apollo";
import { ApolloProvider } from "@apollo/client";
import React from "react";

const ApolloClientProvider = ({ children }: React.PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
