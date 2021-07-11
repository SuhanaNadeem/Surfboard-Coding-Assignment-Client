import { gql, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";

export default function CategoryCard({ props, category, created }) {
  const { admin } = useContext(AdminAuthContext);

  const { values, onSubmit } = useForm(deleteCategoryCallback, {
    categoryId: category.id,
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
      },
      {
        query: GET_CATEGORIES_BY_ADMIN,
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

  function deleteCategoryCallback() {
    deleteCategory();
  }

  return category ? (
    <div>
      <div
        className={`
          ${created ? `bg-gray-100` : `bg-white`}
              h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48  ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`}
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md truncate w-40">
          {category.name}
        </p>
        {/* <p className=" text-gray-700 font-semibold text-md leading-tight">
        {category.id}
      </p>
      <p className=" text-gray-700 font-thin text-sm">{category.createdAt} </p> */}
        <img
          src="https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"
          alt="LYNX Logo"
          className="object-contain w-full h-32 rounded-lg overflow-hidden m-2"
        />

        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="focus:outline-none"
            type="button"
            onClick={(e) => {
              props.history.push(`/adminEditAndPreview/${category.id}`);
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
const DELETE_CATEGORY = gql`
  mutation deleteCategory($categoryId: String!) {
    deleteCategory(categoryId: $categoryId) {
      name
      id
      createdAt
    }
  }
`;
