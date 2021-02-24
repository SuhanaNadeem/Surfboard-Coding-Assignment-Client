import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { useForm } from "../../util/hooks";
import { adminClient } from "../../GraphqlApolloClients";
import { AdminAuthContext } from "../../context/adminAuth";
import {
  GET_QUESTIONS,
  GET_QUESTIONS_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
export default function QuestionCard({ props, question, created }) {
  const { admin } = useContext(AdminAuthContext);

  const [errors, setErrors] = useState({});

  const {
    data: { getModuleById: module } = {},
    loading: loadingModule,
    error,
  } = useQuery(GET_MODULE_BY_ID, {
    variables: { moduleId: question.moduleId },
    client: adminClient,
  });

  const { values, onSubmit } = useForm(deleteQuestionCallback, {
    questionId: question.id,
  });

  const [deleteQuestion, { loading }] = useMutation(DELETE_QUESTION, {
    refetchQueries: [
      {
        query: GET_QUESTIONS,
      },
      {
        query: GET_QUESTIONS_BY_ADMIN,
        variables: { adminId: admin.id },
      },
    ],
    update() {
      setErrors({});
      console.log(values);
    },
    onError(err) {
      console.log(values);
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
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
            ? `bg-gray-100 h-full flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-200 justify-center`
            : `bg-white h-full flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
        }
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {question.name}
        </p>
        <p className=" text-gray-700 font-semibold text-md leading-tight">
          {module.name}
        </p>

        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="mr-4 focus:outline-none"
            type="button"
            onClick={(e) => {
              props.history.push(`/adminEditAndPreview/${question.id}`);
            }}
          >
            <FaEdit size={16} />
          </button>
          <button type="submit" className="focus:outline-none">
            <IoMdTrash size={16} />
          </button>
        </form>

        {/* <p className=" text-gray-700 font-thin text-sm">Additional Info </p> */}
        {/* <img
          src={tempModuleCardImg}
          className="rounded-lg object-contain w-full h-32 p-2"
        /> */}
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
      learningObjectives
      createdAt
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
