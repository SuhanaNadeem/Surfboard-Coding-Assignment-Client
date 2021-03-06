import { AdminAuthContext } from "../../context/adminAuth";
import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/admin/NavBar";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import { adminClient } from "../../GraphqlApolloClients";
import DashboardCards from "../../components/admin/DashboardCards";
import Footer from "../../components/admin/Footer";

export default function AdminDashboard(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }

  const adminId = admin.id;

  const {
    data: { getModulesByAdmin: adminModules } = {},
    loading: loadingAdminModules,
  } = useQuery(GET_MODULES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getBadgesByAdmin: adminBadges } = {},
    loading: loadingAdminBadges,
  } = useQuery(GET_BADGES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getQuestionsByAdmin: adminQuestions } = {},
    loading: loadingAdminQuestions,
  } = useQuery(GET_QUESTIONS_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getChallengesByAdmin: adminChallenges } = {},
    loading: loadingAdminChallenges,
  } = useQuery(GET_CHALLENGES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getCategoriesByAdmin: adminCategories } = {},
    loading: loadingAdminCategories,
  } = useQuery(GET_CATEGORIES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  //   const {
  //     data: { getQuestionTemplatesByAdmin: adminQuestionTemplates } = {},
  //     loading: loadingAdminQuestionTemplates,
  //   } = useQuery(GET_QUESTION_TEMPLATES_BY_ADMIN, {
  //     variables: { adminId },
  //     client: adminClient,
  //   });

  const {
    data: { getModules: modules } = {},
    loading: loadingModules,
  } = useQuery(GET_MODULES, {
    client: adminClient,
  });
  const { data: { getBadges: badges } = {}, loading: loadingBadges } = useQuery(
    GET_BADGES,
    {
      client: adminClient,
    }
  );
  const {
    data: { getQuestions: questions } = {},
    loading: loadingQuestions,
  } = useQuery(GET_QUESTIONS, {
    client: adminClient,
  });
  const {
    data: { getChallenges: challenges } = {},
    loading: loadingChallenges,
  } = useQuery(GET_CHALLENGES, {
    client: adminClient,
  });
  const {
    data: { getCategories: categories } = {},
    loading: loadingCategories,
  } = useQuery(GET_CATEGORIES, {
    client: adminClient,
  });
  //   const {
  //     data: { getQuestionTemplates: questionTemplates } = {},
  //     loading: loadingQuestionTemplates,
  //   } = useQuery(GET_QUESTION_TEMPLATES, {
  //     client: adminClient,
  //   });

  const adminDashboard = admin ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-16 lg:pl-32 xl:pl-48 pb-10">
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
    <div className="h-full flex flex-col min-h-screen w-full">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
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
