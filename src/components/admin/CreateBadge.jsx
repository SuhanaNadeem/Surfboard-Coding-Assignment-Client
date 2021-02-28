import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_QUESTIONS,
  GET_QUESTIONS_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";
import CategoryInputDropdown from "./CategoryInputDropdown";
import ImageUploadBox from "./ImageUploadBox";
import ModuleInputDropdown from "./ModuleInputDropdown";
import QuestionInputDropdown from "./QuestionInputDropdown";

function CreateBadge({ admin, props }) {
  const [errors, setErrors] = useState({});
  var moduleId = "";
  var description = "";
  var questionId = "";
  var points = 0;
  var categoryId = "";
  var name = "";

  const { values, onChange, onSubmit, setValues } = useForm(
    createNewBadgeCallback,
    {
      name: name || "",
      imageFile: null,
      description: description || "",
      moduleId: moduleId || "",
      categoryId: categoryId || "",
      questionId: questionId || "",
      points: points || 0,
    }
  );

  const [createNewBadge, { loading }] = useMutation(CREATE_NEW_BADGE, {
    refetchQueries: [
      {
        query: GET_QUESTIONS,
      },
      {
        query: GET_QUESTIONS_BY_ADMIN,
        variables: { adminId: admin.id },
      },
    ],
    update() {
      setErrors({});
      values.imageFile = null;
      values.moduleId = "";
      values.description = "";
      values.categoryId = "";
      values.questionId = "";
      values.points = 0;
      values.name = "";
    },
    onError(err) {
      console.log(values);
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function createNewBadgeCallback() {
    createNewBadge();
  }

  const setImagePreview = (imageTempUrl, imageName, imageFile) => {
    setPreviewImages({
      ...previewImages,
      [imageName]: imageTempUrl,
    });
    // bannerLogoFile;

    if (imageFile) {
      setValues({
        ...values,
        [imageName + "File"]: imageFile,
      });
    }
  };
  const [previewImages, setPreviewImages] = useState({
    image: "",
  });

  return (
    <form
      className="w-3/4 overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Create a Badge</h6>
      <p className="text-sm font-light ">
        Create a new badge by entering a name, description, points allocation,
        category, question, module, and image.
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
                  Name
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  name="name"
                  placeholder=""
                  value={values.name}
                  onChange={onChange}
                  error={errors.name ? "true" : "false"}
                  type="text"
                />
                {errors.name && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.name}
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
                  currentCategoryId={values.categoryId}
                  onChange={onChange}
                  categoryType="categoryId"
                />
                {errors.categoryId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.categoryId}
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
                  currentQuestionId={values.questionId}
                  onChange={onChange}
                  questionType="questionId"
                />
                {errors.questionId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.questionId}
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
                  currentModuleId={values.moduleId}
                  onChange={onChange}
                  moduleType="moduleId"
                />
                {errors.moduleId && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.moduleId}
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
                    errors.description ? "border-red-500" : ""
                  }`}
                  name="description"
                  placeholder=""
                  value={values.description}
                  onChange={onChange}
                  error={errors.description ? "true" : "false"}
                  type="text"
                />
                {errors.description && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.description}
                  </p>
                )}
              </td>
            </tr>
            {/* <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Image
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.image ? "border-red-500" : ""
                  }`}
                  name="image"
                  placeholder=""
                  value={values.image}
                  onChange={onChange}
                  error={errors.image ? "true" : "false"}
                  type="text"
                />
                {errors.image && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.image}
                  </p>
                )}
              </td>
            </tr>
 */}
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className="font-semibold uppercase tracking-wide ">
                  Points
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.points ? "border-red-500" : ""
                  }`}
                  name="points"
                  placeholder=""
                  value={values.points}
                  onChange={onChange}
                  error={errors.points ? "true" : "false"}
                  type="number"
                />
                {errors.points && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.points}
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
                <ImageUploadBox
                  setImagePreviewCallback={setImagePreview}
                  imageName="image"
                  previewImages={previewImages}
                  setErrorsCallback={setErrors}
                  errors={errors}
                />

                {/* <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.image ? "border-red-500" : ""
                  }`}
                  name="image"
                  placeholder=""
                  value={values.image}
                  onChange={onChange}
                  error={errors.image ? "true" : "false"}
                  type="text"
                />
                 */}
                {errors.imageFile && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.imageFile}
                  </p>
                )}
                {previewImages.image && (
                  <div className="h-20 w-full">
                    <img
                      className="h-full w-full object-contain rounded mt-2"
                      alt=""
                      src={`${previewImages.image}`}
                    />
                  </div>
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
  );
}

const CREATE_NEW_BADGE = gql`
  mutation createNewBadge(
    $name: String!
    $imageFile: Upload
    $description: String!
    $moduleId: String
    $categoryId: String
    $questionId: String
    $points: Int
  ) {
    createNewBadge(
      name: $name
      imageFile: $imageFile
      description: $description
      moduleId: $moduleId
      categoryId: $categoryId
      questionId: $questionId
      points: $points
    ) {
      id
      name
      image
      description
      moduleId
      categoryId
      questionId
      points
      adminId
      createdAt
    }
  }
`;

export default CreateBadge;
