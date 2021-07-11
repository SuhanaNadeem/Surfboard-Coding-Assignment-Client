import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { GET_CATEGORY_BY_ID } from "../../components/admin/ChallengeCard";
import { GET_QUESTION_BY_ID } from "../../components/admin/EditAndPreviewQuestionCard";
import EditBadge from "../../components/admin/EditBadge";
import EditCategory from "../../components/admin/EditCategory";
import EditChallenge from "../../components/admin/EditChallenge";
import EditModule from "../../components/admin/EditModule";
import EditQuestion from "../../components/admin/EditQuestion";
import ToggleModuleReleased from "../../components/admin/ToggleModuleReleased";
import Footer from "../../components/admin/Footer";
import NavBar from "../../components/admin/NavBar";
import PreviewModule from "../../components/admin/PreviewModule";
import { GET_MODULE_BY_ID } from "../../components/admin/QuestionCard";
import LoadingScreen from "../../components/student/LoadingScreen";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";

export default function AdminEditAndPreview(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const givenId = props.match.params.givenId;
  var selectedQuestionId = props.match.params.questionId;
  // console.log(givenId);
  const { data: { getModuleById: module } = {} } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: givenId },
    client: adminClient,
  });

  const { data: { getQuestionById: question } = {} } = useQuery(
    GET_QUESTION_BY_ID,
    {
      variables: { questionId: givenId },
      client: adminClient,
    }
  );

  const { data: { getCategoryById: category } = {} } = useQuery(
    GET_CATEGORY_BY_ID,
    {
      variables: { categoryId: givenId },
      client: adminClient,
    }
  );

  const { data: { getBadgeById: badge } = {} } = useQuery(GET_BADGE_BY_ID, {
    variables: { badgeId: givenId },
    client: adminClient,
  });

  const { data: { getChallengeById: challenge } = {} } = useQuery(
    GET_CHALLENGE_BY_ID,
    {
      variables: { challengeId: givenId },
      client: adminClient,
    }
  );

  const adminEditAndPreview =
    module || question || category || badge || challenge ? (
      <div className="h-full flex flex-col min-h-screen w-full">
        <NavBar props={props} />
        <div
          className="
 bg-red-800 w-full h-32 flex flex-col justify-end  pl-8 sm:pl-24 md:pl-32 lg:pl-48 pb-10"
        >
          <p className="text-4xl text-white truncate pb-1">
            Admin Edit and Preview
          </p>
        </div>
        {givenId && module && (
          <div className="mx-8 sm:mx-24 md:mx-32 lg:mx-48 my-8">
            <div
              className={`${
                module.questions.length === 0
                  ? `justify-start`
                  : `justify-center`
              }  flex flex-col lg:flex-row  items-center lg:items-start`}
            >
              <EditModule props={props} module={module} />
              <PreviewModule
                props={props}
                module={module}
                selectedQuestionId={selectedQuestionId}
              />
            </div>
            <ToggleModuleReleased module={module} />
          </div>
        )}
        {givenId && question && (
          <div className="h-full justify-start items-center flex  lg:mx-48 mx-12 my-10">
            <EditQuestion question={question} props={props} />
          </div>
        )}
        {/* {givenId && questionTemplate && (
          <div className="h-full justify-start items-center flex  lg:mx-48 mx-12 my-10">
            <EditQuestionTemplate questionTemplate={questionTemplate} />
          </div>
        )} */}

        {givenId && category && (
          <div className="h-full justify-start items-start flex flex-1 lg:mx-48 mx-12 my-10">
            <EditCategory category={category} props={props} />
          </div>
        )}
        {givenId && badge && (
          <div className="h-full justify-start items-start flex flex-1 lg:mx-48 mx-12 my-10">
            <EditBadge badge={badge} props={props} />
          </div>
        )}
        {givenId && challenge && (
          <div className="h-full justify-start items-start flex flex-1 lg:mx-48 mx-12 my-10">
            <EditChallenge challenge={challenge} props={props} />
          </div>
        )}
        <Footer />
      </div>
    ) : (
      <LoadingScreen />
    );
  return adminEditAndPreview;
}

// export const GET_QUESTION_TEMPLATE_BY_ID = gql`
//   query getQuestionTemplateById($questionTemplateId: String!) {
//     getQuestionTemplateById(questionTemplateId: $questionTemplateId) {
//       id
//       inputFields
//       createdAt
//       name
//       adminId
//       categoryId
//       createdAt
//     }
//   }
// `;

export const GET_BADGE_BY_ID = gql`
  query getBadgeById($badgeId: String!) {
    getBadgeById(badgeId: $badgeId) {
      adminId
      requiredAmount
      type
      name
      createdAt
      description
      image
      id
    }
  }
`;

export const GET_CHALLENGE_BY_ID = gql`
  query getChallengeById($challengeId: String!) {
    getChallengeById(challengeId: $challengeId) {
      name
      categoryId
      challengeDescription
      image
      extraLink
      dueDate
      adminId
      id
      createdAt
    }
  }
`;
