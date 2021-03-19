import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";

function EditAdmin({
  props,
  admin: { id: adminId, name: newName, email: newEmail },
}) {
  var confirmNewPassword = "";
  var newPassword = "";
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(editAdminCallback, {
    adminId,
    newEmail: newEmail || "",
    newName: newName || "",
    newPassword: newPassword || "",
    confirmNewPassword: confirmNewPassword || "",
  });

  const [editAdmin] = useMutation(EDIT_ADMIN, {
    update(_, { data: { editAdmin: adminData } }) {
      setErrors({});
      values.confirmNewPassword = "";
      values.newPassword = "";
    },
    onError(err) {
      // console.log(values);

      // console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function editAdminCallback() {
    editAdmin();
  }

  return adminId ? (
    <form
      className="w-full overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-3xl mb-1">Edit Admin</h6>
      <p className="font-light text-lg ">Modify name, email, or password.</p>

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
              <td className="text-red-800 text-md lg:text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Name
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light  focus:outline-none focus:ring   ${
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
              <td className="text-red-800 text-md lg:text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Email
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light  focus:outline-none focus:ring   ${
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
              <td className="text-red-800 text-md lg:text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Password
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light  focus:outline-none focus:ring   ${
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
              <td className="text-red-800 text-md lg:text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Confirm Password
                </label>
              </td>
              <td className="text-md lg:text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light  focus:outline-none focus:ring   ${
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
        <div className="text-right md:text-sm mx-auto mt-4 flex w-1/4 md:w-1/6">
          <button
            type="submit"
            className="flex focus:outline-none focus:ring border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold w-full"
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
const EDIT_ADMIN = gql`
  mutation editAdmin(
    $adminId: String!
    $newEmail: String
    $newPassword: String
    $confirmNewPassword: String
    $newName: String
  ) {
    editAdmin(
      adminId: $adminId
      newEmail: $newEmail
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
      newName: $newName
    ) {
      id
      email
      name
      createdAt
      token
    }
  }
`;

export default EditAdmin;
