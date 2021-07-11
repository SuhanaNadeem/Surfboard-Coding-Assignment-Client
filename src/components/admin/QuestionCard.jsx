import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_QUESTIONS,
  GET_QUESTIONS_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";

export default function QuestionCard({ props, question, created }) {
  const { admin } = useContext(AdminAuthContext);

  const { data: { getModuleById: module } = {} } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: question.moduleId },
    client: adminClient,
  });

  const { values, onSubmit } = useForm(deleteQuestionCallback, {
    questionId: question.id,
  });

  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [
      {
        query: GET_QUESTIONS,
      },
      {
        query: GET_QUESTIONS_BY_ADMIN,
        variables: { adminId: admin && admin.id },
      },
    ],
    // update() {
    //   setErrors({});
    // },
    // onError(err) {
    //   // console.log(values);
    //   // console.log(err);
    //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    // },
    variables: values,
    client: adminClient,
  });

  function deleteQuestionCallback() {
    deleteQuestion();
  }

  return module && question ? (
    <div>
      <div
        className={
          created
            ? `bg-gray-100 h-full flex-shrink-0 first:ml-2 shadow w-48  ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
            : `bg-white h-full flex-shrink-0 first:ml-2 shadow w-48  ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
        }
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-40 truncate">
          {question.name}
        </p>
        <p className=" text-gray-700 font-semibold text-md leading-tight w-40 truncate">
          {module.name}
        </p>
        <img
          alt="Question Icon"
          src={
            question.image && question.image !== ""
              ? question.image
              : "https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"
          }
          className={`${
            question.image && question.image !== ""
              ? `object-cover`
              : `object-contain`
          } w-full h-32 rounded-lg overflow-hidden m-2`}
        />
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="focus:outline-none"
            type="button"
            onClick={(e) => {
              props.history.push(`/adminEditAndPreview/${question.id}`);
            }}
          >
            <FaEdit size={16} />
          </button>
          {admin.id === "TOGCUQ996G" && (
            <button type="submit" className="ml-4 focus:outline-none">
              <IoMdTrash size={16} />
            </button>
          )}
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
export const GET_MODULE_BY_ID = gql`
  query getModuleById($moduleId: String!) {
    getModuleById(moduleId: $moduleId) {
      id
      name
      categoryId
      adminId
      questions
      image
      learningObjectives
      createdAt
      released
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation deleteQuestion($questionId: String!) {
    deleteQuestion(questionId: $questionId) {
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
      createdAt
      optionA
      optionB
      optionC
      optionD
      extraLink
    }
  }
`;
