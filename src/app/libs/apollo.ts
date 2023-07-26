import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import { LocalStorageKeys } from "./helpers";

const { NEXT_PUBLIC_GATEWAY_URL_DOMAIN } = process.env;

const apiGateWayUrl = NEXT_PUBLIC_GATEWAY_URL_DOMAIN;

const httpLink = createUploadLink({
  uri: apiGateWayUrl,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: { ...headers, Authorization: `Bearer ${token}` },
    };
  } else return { headers: { ...headers } };
});

const apolloClient = new ApolloClient({
  uri: apiGateWayUrl,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: "JujuAGI",
  version: "1.0",
});

export default apolloClient;
