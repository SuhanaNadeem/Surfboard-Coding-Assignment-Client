import React, { useState } from "react";
import tempSvg from "../../images/tempSvg.svg";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useForm } from "../../util/hooks";
import { GET_STUDENTS_BY_MENTOR } from "../admin/Students";
import { GET_STUDENTS_BY_ORG_NAME } from "./DashboardStudents";
import { mentorClient } from "../../GraphqlApolloClients";
import { gql, useMutation } from "@apollo/client";
export default function RemoveStudent({ mentor, student }) {
  const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(removeMentorCallback, {
    studentId: student.id,
    mentorId: mentor.id,
  });

  const [removeMentor, { loading }] = useMutation(REMOVE_MENTOR, {
    refetchQueries: [
      {
        query: GET_STUDENTS_BY_ORG_NAME,
        variables: { orgName: mentor.orgName },
      },
      {
        query: GET_STUDENTS_BY_MENTOR,
        variables: { mentorId: mentor.id },
      },
    ],
    update() {
      setErrors({});
    },
    onError(err) {
      console.log(values);
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: mentorClient,
  });

  function removeMentorCallback() {
    removeMentor();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <button
        type="submit"
        className="flex items-center justify-center focus:outline-none hover:text-red-800"
      >
        <p className="font-semibold">Remove</p>
        <IoMdRemoveCircleOutline size={16} className="ml-1" />
      </button>
    </form>
  );
}

const REMOVE_MENTOR = gql`
  mutation removeMentor($mentorId: String!, $studentId: String!) {
    removeMentor(mentorId: $mentorId, studentId: $studentId)
  }
`;