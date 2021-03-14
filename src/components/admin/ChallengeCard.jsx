import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_CHALLENGES,
  GET_CHALLENGES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";

export default function ChallengeCard({ props, challenge, created }) {
  const { admin } = useContext(AdminAuthContext);

  const { data: { getCategoryById: category } = {} } = useQuery(
    GET_CATEGORY_BY_ID,
    {
      variables: { categoryId: challenge.categoryId },
      client: adminClient,
    }
  );

  const { values, onSubmit } = useForm(deleteChallengeCallback, {
    challengeId: challenge.id,
  });

  const [deleteChallenge] = useMutation(DELETE_CHALLENGE, {
    refetchQueries: [
      {
        query: GET_CHALLENGES,
      },
      {
        query: GET_CHALLENGES_BY_ADMIN,
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

  function deleteChallengeCallback() {
    deleteChallenge();
  }

  return category && challenge ? (
    <div>
      <div
        className={
          created
            ? `bg-gray-100 h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
            : `bg-white h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
        }
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-36 truncate">
          {challenge.name}
        </p>
        <p className=" text-gray-700 font-semibold text-md leading-tight">
          {category.name}
        </p>
        <img
          alt="Challenge icon"
          src={
            challenge.image && challenge.image !== ""
              ? challenge.image
              : "https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"
          }
          className={`${
            challenge.image && challenge.image !== ""
              ? `object-cover`
              : `object-contain`
          } w-full h-32 rounded-lg overflow-hidden m-2`}
        />
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="mr-4 focus:outline-none"
            type="button"
            onClick={(e) => {
              props.history.push(`/adminEditAndPreview/${challenge.id}`);
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
      createdAt
      adminId
    }
  }
`;
const DELETE_CHALLENGE = gql`
  mutation deleteChallenge($challengeId: String!) {
    deleteChallenge(challengeId: $challengeId) {
      id
      name
      challengeDescription
      createdAt
    }
  }
`;
