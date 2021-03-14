import { gql, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_BADGES,
  GET_BADGES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";

export default function BadgeCard({ props, badge, created }) {
  const { admin } = useContext(AdminAuthContext);

  // const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(deleteBadgeCallback, {
    badgeId: badge.id,
  });

  const [deleteBadge] = useMutation(DELETE_BADGE, {
    refetchQueries: [
      {
        query: GET_BADGES,
      },
      {
        query: GET_BADGES_BY_ADMIN,
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

  function deleteBadgeCallback() {
    deleteBadge();
  }

  return badge ? (
    <div>
      <div
        className={
          created
            ? `bg-gray-100 h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
            : `bg-white h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center`
        }
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-40 truncate">
          {badge.name}
        </p>
        {/* <p className=" text-gray-700 font-semibold text-md leading-tight">
        {badge.id}
      </p> */}
        {/* <p className=" text-gray-700 font-thin text-sm">{badge.createdAt} </p> */}
        <img
          alt="Badge Icon"
          src={
            badge.image && badge.image !== ""
              ? badge.image
              : "https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"
          }
          className="object-contain w-full h-32 rounded-lg overflow-hidden m-2"
        />
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="mr-4 focus:outline-none"
            type="button"
            onClick={(e) => {
              props.history.push(`/adminEditAndPreview/${badge.id}`);
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
    <></>
  );
}

const DELETE_BADGE = gql`
  mutation deleteBadge($badgeId: String!) {
    deleteBadge(badgeId: $badgeId) {
      name
      id
      createdAt
      description
      adminId
      points
      moduleId
      categoryId
      questionId
      image
    }
  }
`;
