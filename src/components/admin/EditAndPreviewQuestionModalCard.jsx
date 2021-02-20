import React, { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { adminClient } from "../../GraphqlApolloClients";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPlayer from "react-player";
import { GET_MODULE_BY_ID } from "./QuestionCard";
import { GET_QUESTION_BY_ID } from "../student/CompletedQuestion";

function EditAndPreviewQuestionModalCard({
  props,
  questionId,
  handleQuestionClick,
  moduleId,
}) {
  const {
    data: { getQuestionById: question } = {},
    loading: loadingQuestion,
    questionError,
    refetch: refetchQuestion,
  } = useQuery(GET_QUESTION_BY_ID, {
    variables: { questionId },
    client: adminClient,
  });

  const {
    data: { getHintByQuestion: hint } = {},
    loading: loadingHint,
    hintError,
  } = useQuery(GET_HINT_BY_QUESTION, {
    variables: { questionId: questionId },
    client: adminClient,
  });

  const {
    data: { getModuleById: module } = {},
    loading: loadingGetModuleById,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: moduleId },
    client: adminClient,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (question && question.type === "Question") {
      setIsOpen(true);
    }
  }, [questionId]);
  function onAdminClick() {
    setIsOpen(true);
    if (question.type === "Skill") {
      var nextQuesId =
        module && module.questions[module.questions.indexOf(question.id) + 1];
      handleQuestionClick(nextQuesId);
    }
  }

  function togglePrevOpen() {
    var prevQuesId =
      module && module.questions[module.questions.indexOf(question.id) - 1];
    handleQuestionClick(prevQuesId);
  }

  function toggleNextOpen() {
    var nextQuesId =
      module && module.questions[module.questions.indexOf(question.id) + 1];
    handleQuestionClick(nextQuesId);
  }

  return question ? (
    <div className="justify-between flex flex-col h-full">
      <div className="flex flex-col items-center justify-start text-center overflow-y-auto ">
        <h3 className="text-3xl text-red-800 mx-auto mb-2">
          {question.questionName}
        </h3>
        <div>
          {question.image && (
            <div
              className="bg-cover mb-6 w-64 h-32 bg-center bg-no-repeat rounded-lg hover:shadow-md mx-auto"
              style={{
                backgroundImage: `url(${question.image})`,
              }}
            ></div>
          )}
        </div>
        <h6 className="text-md font-light leading-snug">
          {question.questionDescription}
        </h6>
        {question.videoLink && (
          <div className="mt-4 ">
            <ReactPlayer
              url={question.videoLink}
              width={557.33}
              height={300}
              muted={true}
            />
          </div>
        )}
        {question.type === "Question" && (
          <div className="flex flex-col">
            <form className="flex mt-4 items-center justify-center">
              <input
                className="md:w-3/4 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 font-light leading-tight focus:outline-none"
                name="answer"
                placeholder="Enter an answer"
                type="text"
              />
              <button className="ml-4 md:w-1/4 border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold text-center items-center justify-center flex">
                Submit
              </button>
            </form>
            {hint && (
              <div className="focus:outline-none flex mx-auto mt-2 px-4 py-2 uppercase text-black tracking-wide hover:text-red-800 text-xs">
                <h3 className="font-semibold">Hint</h3>
                <h3 className="ml-2">{hint}</h3>
              </div>
            )}
          </div>
        )}
      </div>
      <form className="flex mt-6">
        {module && module.questions.indexOf(question.id) != 0 && (
          <button className="mx-auto" onClick={togglePrevOpen} type="button">
            <BsChevronLeft size={32} />
          </button>
        )}

        {module &&
          module.questions.indexOf(question.id) + 1 !==
            module.questions.length && (
            <button
              className="mx-auto"
              onClick={(e) => {
                onAdminClick();

                if (question.type !== "Skill") {
                  toggleNextOpen(e);
                }
              }}
            >
              <BsChevronRight size={32} />
            </button>
          )}
      </form>
    </div>
  ) : (
    <div></div>
  );
}

export const GET_HINT_BY_QUESTION = gql`
  query getHintByQuestion($questionId: String!) {
    getHintByQuestion(questionId: $questionId)
  }
`;

export default EditAndPreviewQuestionModalCard;
