import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_QUESTION_TEMPLATE_BY_ID } from "../../pages/admin/AdminEditAndPreview";
import { useForm } from "../../util/hooks";
import AdminInputDropdown from "./AdminInputDropdown";
import ModuleInputDropdown from "./ModuleInputDropdown";

function EditQuestion({
  question: {
    id: questionId,
    questionName: newQuestionName,
    questionDescription: newQuestionDescription,
    image: newImage,
    points: newPoints,
    moduleId: newModuleId,
    moduleId,
    type: newType,
    videoLink: newVideoLink,
    skillDescription: newSkillDescription,
    articleLink: newArticleLink,
    expectedAnswer: newExpectedAnswer,
    adminId: newAdminId,
    hint: newHint,
    questionTemplateId,
  },
}) {
  console.log(questionId);
  // console.log(question);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(editQuestionCallback, {
    questionId: questionId,
    moduleId: moduleId,
    newQuestionName: newQuestionName || "",
    newQuestionDescription: newQuestionDescription || "",
    newImage: newImage || "",
    newPoints: newPoints || 0,
    newModuleId: newModuleId || "",
    newType: newType || "",
    newVideoLink: newVideoLink || "",
    newSkillDescription: newSkillDescription || "",
    newArticleLink: newArticleLink || "",
    newExpectedAnswer: newExpectedAnswer || "",
    newAdminId: newAdminId || "",
    newHint: newHint || "",
  });

  const [editQuestion, { loading }] = useMutation(EDIT_QUESTION, {
    refetchQueries: [],
    update(proxy, { data: { editQuestion: questionData } }) {
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

  function editQuestionCallback() {
    editQuestion();
  }

  const {
    data: { getQuestionTemplateById: questionTemplate } = {},
    loading: loadingQuestionTemplate,
  } = useQuery(GET_QUESTION_TEMPLATE_BY_ID, {
    variables: { questionTemplateId },
    client: adminClient,
  });

  console.log(questionTemplate);

  return questionId && questionTemplate ? (
    <form
      className="w-3/4 overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Question</h6>
      <p className="text-sm font-light ">
        Modify {newQuestionName}'s name, description, image, points, module,
        type, video, admin, article, expected answer, or hint.
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
                  Module
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <ModuleInputDropdown
                  errors={errors}
                  currentModuleId={values.newModuleId}
                  onChange={onChange}
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
                  Name
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newQuestionName ? "border-red-500" : ""
                  }`}
                  name="newQuestionName"
                  placeholder=""
                  value={values.newQuestionName}
                  onChange={onChange}
                  error={errors.newQuestionName ? "true" : "false"}
                  type="text"
                />
                {errors.newQuestionName && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newQuestionName}
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
                <textarea
                  className={`shadow appearance-none border rounded w-full h-16 py-1 px-2 font-light focus:outline-none   ${
                    errors.newQuestionDescription ? "border-red-500" : ""
                  }`}
                  name="newQuestionDescription"
                  placeholder=""
                  value={values.newQuestionDescription}
                  onChange={onChange}
                  error={errors.newQuestionDescription ? "true" : "false"}
                  type="text"
                  rows="20"
                />
                {errors.newQuestionDescription && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newQuestionDescription}
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
                  Video Link
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newVideoLink ? "border-red-500" : ""
                  }`}
                  name="newVideoLink"
                  placeholder=""
                  value={values.newVideoLink}
                  onChange={onChange}
                  error={errors.newVideoLink ? "true" : "false"}
                  type="text"
                />
                {errors.newVideoLink && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newVideoLink}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Article Link
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newArticleLink ? "border-red-500" : ""
                  }`}
                  name="newArticleLink"
                  placeholder=""
                  value={values.newArticleLink}
                  onChange={onChange}
                  error={errors.newArticleLink ? "true" : "false"}
                  type="text"
                />
                {errors.newArticleLink && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newArticleLink}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Skill Description
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newSkillDescription ? "border-red-500" : ""
                  }`}
                  name="newSkillDescription"
                  placeholder=""
                  value={values.newSkillDescription}
                  onChange={onChange}
                  error={errors.newSkillDescription ? "true" : "false"}
                  type="text"
                />
                {errors.newSkillDescription && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newSkillDescription}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Type
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newType ? "border-red-500" : ""
                  }`}
                  name="newType"
                  placeholder=""
                  value={values.newType}
                  onChange={onChange}
                  error={errors.newType ? "true" : "false"}
                  type="text"
                />
                {errors.newType && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newType}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Hint
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newHint ? "border-red-500" : ""
                  }`}
                  name="newHint"
                  placeholder=""
                  value={values.newHint}
                  onChange={onChange}
                  error={errors.newHint ? "true" : "false"}
                  type="text"
                />
                {errors.newHint && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newHint}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Expected Answer
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newExpectedAnswer ? "border-red-500" : ""
                  }`}
                  name="newExpectedAnswer"
                  placeholder=""
                  value={values.newExpectedAnswer}
                  onChange={onChange}
                  error={errors.newExpectedAnswer ? "true" : "false"}
                  type="text"
                />
                {errors.newExpectedAnswer && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newExpectedAnswer}
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

const EDIT_QUESTION = gql`
  mutation editQuestion(
    $questionId: String!
    $moduleId: String!
    $newModuleId: String
    $newImage: String
    $newQuestionDescription: String
    $newHint: String
    $newExpectedAnswer: String
    $newPoints: Int
    $newVideoLink: String
    $newArticleLink: String
    $newSkillDescription: String
    $newQuestionName: String
    $newType: String
    $newAdminId: String
  ) {
    editQuestion(
      questionId: $questionId
      moduleId: $moduleId
      newModuleId: $newModuleId
      newImage: $newImage
      newQuestionDescription: $newQuestionDescription
      newHint: $newHint
      newExpectedAnswer: $newExpectedAnswer
      newPoints: $newPoints
      newVideoLink: $newVideoLink
      newArticleLink: $newArticleLink
      newSkillDescription: $newSkillDescription
      newQuestionName: $newQuestionName
      newType: $newType
      newAdminId: $newAdminId
    ) {
      id
      questionName
      questionDescription
      image
      points
      moduleId
      type
      videoLink
      skillDescription
      articleLink
      expectedAnswer
      adminId
      hint
    }
  }
`;

export default EditQuestion;
