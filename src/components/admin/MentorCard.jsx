import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_MENTORS } from "../../pages/admin/AdminUsers";
import { useForm } from "../../util/hooks";

export default function MentorCard({
  props,
  mentor,
  setIsMentorOpen,
  handleMentorClick,
}) {
  const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(deleteMentorCallback, {
    mentorId: mentor && mentor.id,
  });

  const [deleteMentor, { loading }] = useMutation(DELETE_MENTOR, {
    refetchQueries: [
      {
        query: GET_MENTORS,
      },
    ],
    update() {
      setErrors({});
    },
    onError(err) {
      console.log(values);
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function deleteMentorCallback() {
    deleteMentor();
  }

  return mentor ? (
    <div>
      <div className="bg-white h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center">
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {mentor.name}
        </p>
        <p className=" text-gray-700 font-thin text-sm leading-tight mx-2">
          {mentor.email}
        </p>
        <p className=" text-gray-700  text-md ">{mentor.orgName}</p>
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="mr-4 focus:outline-none"
            type="button"
            // have to toggle the pop up and only get edit field to show
            onClick={(e) => {
              console.log("inhere");
              setIsMentorOpen(true);
              handleMentorClick(mentor.id);
              props.history.push(`/adminUsers/${mentor.id}`);
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
const DELETE_MENTOR = gql`
  mutation deleteMentor($mentorId: String!) {
    deleteMentor(mentorId: $mentorId)
  }
`;
