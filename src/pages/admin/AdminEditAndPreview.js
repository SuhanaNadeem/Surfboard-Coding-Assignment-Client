import { AdminAuthContext } from "../../context/adminAuth";
import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../../components/admin/NavBar";
import { adminClient } from "../../GraphqlApolloClients";
import Footer from "../../components/admin/Footer";
import { GET_MODULE_BY_ID } from "../../components/admin/QuestionCard";
import EditModule from "../../components/admin/EditModule";
import PreviewModule from "../../components/admin/PreviewModule";
import { GET_QUESTION_BY_ID } from "../../components/admin/EditAndPreviewQuestionCard";
import EditQuestion from "../../components/admin/EditQuestion";
import EditQuestionTemplate from "../../components/admin/EditQuestionTemplate";

export default function AdminEditAndPreview(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const adminId = admin.id;
  const givenId = props.match.params.moduleId;
  var selectedQuestionId = props.match.params.questionId;

  const {
    data: { getModuleById: module } = {},
    loading: loadingModules,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: givenId },
    client: adminClient,
  });

  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId: givenId },
    client: adminClient,
  });

  const {
    data: { getQuestionTemplateById: questionTemplate } = {},
    loading: loadingQuestionTemplate,
  } = useQuery(GET_QUESTION_TEMPLATE_BY_ID, {
    variables: { questionTemplateId: givenId },
    client: adminClient,
  });

  const {
    data: { getBadgeById: badge } = {},
    loading: loadingBadge,
  } = useQuery(GET_BADGE_BY_ID, {
    variables: { badgeId: givenId },
    client: adminClient,
  });

  const {
    data: { getChallengeById: challenge } = {},
    loading: loadingChallenge,
  } = useQuery(GET_CHALLENGE_BY_ID, {
    variables: { challengeId: givenId },
    client: adminClient,
  });

  const adminEditAndPreview =
    module || question || questionTemplate ? (
      <div className="h-full flex flex-col min-h-screen">
        <NavBar />
        <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-32 pb-10">
          <p className="text-4xl text-white">Admin Edit and Preview</p>
        </div>
        {givenId && module && (
          <div className="h-full justify-center flex mx-32 my-10">
            <EditModule props={props} module={module} />
            <PreviewModule
              props={props}
              module={module}
              selectedQuestionId={selectedQuestionId}
            />
          </div>
        )}
        {givenId && question && (
          <div className="h-full justify-start items-center flex mx-32 my-10">
            <EditQuestion question={question} />
          </div>
        )}
        {givenId && questionTemplate && (
          <div className="h-full justify-start items-center flex mx-32 my-10">
            <EditQuestionTemplate questionTemplate={questionTemplate} />
          </div>
        )}
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

export const GET_QUESTION_TEMPLATE_BY_ID = gql`
  query getQuestionTemplateById($questionTemplateId: String!) {
    getQuestionTemplateById(questionTemplateId: $questionTemplateId) {
      id
      inputFields
      createdAt
      name
      adminId
      categoryId
      createdAt
    }
  }
`;

export const GET_BADGE_BY_ID = gql`
  query getBadgeById($badgeId: String!) {
    getBadgeById(badgeId: $badgeId) {
      name
      id
      createdAt
      description
      adminId
      criteria
    }
  }
`;

export const GET_CHALLENGE_BY_ID = gql`
  query getChallengeById($challengeId: String!) {
    getChallengeById(challengeId: $challengeId) {
      id
      categoryId
      name
      challengeDescription
      image
      adminId
    }
  }
`;
