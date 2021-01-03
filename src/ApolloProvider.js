import { ApolloProvider } from "@apollo/client";
import React from "react";
import App from "./App";
import { studentClient } from "./GraphqlApolloClients";

export default (
  <ApolloProvider client={studentClient}>
    {/* <Suspense fallback={<FullPageLoadingScreen />}> */}
    <App />
    {/* </Suspense> */}
  </ApolloProvider>
);
