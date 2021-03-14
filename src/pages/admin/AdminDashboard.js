import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import DashboardCards from "../../components/admin/DashboardCards";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import Footer from "../../components/admin/Footer";
import NavBar from "../../components/admin/NavBar";
import LoadingScreen from "../../components/student/LoadingScreen";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";

export default function AdminDashboard(props) {
  const { admin } = useContext(AdminAuthContext);
  var adminId;
  if (!admin) {
    props.history.push("/loginAdmin");
  } else {
    adminId = admin.id;
  }

  const { data: { getModulesByAdmin: adminModules } = {} } = useQuery(
    GET_MODULES_BY_ADMIN,
    {
      variables: { adminId },
      client: adminClient,
    }
  );
  const { data: { getBadgesByAdmin: adminBadges } = {} } = useQuery(
    GET_BADGES_BY_ADMIN,
    {
      variables: { adminId },
      client: adminClient,
    }
  );
  const { data: { getQuestionsByAdmin: adminQuestions } = {} } = useQuery(
    GET_QUESTIONS_BY_ADMIN,
    {
      variables: { adminId },
      client: adminClient,
    }
  );
  const { data: { getChallengesByAdmin: adminChallenges } = {} } = useQuery(
    GET_CHALLENGES_BY_ADMIN,
    {
      variables: { adminId },
      client: adminClient,
    }
  );
  const { data: { getCategoriesByAdmin: adminCategories } = {} } = useQuery(
    GET_CATEGORIES_BY_ADMIN,
    {
      variables: { adminId },
      client: adminClient,
    }
  );
  //   const {
  //     data: { getQuestionTemplatesByAdmin: adminQuestionTemplates } = {},
  //
  //   } = useQuery(GET_QUESTION_TEMPLATES_BY_ADMIN, {
  //     variables: { adminId },
  //     client: adminClient,
  //   });

  const { data: { getModules: modules } = {} } = useQuery(GET_MODULES, {
    client: adminClient,
  });
  const { data: { getBadges: badges } = {} } = useQuery(GET_BADGES, {
    client: adminClient,
  });
  const { data: { getQuestions: questions } = {} } = useQuery(GET_QUESTIONS, {
    client: adminClient,
  });
  const { data: { getChallenges: challenges } = {} } = useQuery(
    GET_CHALLENGES,
    {
      client: adminClient,
    }
  );
  const { data: { getCategories: categories } = {} } = useQuery(
    GET_CATEGORIES,
    {
      client: adminClient,
    }
  );
  //   const {
  //     data: { getQuestionTemplates: questionTemplates } = {},
  //
  //   } = useQuery(GET_QUESTION_TEMPLATES, {
  //     client: adminClient,
  //   });

  const adminDashboard = admin ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end px-10 lg:pl-32 xl:pl-48 pb-10">
        <p className="text-4xl text-white">Admin Dashboard</p>
      </div>
      <div className="h-full md:flex-1 md:flex-row flex-col flex mx-16 lg:mx-32 xl:mx-48 mt-4 mb-8">
        {adminModules &&
          adminQuestions &&
          //   adminQuestionTemplates &&
          adminBadges &&
          adminCategories &&
          adminChallenges && (
            <DashboardSideBar
              numOfQuestions={adminQuestions.length}
              //   numOfQuestionTemplates={adminQuestionTemplates.length}
              numOfModules={adminModules.length}
              numOfCategories={adminCategories.length}
              numOfChallenges={adminChallenges.length}
              numOfBadges={adminBadges.length}
            />
          )}
        <div className="md:w-5/6 w-full mt-4 lg:pl-10 md:pl-8">
          {modules && modules.length !== 0 && (
            <DashboardCards
              props={props}
              objects={modules}
              adminObjects={adminModules}
              type="Modules"
            />
          )}

          {questions && questions.length !== 0 && (
            <DashboardCards
              props={props}
              objects={questions}
              adminObjects={adminQuestions}
              type="Questions"
            />
          )}
          {/* {questionTemplates && questionTemplates.length !== 0 && (
            <DashboardCards
              props={props}
              objects={questionTemplates}
              adminObjects={adminQuestionTemplates}
              type="Question Templates"
            />
          )} */}
          {categories && categories.length !== 0 && (
            <DashboardCards
              props={props}
              objects={categories}
              adminObjects={adminCategories}
              type="Categories"
            />
          )}
          {badges && badges.length !== 0 && (
            <DashboardCards
              props={props}
              objects={badges}
              type="Badges"
              adminObjects={adminBadges}
            />
          )}
          {challenges && challenges.length !== 0 && (
            <DashboardCards
              props={props}
              objects={challenges}
              adminObjects={adminChallenges}
              type="Challenges"
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <LoadingScreen />
  );
  return adminDashboard;
}

export const GET_MODULES = gql`
  query getModules {
    getModules {
      id
      name
      comments
      questions
      image
      categoryId
      createdAt
    }
  }
`;
export const GET_QUESTIONS = gql`
  query getQuestions {
    getQuestions {
      id
      name
      description
      image
      points
      moduleId
      type
      videoLink
      articleLink
      expectedAnswer
      hint
      adminId
      createdAt
    }
  }
`;
// export const GET_QUESTION_TEMPLATES = gql`
//   query getQuestionTemplates {
//     getQuestionTemplates {
//       id
//       inputFields
//       createdAt
//       name
//       categoryId
//       createdAt
//     }
//   }
// `;
export const GET_BADGES = gql`
  query getBadges {
    getBadges {
      id
      name
      type
      requiredAmount
      adminId
      createdAt
      image
      description
    }
  }
`;
export const GET_CHALLENGES = gql`
  query getChallenges {
    getChallenges {
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
export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      name
      id
      createdAt
      adminId
    }
  }
`;

export const GET_MODULES_BY_ADMIN = gql`
  query getModulesByAdmin($adminId: String!) {
    getModulesByAdmin(adminId: $adminId) {
      id
      name
      comments
      questions
      image
      categoryId
      createdAt
    }
  }
`;
export const GET_QUESTIONS_BY_ADMIN = gql`
  query getQuestionsByAdmin($adminId: String!) {
    getQuestionsByAdmin(adminId: $adminId) {
      id
      name
      description
      questionFormat
      image
      points
      moduleId
      type
      videoLink
      articleLink
      expectedAnswer
      hint
      adminId
      extraLink
      optionA
      optionB
      optionC
      optionD
      createdAt
    }
  }
`;
// export const GET_QUESTION_TEMPLATES_BY_ADMIN = gql`
//   query getQuestionTemplatesByAdmin($adminId: String!) {
//     getQuestionTemplatesByAdmin(adminId: $adminId) {
//       id
//       inputFields
//       createdAt
//       name
//       categoryId
//       createdAt
//     }
//   }
// `;
export const GET_BADGES_BY_ADMIN = gql`
  query getBadgesByAdmin($adminId: String!) {
    getBadgesByAdmin(adminId: $adminId) {
      id
      name
      type
      requiredAmount
      adminId
      createdAt
      description
      image
    }
  }
`;
export const GET_CHALLENGES_BY_ADMIN = gql`
  query getChallengesByAdmin($adminId: String!) {
    getChallengesByAdmin(adminId: $adminId) {
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
export const GET_CATEGORIES_BY_ADMIN = gql`
  query getCategoriesByAdmin($adminId: String!) {
    getCategoriesByAdmin(adminId: $adminId) {
      name
      id
      createdAt
      adminId
    }
  }
`;
