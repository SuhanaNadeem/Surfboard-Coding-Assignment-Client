import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "../../util/hooks";

import { adminClient } from "../../GraphqlApolloClients";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
import { IoMdTrash } from "react-icons/io";
export default function DeleteModule({ moduleId }) {
  const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(deleteModuleCallback, {
    moduleId,
  });

  const [deleteModule, { loading }] = useMutation(DELETE_MODULE, {
    refetchQueries: [],
    update() {
      values.confirmTitle = "";
      setErrors({});
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

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">
        <IoMdTrash size={16} />
      </button>
    </form>
  );
}
export const GET_CATEGORY_BY_ID = gql`
  query getCategoryById($categoryId: String!) {
    getCategoryById(categoryId: $categoryId) {
      id
      name
      createdAt
      adminId
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
