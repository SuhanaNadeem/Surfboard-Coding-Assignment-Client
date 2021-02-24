import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { useForm } from "../../util/hooks";

import { adminClient } from "../../GraphqlApolloClients";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
import { IoMdTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import {
  GET_MODULES,
  GET_MODULES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { AdminAuthContext } from "../../context/adminAuth";

export default function ModuleCard({ props, module, created }) {
  const { admin } = useContext(AdminAuthContext);

  const [errors, setErrors] = useState({});

  const {
    data: { getCategoryById: category } = {},
    loading: loadingCategory,
    error,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { categoryId: module.categoryId },
    client: adminClient,
  });

  const { values, onSubmit } = useForm(deleteModuleCallback, {
    moduleId: module.id,
  });

  const [deleteModule, { loading }] = useMutation(DELETE_MODULE, {
    refetchQueries: [
      {
        query: GET_MODULES,
      },
      {
        query: GET_MODULES_BY_ADMIN,
        variables: { adminId: admin.id },
      },
    ],
    update() {
      values.confirmTitle = "";
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

  function deleteModuleCallback() {
    deleteModule();
  }

  return category && module ? (
    <div onSubmit={onSubmit}>
      <div
        className={
          created
            ? `bg-gray-100 h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-200 justify-center`
            : `bg-white h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
        }
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {module.name}
        </p>
        <p className=" text-gray-700 font-semibold text-md leading-tight">
          {category.name}
        </p>
        <p className=" text-gray-700 font-thin text-sm mr-2">
          {module.questions.length} Questions
        </p>
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="mr-4 focus:outline-none"
            type="button"
            onClick={(e) => {
              props.history.push(`/adminEditAndPreview/${module.id}`);
            }}
          >
            <FaEdit size={16} />
          </button>
          <button type="submit" className="focus:outline-none">
            <IoMdTrash size={16} />
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
export const GET_CATEGORY_BY_ID = gql`
  query getCategoryById($categoryId: String!) {
    getCategoryById(categoryId: $categoryId) {
      id
      name
    }
  }
`;

const DELETE_MODULE = gql`
  mutation deleteModule($moduleId: String!) {
    deleteModule(moduleId: $moduleId) {
      id
      name
      comments
      questions
      categoryId
      createdAt
    }
  }
`;
