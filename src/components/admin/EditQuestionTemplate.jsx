import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import AdminInputDropdown from "./AdminInputDropdown";
import CategoryInputDropdown from "./CategoryInputDropdown";

function EditQuestionTemplate({
  questionTemplate: {
    id: questionTemplateId,
    name: newName,
    categoryId: newCategoryId,
    inputFields: newInputFields,
    adminId: newAdminId,
  },
}) {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(editQuestionTemplateCallback, {
    questionTemplateId,
    newName: newName || "",
    newCategoryId: newCategoryId || "",
    newInputFields: newInputFields || [],
    newAdminId: newAdminId || "",
  });

  const [editQuestionTemplate] = useMutation(EDIT_QUESTION_TEMPLATE, {
    refetchQueries: [],
    update(proxy, { data: { editQuestionTemplate: questionTemplateData } }) {
      setErrors({});
    },
    onError(err) {
      // console.log(values);
      // console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function editQuestionTemplateCallback() {
    editQuestionTemplate();
  }

  return questionTemplateId ? (
    <form
      className="w-full overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Question</h6>
      <p className="text-sm font-normal lg:font-light ">
        Modify {newName}'s name, description, image, points, module, type,
        video, admin, article, expected answer, or hint.
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
                  <p className="text-red-800 font-normal lg:font-light">
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
                  categoryType="newCategoryId"
                />
                {errors.newCategoryId && (
                  <p className="text-red-800 font-normal lg:font-light">
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
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.newName ? "border-red-800" : ""
                  }`}
                  name="newName"
                  placeholder=""
                  value={values.newName}
                  onChange={onChange}
                  error={errors.newName ? "true" : "false"}
                  type="text"
                />
                {errors.newName && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newName}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Input Fields
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.newInputFields ? "border-red-800" : ""
                  }`}
                  name="newInputFields"
                  placeholder=""
                  value={values.newInputFields}
                  onChange={onChange}
                  error={errors.newInputFields ? "true" : "false"}
                  type="text"
                />
                {errors.newInputFields && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newInputFields}
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {values.newInputFields.map((inputField, index) => (
          <p key={index}>
            {inputField} and
            {values.newInputFields[values.newInputFields.indexOf(inputField)]}
          </p>
        ))}
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-1/4 md:w-1/6">
          <button
            type="submit"
            className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold w-full"
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

const EDIT_QUESTION_TEMPLATE = gql`
  mutation editQuestionTemplate(
    $questionTemplateId: String!
    $newName: String
    $newCategoryId: String
    $newInputFields: [String]
    $newAdminId: String
  ) {
    editQuestionTemplate(
      questionTemplateId: $questionTemplateId
      newInputFields: $newInputFields
      newCategoryId: $newCategoryId
      newName: $newName
      newAdminId: $newAdminId
    ) {
      id
      inputFields
      createdAt
      name
      adminId
      categoryId
    }
  }
`;

export default EditQuestionTemplate;
