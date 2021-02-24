import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import AdminInputDropdown from "./AdminInputDropdown";
import CategoryInputDropdown from "./CategoryInputDropdown";
import ModuleInputDropdown from "./ModuleInputDropdown";
import QuestionInputDropdown from "./QuestionInputDropdown";

function EditBadge({
  props,
  badge: {
    id: badgeId,
    name: newName,
    adminId: newAdminId,
    moduleId: newModuleId,
    questionId: newQuestionId,
    categoryId: newCategoryId,
    points: newPoints,
    description: newDescription,
    image: newImage,
  },
}) {
  const [errors, setErrors] = useState({});
  console.log(newPoints);
  const { values, onChange, onSubmit } = useForm(editBadgeCallback, {
    badgeId: badgeId,
    newName: newName || "",
    newAdminId: newAdminId || "",
    newQuestionId: newQuestionId || "",
    newModuleId: newModuleId || "",
    newCategoryId: newCategoryId || "",
    newPoints: newPoints || 0,
    newDescription: newDescription || "",
    newImage: newImage || "",
  });

  const [editBadge, { loading }] = useMutation(EDIT_BADGE, {
    refetchQueries: [],
    update(proxy, { data: { editBadge: categoryData } }) {
      setErrors({});
      props.history.push("/adminDashboard");
    },
    onError(err) {
      console.log(values);
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function editBadgeCallback() {
    editBadge();
  }

  return badgeId ? (
    <form
      className="w-3/4 overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Badge</h6>
      <p className="text-sm font-light ">
        Modify {newName}'s name, admin, module, question, category, points,
        description, or image.
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
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Question
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <QuestionInputDropdown
                  errors={errors}
                  currentQuestionId={values.newQuestionId}
                  onChange={onChange}
                  questionType="newQuestionId"
                />
                {errors.newQuestionId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newQuestionId}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Module
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <ModuleInputDropdown
                  errors={errors}
                  currentModuleId={values.newModuleId}
                  onChange={onChange}
                  moduleType="newModuleId"
                />
                {errors.newModuleId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newModuleId}
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
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newCategoryId}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Points
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newPoints ? "border-red-500" : ""
                  }`}
                  name="newPoints"
                  placeholder=""
                  value={values.newPoints}
                  onChange={onChange}
                  error={errors.newPoints ? "true" : "false"}
                  type="number"
                />
                {errors.newPoints && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newPoints}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Image
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newImage ? "border-red-500" : ""
                  }`}
                  name="newImage"
                  placeholder=""
                  value={values.newImage}
                  onChange={onChange}
                  error={errors.newImage ? "true" : "false"}
                  type="text"
                />
                {errors.newImage && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newImage}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Description
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newDescription ? "border-red-500" : ""
                  }`}
                  name="newDescription"
                  placeholder=""
                  value={values.newDescription}
                  onChange={onChange}
                  error={errors.newDescription ? "true" : "false"}
                  type="text"
                />
                {errors.newDescription && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newDescription}
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

const EDIT_BADGE = gql`
  mutation editBadge(
    $badgeId: String!
    $newName: String
    $newAdminId: String
    $newCategoryId: String
    $newQuestionId: String
    $newModuleId: String
    $newPoints: Int
    $newDescription: String
    $newImage: String
  ) {
    editBadge(
      badgeId: $badgeId
      newName: $newName
      newAdminId: $newAdminId
      newModuleId: $newModuleId
      newQuestionId: $newQuestionId
      newCategoryId: $newCategoryId
      newPoints: $newPoints
      newDescription: $newDescription
      newImage: $newImage
    ) {
      id
      name
      adminId
      categoryId
      moduleId
      questionId
      points
      createdAt
      image
      description
    }
  }
`;

export default EditBadge;
