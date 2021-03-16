import { gql, useQuery } from "@apollo/client";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPlayer from "react-player";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_QUESTION_BY_ID } from "../student/CompletedQuestion";
import { GET_MODULE_BY_ID } from "./QuestionCard";

function EditAndPreviewQuestionModalCard({
  questionId,
  handleQuestionClick,
  moduleId,
}) {
  const { data: { getQuestionById: question } = {} } = useQuery(
    GET_QUESTION_BY_ID,
    {
      variables: { questionId },
      client: adminClient,
    }
  );

  const { data: { getHintByQuestion: hint } = {} } = useQuery(
    GET_HINT_BY_QUESTION,
    {
      variables: { questionId: questionId },
      client: adminClient,
    }
  );

  const { data: { getModuleById: module } = {} } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: moduleId },
    client: adminClient,
  });

  // const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (question && question.type === "Question") {
  //     setIsOpen(true);
  //   }
  // }, [questionId]);
  function onAdminClick() {
    // setIsOpen(true);
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
        <h3 className="text-3xl text-red-800 mx-auto mb-2">{question.name}</h3>
        {question.image && question.image !== "" && (
          <div className="mt-2 mb-4 mx-auto px-1">
            <img
              className="w-full h-72 object-cover object-center rounded-lg "
              alt="Question"
              src={question.image}
            />
          </div>
        )}

        {question.articleLink && question.articleLink !== "" && (
          <div className="flex justify-center items-center mb-2 w-full">
            <h5 className="font-semibold uppercase tracking-wide text-xs mr-2">
              Article:
            </h5>
            <a
              className="font-normal lg:font-light text-md lg:text-sm truncate leading-tight w-1/2 md:w-full text-center"
              href={question.articleLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {question.articleLink}
            </a>
          </div>
        )}
        <h6 className="text-md text-left font-normal lg:font-light leading-snug ">
          {question.description}
        </h6>
        {question.extraLink && question.extraLink !== "" && (
          <div className="flex justify-center items-center mb-2 w-full">
            <h5 className="font-semibold uppercase tracking-wide text-xs mr-2">
              Visit:
            </h5>
            <a
              className="font-normal lg:font-light text-md lg:text-sm truncate leading-tight w-1/2 md:w-full text-center"
              href={question.extraLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {question.extraLink}
            </a>
          </div>
        )}
        {question.videoLink && question.videoLink !== "" && (
          <div className="mt-4 w-full mb-2">
            <ReactPlayer
              url={question.videoLink}
              width="100%"
              height={300}
              controls={true}
            />
          </div>
        )}
        {question.type === "Question" && (
          <div className="flex flex-col">
            <div
              className={`${
                question.questionFormat === "Multiple Choice"
                  ? `flex-col`
                  : `flex-row`
              } flex mt-4 items-center justify-center`}
            >
              {question.questionFormat === "Multiple Choice" ? (
                <div className="flex flex-col text-md font-light justify-center items-start">
                  <div>
                    <input
                      name="answer"
                      value="A"
                      disabled
                      type="radio"
                      id="A"
                      className="mr-2"
                    />
                    <label htmlFor="A">{question.optionA}</label>
                  </div>
                  <div>
                    <input
                      name="answer"
                      value="B"
                      disabled
                      type="radio"
                      id="B"
                      className="mr-2"
                    />
                    <label htmlFor="B">{question.optionB}</label>
                  </div>
                  <div>
                    <input
                      name="answer"
                      value="C"
                      disabled
                      type="radio"
                      id="C"
                      className="mr-2"
                    />
                    <label htmlFor="C">{question.optionC}</label>
                  </div>
                  <div>
                    <input
                      name="answer"
                      value="D"
                      disabled
                      type="radio"
                      id="D"
                      className="mr-2"
                    />
                    <label htmlFor="D">{question.optionD}</label>
                  </div>
                </div>
              ) : (
                <input
                  className="md:w-3/4 shadow appearance-none border rounded w-full font-light  py-1 px-2 text-gray-700 leading-tight focus:outline-none"
                  name="answer"
                  placeholder="Enter an answer"
                  disabled
                  type="text"
                />
              )}
              <button
                type="button"
                className={`${
                  question.questionFormat === "Multiple Choice"
                    ? `mt-4 w-16`
                    : `ml-4 w-20`
                }  border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold text-center items-center justify-center flex`}
              >
                Submit
              </button>
            </div>
            {hint && hint !== "" && (
              <div className="focus:outline-none flex mx-auto mt-2 px-4 py-2 uppercase text-black tracking-wide hover:text-red-800 text-xs">
                <h3 className="font-semibold">Hint</h3>
                <h3 className="ml-2">{hint}</h3>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex mt-6">
        {module && module.questions.indexOf(question.id) !== 0 && (
          <button
            className="mx-auto focus:outline-none focus:ring rounded-sm"
            onClick={togglePrevOpen}
            type="button"
          >
            <BsChevronLeft size={32} />
          </button>
        )}

        {module &&
          module.questions.indexOf(question.id) + 1 !==
            module.questions.length && (
            <button
              className="mx-auto focus:outline-none focus:ring rounded-sm"
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
      </div>
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
