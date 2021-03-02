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

  const [editStudent, { loading }] = useMutation(EDIT_STUDENT, {
    update(_, { data: { editStudent: adminData } }) {
      setErrors({});
      console.log("done");
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
      console.log(values);

      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
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
      className="w-3/4 overflow-hidden flex flex-col mt-4"
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
              <td className="text-sm py-2 border-b border-gray-200">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Name
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none "
                  name="newName"
                  placeholder=""
                  value={values.newName}
                  onChange={onChange}
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Organization
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className="shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none "
                  name="newOrgName"
                  placeholder=""
                  value={values.newOrgName}
                  onChange={onChange}
                  type="text"
                />
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Email
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newEmail ? "border-red-500" : ""
                  }`}
                  name="newEmail"
                  placeholder=""
                  value={values.newEmail}
                  onChange={onChange}
                  error={errors.newEmail ? "true" : "false"}
                  type="text"
                />
                {errors.newEmail && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newEmail}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Password
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newPassword ? "border-red-500" : ""
                  }`}
                  name="newPassword"
                  placeholder=""
                  value={values.newPassword}
                  onChange={onChange}
                  error={errors.newPassword ? "true" : "false"}
                  type="password"
                />
                {errors.newPassword && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newPassword}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className="text-red-800 font-semibold uppercase tracking-wide ">
                  Confirm Password
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.confirmNewPassword ? "border-red-500" : ""
                  }`}
                  name="confirmNewPassword"
                  placeholder=""
                  value={values.confirmNewPassword}
                  onChange={onChange}
                  error={errors.confirmNewPassword ? "true" : "false"}
                  type="password"
                />
                {errors.confirmNewPassword && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.confirmNewPassword}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-1/6">
          <button
            type="submit"
            className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold w-full"
          >
            Save
          </button>
        </div>
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
