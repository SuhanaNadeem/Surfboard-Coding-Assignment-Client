import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_MODULE_POINTS_BY_STUDENT } from "../../pages/student/StudentModule";
import { GET_MODULE_BY_ID } from "./QuestionCard";

import { BiAward } from "react-icons/bi";
import { GET_CATEGORY_BY_ID } from "../student/ModuleCard";
import { GET_QUESTION_BY_ID } from "../student/CompletedQuestion";
function Badge({ badge }) {
  // console.log(badge);

  const {
    data: { getQuestionById: question } = {},
    // refetch: refetchQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId: badge.questionId },
    client: adminClient,
  });
  const { data: { getCategoryById: category } = {} } = useQuery(
    GET_CATEGORY_BY_ID,
    {
      variables: { categoryId: badge.categoryId },
      client: adminClient,
    }
  );
  const { data: { getModuleById: module } = {} } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: badge.moduleId },
    client: adminClient,
  });

  return badge ? (
    <div className="flex items-start justify-start mb-2">
      <BiAward size={24} />
      <div className="flex flex-col items-start justify-start ml-1">
        <h3 className="font-semibold text-sm uppercase">{badge.name}</h3>
        {category && <h2 className="font-light text-xs">{category.name}</h2>}
        {module && <h2 className="font-light text-xs">{module.name}</h2>}
        {question && <h2 className="font-light text-xs">{question.name}</h2>}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Badge;
