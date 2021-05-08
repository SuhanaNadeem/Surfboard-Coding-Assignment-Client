import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { studentClient } from "../../GraphqlApolloClients";
import { GET_STUDENTS } from "../../pages/admin/AdminUsers";
import { useForm } from "../../util/hooks";
import { GET_STUDENT_BY_ID } from "../student/ModuleSummaryBar";

function EditStudent({
  props,
  student: {
    id: studentId,
    name: newName,
    email: newEmail,
    orgName: newOrgName,
  },
}) {
  var confirmNewPassword = "";
  var newPassword = "";

  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(editStudentCallback, {
    studentId,
    newEmail: newEmail || "",
    newName: newName || "",
    newOrgName: newOrgName || "",

    newPassword: newPassword || "",
    confirmNewPassword: confirmNewPassword || "",
  });

  const [editStudent, { loading: loadingStudent }] = useMutation(EDIT_STUDENT, {
    update(_, { data: { editStudent: adminData } }) {
      setErrors({});
      // console.log("done");
      values.confirmNewPassword = "";
      values.newPassword = "";
    },
    refetchQueries: [
      {
        query: GET_STUDENTS,
      },
      {
        query: GET_STUDENT_BY_ID,
        variables: { studentId },
      },
    ],
    onError(err) {
      // console.log(values);

      // console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: studentClient,
  });

  function editStudentCallback() {
    editStudent();
  }

  return studentId ? (
    <form
      className="w-full overflow-hidden flex flex-col mt-4"
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-3xl mb-1">Edit Account</h6>
      <p className="font-light text-lg">
        Modify name, email, organization, or password.
      </p>

      <div className="flex flex-col mt-2">
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="w-1/3 md:px-6 px-2 py-1 border-b border-gray-200"></th>
              <th className="md:px-6 px-2 py-1 border-b border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Name
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none focus-ring   ${
                    errors.newName ? "border-red-800" : ""
                  }`}
                  name="newName"
                  placeholder=""
                  value={values.newName}
                  onChange={onChange}
                  type="text"
                />
                {errors.newName && (
                  <p className="font-light text-red-800">
                    <b>&#33;</b> {errors.newName}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Organization
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none focus-ring   ${
                    errors.newOrgName ? "border-red-800" : ""
                  }`}
                  name="newOrgName"
                  placeholder=""
                  value={values.newOrgName}
                  onChange={onChange}
                  type="text"
                />
                {errors.newOrgName && (
                  <p className="font-light text-red-800">
                    <b>&#33;</b> {errors.newOrgName}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Email
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none focus-ring   ${
                    errors.newEmail ? "border-red-800" : ""
                  }`}
                  name="newEmail"
                  placeholder=""
                  value={values.newEmail}
                  onChange={onChange}
                  error={errors.newEmail ? "true" : "false"}
                  type="text"
                />
                {errors.newEmail && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newEmail}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Password
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none focus-ring   ${
                    errors.newPassword ? "border-red-800" : ""
                  }`}
                  name="newPassword"
                  placeholder=""
                  value={values.newPassword}
                  onChange={onChange}
                  error={errors.newPassword ? "true" : "false"}
                  type="password"
                />
                {errors.newPassword && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newPassword}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Confirm Password
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200 w-full pr-2 truncate">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none focus-ring   ${
                    errors.confirmNewPassword ? "border-red-800" : ""
                  }`}
                  name="confirmNewPassword"
                  placeholder=""
                  value={values.confirmNewPassword}
                  onChange={onChange}
                  error={errors.confirmNewPassword ? "true" : "false"}
                  type="password"
                />
                {errors.confirmNewPassword && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.confirmNewPassword}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {loadingStudent ? (
          <div className="mt-4 py-2 flex h-10 mx-auto">
            <svg
              className={`fill-current animate-spin h-4 text-red-800`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="text-right md:text-sm mx-auto mt-4 flex w-1/4 md:w-1/6">
            <button
              type="submit"
              className="flex w-16 focus:outline-none focus-ring border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold md:w-full"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </form>
  ) : (
    <></>
  );
}
const EDIT_STUDENT = gql`
  mutation editStudent(
    $studentId: String!
    $newEmail: String
    $newPassword: String
    $confirmNewPassword: String
    $newName: String
    $newOrgName: String
  ) {
    editStudent(
      studentId: $studentId

      newEmail: $newEmail
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
      newName: $newName
      newOrgName: $newOrgName
    ) {
      id
      email
      name
      createdAt
      token
    }
  }
`;

export default EditStudent;
