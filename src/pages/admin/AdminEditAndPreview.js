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
import { GET_CATEGORY_BY_ID } from "../../components/admin/ChallengeCard";
import EditCategory from "../../components/admin/EditCategory";
import EditBadge from "../../components/admin/EditBadge";
import EditChallenge from "../../components/admin/EditChallenge";
import LoadingIcon from "../../images/tempModuleCardImg.PNG";

export default function AdminEditAndPreview(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const givenId = props.match.params.givenId;
  var selectedQuestionId = props.match.params.questionId;
  console.log(givenId);
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
    data: { getCategoryById: category } = {},
    loading: loadingCategory,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { categoryId: givenId },
    client: adminClient,
  });

  // const {
  //   data: { getQuestionTemplateById: questionTemplate } = {},
  //   loading: loadingQuestionTemplate,
  // } = useQuery(GET_QUESTION_TEMPLATE_BY_ID, {
  //   variables: { questionTemplateId: givenId },
  //   client: adminClient,
  // });

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
    module || question || category || badge || challenge ? (
      <div className="h-full flex flex-col min-h-screen w-full">
        <NavBar props={props} />
        <div className="bg-red-800 w-full h-32 flex flex-col justify-end px-12 lg:px-48  pb-10">
          <p className="text-4xl text-white truncate">Admin Edit and Preview</p>
        </div>
        {givenId && module && (
          <div
            className={`${
              module.questions.length === 0 ? `justify-start` : `justify-center`
            }  h-full items-start flex md:flex-row flex-col lg:mx-48 mx-12 my-10`}
          >
            <EditModule props={props} module={module} />
            <PreviewModule
              props={props}
              module={module}
              selectedQuestionId={selectedQuestionId}
            />
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
          <div className="h-full justify-start items-center flex  lg:mx-48 mx-12 my-10">
            <EditCategory category={category} props={props} />
          </div>
        )}
        {givenId && badge && (
          <div className="h-full justify-start items-center flex  lg:mx-48 mx-12 my-10">
            <EditBadge badge={badge} props={props} />
          </div>
        )}
        {givenId && challenge && (
          <div className="h-full justify-start items-center flex  lg:mx-48 mx-12 my-10">
            <EditChallenge challenge={challenge} props={props} />
          </div>
        )}
        <Footer />
      </div>
    ) : (
      <div className="h-full flex flex-col min-h-screen w-full items-center justify-center">
        <div className="uppercase font-light text-lg flex flex-col w-full justify-center items-center">
          {/* <p>loading...</p> */}
          <img
            src={LoadingIcon}
            className="rounded-lg object-contain w-full h-32 p-2"
          />
        </div>
      </div>
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
