import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_STUDENTS } from "../../pages/admin/AdminUsers";
import { useForm } from "../../util/hooks";

export default function StudentCard({
  props,
  student,
  setIsOpen,
  handleStudentClick,
}) {
  const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(deleteStudentCallback, {
    studentId: student && student.id,
  });

  const [deleteStudent, { loading }] = useMutation(DELETE_STUDENT, {
    refetchQueries: [
      {
        query: GET_STUDENTS,
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

  function deleteStudentCallback() {
    deleteStudent();
  }

  return student ? (
    <div>
      <div className="bg-white h-full focus:outline-none flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 justify-center">
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {student.name}
        </p>
        <p className=" text-gray-700  text-md ">{student.orgName}</p>
        <p className=" text-gray-700 font-thin text-sm leading-tight mx-2">
          {student.email}
        </p>
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center mt-2"
        >
          <button
            className="mr-4 focus:outline-none"
            type="button"
            // have to toggle the pop up and only get the entire popup field to show
            onClick={(e) => {
              setIsOpen(true);
              handleStudentClick(student.id);
              props.history.push(`/adminUsers/${student.id}`);
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
const DELETE_STUDENT = gql`
  mutation deleteStudent($studentId: String!) {
    deleteStudent(studentId: $studentId)
  }
`;
