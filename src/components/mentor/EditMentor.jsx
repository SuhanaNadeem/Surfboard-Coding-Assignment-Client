import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_MENTOR_BY_ID } from "../../pages/admin/AdminUsers";
import { useForm } from "../../util/hooks";
import LoadingIcon from "../../images/tempModuleCardImg.PNG";

function EditMentor({
  props,
  mentor: { id: mentorId, name: newName, email: newEmail, orgName: newOrgName },
}) {
  var confirmNewPassword = "";
  var newPassword = "";

  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(editMentorCallback, {
    mentorId,
    newEmail: newEmail || "",
    newName: newName || "",
    newOrgName: newOrgName || "",

    newPassword: newPassword || "",
    confirmNewPassword: confirmNewPassword || "",
  });

  const [editMentor, { loading }] = useMutation(EDIT_MENTOR, {
    update(_, { data: { editMentor: adminData } }) {
      setErrors({});
      console.log("done");
      values.confirmNewPassword = "";
      values.newPassword = "";
    },
    refetchQueries: [
      {
        query: GET_MENTOR_BY_ID,
        variables: { mentorId },
      },
    ],
    onError(err) {
      console.log(values);

      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: mentorClient,
  });

  function editMentorCallback() {
    editMentor();
  }

  return mentorId ? (
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
              <td className="text-sm w-full truncate pr-3 py-2 border-b border-gray-200">
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
                  <p className="text-red-800 font-light">
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
                  <p className="text-red-800 font-light">
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
                  <p className="text-red-800 font-light">
                    <b>&#33;</b> {errors.confirmNewPassword}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-1/4 md:w-1/6">
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
    <div className="h-full flex flex-col min-h-screen w-full items-center justify-center">
      <div className="uppercase font-light text-lg flex flex-col w-full justify-center items-center">
        {/* <p>loading...</p> */}
        <img
          src={LoadingIcon}
          className="rounded-lg object-contain w-full h-32 p-2"
        />
      </div>
    </div>
  );
}
const EDIT_MENTOR = gql`
  mutation editMentor(
    $mentorId: String!
    $newEmail: String
    $newPassword: String
    $confirmNewPassword: String
    $newName: String
    $newOrgName: String
  ) {
    editMentor(
      mentorId: $mentorId

      newEmail: $newEmail
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
      newName: $newName
      newOrgName: $newOrgName
    ) {
      id
      email
      name
      orgName
      createdAt
      token
    }
  }
`;

export default EditMentor;
