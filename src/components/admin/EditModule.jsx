import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import AdminInputDropdown from "./AdminInputDropdown";
import CategoryInputDropdown from "./CategoryInputDropdown";

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
      className="mx-auto w-1/3 overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Module</h6>
      <p className="text-sm font-light ">
        Modify {newName}'s name, category, and admin.
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
                <label className=" font-semibold uppercase tracking-wide ">
                  Admin
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <AdminInputDropdown
                  errors={errors}
                  currentAdminId={values.newAdminId}
                  onChange={onChange}
                />
                {errors.newAdminId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newAdminId}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Category
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <CategoryInputDropdown
                  errors={errors}
                  currentCategoryId={values.newCategoryId}
                  onChange={onChange}
                />
                {errors.newCategoryId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newCategoryId}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Name
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
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
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none">
          <button
            type="submit"
            className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm font-semibold "
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
