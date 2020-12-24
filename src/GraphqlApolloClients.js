import {
  ApolloClient,
  // createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client/core";
import { split } from "@apollo/client";
// import { createHttpLink } from "apollo-link-http";
// import { createUploadLink } from "apollo-upload-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { setContext } from "apollo-link-context";
import { WebSocketLink } from "@apollo/client/link/ws";

import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

import { createUploadLink } from "apollo-upload-client";

// const wsLink = new WebSocketLink(client);

// const httpLink = new HttpLink({
//   uri: "https://sheltered-ridge-57950.herokuapp.com/graphql",
// });
const backendURI =
  process.env.NODE_ENV === "production"
    ? "https://sheltered-ridge-57950.herokuapp.com/"
    : "http://localhost:5000/";

const wsURI =
  process.env.NODE_ENV === "production"
    ? `wss://sheltered-ridge-57950.herokuapp.com/subscriptions`
    : "ws://localhost:5000/subscriptions";

const httpLink = createUploadLink({
  uri: backendURI,
  // credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: wsURI,
  options: {
    reconnect: true,
    lazy: true,
    // timeout: 30000,
    onError: (error) => {
      // error.message has to match what the server returns.
      if (
        error.message.contains("authorization") &&
        (localStorage.getItem("adminJwtToken") ||
          localStorage.getItem("donorJwtToken") ||
          localStorage.getItem("jwtToken"))
      ) {
        // Reset the WS connection for it to carry the new JWT.
        wsLink.subscriptionClient.close(false, false);
      }
    },
    connectionParams: () => ({
      AdminAuth: `Bearer ${localStorage.getItem("adminJwtToken")}`,
      DonorAuth: `Bearer ${localStorage.getItem("donorJwtToken")}`,
      UserAuth: `Bearer ${localStorage.getItem("jwtToken")}`,
    }),
  },
});

const adminAuthLink = setContext(() => {
  const adminToken = localStorage.getItem("adminJwtToken");
  return {
    headers: {
      Authorization: adminToken ? `Bearer ${adminToken}` : "",
    },
  };
});
const adminLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  adminAuthLink.concat(httpLink)
);
export const adminClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: adminLink,
  // link: adminAuthLink.concat(httpLink),
  uri: backendURI,

  cache: new InMemoryCache(),
});

const userAuthLink = setContext(() => {
  const userToken = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: userToken ? `Bearer ${userToken}` : "",
    },
  };
});

const userLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  userAuthLink.concat(httpLink)
);
export const userClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: userLink,
  // link: userAuthLink.concat(httpLink),
  uri: backendURI,

  cache: new InMemoryCache(),
  resolvers: {},
});

userClient.cache.writeQuery({
  query: gql`
    query GET_NEW_USER_ADDRESS {
      newUserAddress
    }
  `,
  data: {
    newUserAddress: localStorage.getItem("newUserAddress"),
  },
});

const donorAuthLink = setContext(() => {
  const donorToken = localStorage.getItem("donorJwtToken");
  return {
    headers: {
      Authorization: donorToken ? `Bearer ${donorToken}` : "",
    },
  };
});

const donorLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  donorAuthLink.concat(httpLink)
);
export const donorClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: donorLink,
  // link: donorAuthLink.concat(httpLink),
  uri: backendURI,

  cache: new InMemoryCache(),
});
