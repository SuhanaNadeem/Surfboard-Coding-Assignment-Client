import React, { useContext } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/student/NavBar";
import Footer from "../../components/student/Footer";
import { studentClient } from "../../GraphqlApolloClients";

export default function StudentModule(props) {
  const { student } = useContext(StudentAuthContext);

  const moduleId = props.match.params.moduleId;
  const {
    data: { getModuleById: module } = {},
    loading: loadingModule,
    error,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: moduleId },
    client: studentClient,
  });

  if (!student) {
    props.history.push("/login");
  }

  const studentModule = student ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32">MODULE PAGE</div>
      <Footer />
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
  return studentModule;
}
export const GET_MODULE_BY_ID = gql`
  query getModuleById($moduleId: String!) {
    getModuleById(moduleId: $moduleId) {
      id
      name
      questions
      categoryId
      format
    }
  }
`;
