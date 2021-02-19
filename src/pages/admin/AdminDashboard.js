import { AdminAuthContext } from "../../context/adminAuth";
import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/admin/NavBar";
import DashboardSideBar from "../../components/admin/DashboardSideBar";
import { adminClient } from "../../GraphqlApolloClients";
import DashboardCards from "../../components/admin/DashboardCards";
import Footer from "../../components/admin/Footer";

export default function StudentDashboard(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const adminId = admin.id;

  const {
    data: { getModulesByAdmin: modules } = {},
    loading: loadingModules,
  } = useQuery(GET_MODULES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getBadgesByAdmin: badges } = {},
    loading: loadingBadges,
  } = useQuery(GET_BADGES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getQuestionsByAdmin: questions } = {},
    loading: loadingQuestions,
  } = useQuery(GET_QUESTIONS_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getChallengesByAdmin: challenges } = {},
    loading: loadingChallenges,
  } = useQuery(GET_CHALLENGES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getCategoriesByAdmin: categories } = {},
    loading: loadingCategories,
  } = useQuery(GET_CATEGORIES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  const {
    data: { getQuestionTemplatesByAdmin: questionTemplates } = {},
    loading: loadingQuestionTemplates,
  } = useQuery(GET_QUESTION_TEMPLATES_BY_ADMIN, {
    variables: { adminId },
    client: adminClient,
  });
  console.log(admin.id);
  console.log(badges);

  const adminDashboard = admin ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32"></div>
      <div className="h-full flex-1 flex mx-48 mt-4 mb-8">
        <DashboardSideBar />
        <div className="md:w-5/6 last:mt-4">
          {modules && modules.length !== 0 && (
            <DashboardCards props={props} objects={modules} type="Modules" />
          )}
          {questions && questions.length !== 0 && (
            <DashboardCards
              props={props}
              objects={questions}
              type="Questions"
            />
          )}
          {questionTemplates && questionTemplates.length !== 0 && (
            <DashboardCards
              props={props}
              objects={questionTemplates}
              type="Question Templates"
            />
          )}
          {categories && categories.length !== 0 && (
            <DashboardCards
              props={props}
              objects={categories}
              type="Categories"
            />
          )}
          {badges && badges.length !== 0 && (
            <DashboardCards props={props} objects={badges} type="Badges" />
          )}
          {challenges && challenges.length !== 0 && (
            <DashboardCards
              props={props}
              objects={challenges}
              type="Challenges"
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
  return adminDashboard;
}

export const GET_MODULES_BY_ADMIN = gql`
  query getModulesByAdmin($adminId: String!) {
    getModulesByAdmin(adminId: $adminId) {
      id
      name
      comments
      questions
      categoryId
      createdAt
    }
  }
`;
export const GET_QUESTIONS_BY_ADMIN = gql`
  query getQuestionsByAdmin($adminId: String!) {
    getQuestionsByAdmin(adminId: $adminId) {
      id
      questionName
      questionDescription
      image
      points
      moduleId
      type
      videoLink
      skillDescription
      articleLink
      expectedAnswer
      hint
      adminId
      createdAt
    }
  }
`;
export const GET_QUESTION_TEMPLATES_BY_ADMIN = gql`
  query getQuestionTemplatesByAdmin($adminId: String!) {
    getQuestionTemplatesByAdmin(adminId: $adminId) {
      id
      inputFields
      createdAt
      name
      categoryId
      createdAt
    }
  }
`;
export const GET_BADGES_BY_ADMIN = gql`
  query getBadgesByAdmin($adminId: String!) {
    getBadgesByAdmin(adminId: $adminId) {
      name
      id
      createdAt
      description
      adminId
      criteria
    }
  }
`;
export const GET_CHALLENGES_BY_ADMIN = gql`
  query getChallengesByAdmin($adminId: String!) {
    getChallengesByAdmin(adminId: $adminId) {
      id
      categoryId
      name
      challengeDescription
      image
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
