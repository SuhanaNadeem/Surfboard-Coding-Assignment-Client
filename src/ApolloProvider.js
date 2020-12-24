import { ApolloProvider } from "@apollo/client";
import React from "react";
import App from "./App";
import { userClient } from "./GraphqlApolloClients";

export default (
  <ApolloProvider client={userClient}>
    {/* <Suspense fallback={<FullPageLoadingScreen />}> */}
    <App />
    {/* </Suspense> */}
  </ApolloProvider>
);
