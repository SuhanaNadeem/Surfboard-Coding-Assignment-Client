import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";

function EditModule({
  module: {
    id: moduleId,
    categoryId: newCategoryId,
    name: newName,
    adminId: newAdminId,
  },
}) {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(editModuleCallback, {
    moduleId,
    newCategoryId,
    newName,
    newAdminId,
  });

  const [editModule, { loading }] = useMutation(EDIT_MODULE, {
    refetchQueries: [],
    update(proxy, { data: { editModule: moduleData } }) {
      values.confirmTitle = "";
      setErrors({});
    },
    onError(err) {
      console.log(values);
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function editModuleCallback() {
    editModule();
  }

  return module ? (
    <form
      className="mx-auto max-w-lg my-2 px-3 py-4 bg-white"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-5/6">
          <h6 className="text-xl text-red-800 leading-none">Edit Module</h6>
          <p className="tracking-wider text-sm font-light ">
            Modify {newName}'s name, category, and admin.
          </p>
        </div>
        <div className="text-right md:text-sm w-1/6 my-2 flex focus:outline-none">
          <button
            type="submit"
            className="flex border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold "
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="w-1/3 md:px-6 px-2 py-1 border-b border-gray-200"></th>
              <th className="md:px-6 px-2 py-1 border-b border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xs py-2 border-b border-gray-200">
                <label className=" font-semibold text-xs uppercase tracking-wide ">
                  Admin Id
                </label>
              </td>
              <td className="text-xs py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newAdminId ? "border-red-500" : ""
                  }`}
                  name="newAdminId"
                  placeholder=""
                  value={values.newAdminId}
                  onChange={onChange}
                  error={errors.newAdminId ? "true" : "false"}
                  type="text"
                />
                {errors.newAdminId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newAdminId}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-xs py-2 border-b border-gray-200">
                <label className=" font-semibold text-xs uppercase tracking-wide ">
                  Category Id
                </label>
              </td>
              <td className="text-xs py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newCategoryId ? "border-red-500" : ""
                  }`}
                  name="newCategoryId"
                  placeholder=""
                  value={values.newCategoryId}
                  onChange={onChange}
                  error={errors.newCategoryId ? "true" : "false"}
                  type="text"
                />
                {errors.newCategoryId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newCategoryId}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-xs py-2 border-b border-gray-200">
                <label className=" font-semibold text-xs uppercase tracking-wide ">
                  Name
                </label>
              </td>
              <td className="text-xs py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newName ? "border-red-500" : ""
                  }`}
                  name="newName"
                  placeholder=""
                  value={values.newName}
                  onChange={onChange}
                  error={errors.newName ? "true" : "false"}
                  type="text"
                />
                {errors.newName && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newName}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  ) : (
    <></>
  );
}

const EDIT_MODULE = gql`
  mutation editModule(
    $moduleId: String!
    $newCategoryId: String
    $newName: String
    $newAdminId: String
  ) {
    editModule(
      newCategoryId: $newCategoryId
      moduleId: $moduleId
      newName: $newName
      newAdminId: $newAdminId
    ) {
      id
      name
      categoryId
      adminId
      questions
      learningObjectives
      createdAt
    }
  }
`;

export default EditModule;
