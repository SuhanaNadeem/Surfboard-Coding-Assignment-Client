import React, { useState } from "react";
import tempSvg from "../../images/tempSvg.svg";
import { AiOutlineFundView, AiOutlineUserAdd } from "react-icons/ai";
import { useForm } from "../../util/hooks";
import { GET_STUDENTS_BY_MENTOR } from "../admin/Students";
import { GET_STUDENTS_BY_ORG_NAME } from "./DashboardStudents";
import { mentorClient } from "../../GraphqlApolloClients";
import { gql, useMutation } from "@apollo/client";
export default function AddStudent({ mentor, student }) {
  const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(addMentorCallback, {
    studentId: student.id,
    mentorId: mentor.id,
  });

  const [addMentor, { loading }] = useMutation(ADD_MENTOR, {
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

  function addMentorCallback() {
    addMentor();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <button
        type="submit"
        className="flex items-center justify-center focus:outline-none hover:text-red-800"
      >
        <p className="font-semibold">Add</p>
        <AiOutlineUserAdd size={20} className="ml-1" />
      </button>
    </form>
  );
}

const ADD_MENTOR = gql`
  mutation addMentor($mentorId: String!, $studentId: String!) {
    addMentor(mentorId: $mentorId, studentId: $studentId)
  }
`;