import { split } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

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
          localStorage.getItem("mentorJwtToken") ||
          localStorage.getItem("jwtToken"))
      ) {
        // Reset the WS connection for it to carry the new JWT.
        wsLink.subscriptionClient.close(false, false);
      }
    },
    connectionParams: () => ({
      AdminAuth: `Bearer ${localStorage.getItem("adminJwtToken")}`,
      DonorAuth: `Bearer ${localStorage.getItem("mentorJwtToken")}`,
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

const studentAuthLink = setContext(() => {
  const studentToken = localStorage.getItem("jwtToken");

  return {
    headers: {
      Authorization: studentToken ? `Bearer ${studentToken}` : "",
    },
  };
});

const studentLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  studentAuthLink.concat(httpLink)
);
export const studentClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: studentLink,
  // link: studentAuthLink.concat(httpLink),
  uri: backendURI,

  cache: new InMemoryCache(),
  resolvers: {},
});

// studentClient.cache.writeQuery({
//   query: gql`
//     query GET_NEW_USER_ADDRESS {
//       newUserAddress
//     }
//   `,
//   data: {
//     newUserAddress: localStorage.getItem("newUserAddress"),
//   },
// });

const mentorAuthLink = setContext(() => {
  const mentorToken = localStorage.getItem("mentorJwtToken");
  return {
    headers: {
      Authorization: mentorToken ? `Bearer ${mentorToken}` : "",
    },
  };
});

const mentorLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  mentorAuthLink.concat(httpLink)
);
export const mentorClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: mentorLink,
  // link: mentorAuthLink.concat(httpLink),
  uri: backendURI,

  cache: new InMemoryCache(),
});
