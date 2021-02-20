import { AdminAuthContext } from "../../context/adminAuth";
import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import NavBar from "../../components/admin/NavBar";
import { adminClient } from "../../GraphqlApolloClients";
import Footer from "../../components/admin/Footer";
import { GET_MODULE_BY_ID } from "../../components/admin/QuestionCard";
import EditModule from "../../components/admin/EditModule";
import PreviewModule from "../../components/admin/PreviewModule";

export default function AdminEditAndPreview(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const adminId = admin.id;
  const moduleId = props.match.params.moduleId;
  var selectedQuestionId = props.match.params.questionId;

  const {
    data: { getModuleById: module } = {},
    loading: loadingModules,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId },
    client: adminClient,
  });

  const adminEditAndPreview = module ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      {/* <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-48 pb-10">
        <p className="text-4xl text-white">Admin Edit and Preview</p>
      </div> */}
      <div className="h-full flex-1 flex mx-48 mt-4 mb-8">
        <EditModule props={props} module={module} />
      </div>
      <PreviewModule
        props={props}
        module={module}
        selectedQuestionId={selectedQuestionId}
      />
      <Footer />
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
  return adminEditAndPreview;
}
