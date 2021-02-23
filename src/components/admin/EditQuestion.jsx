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
    name: newName,
    description: newDescription,
    image: newImage,
    points: newPoints,
    moduleId: newModuleId,
    moduleId,
    type: newType,
    videoLink: newVideoLink,
    articleLink: newArticleLink,
    expectedAnswer: newExpectedAnswer,
    adminId: newAdminId,
    hint: newHint,
    extraLink: newExtraLink,
    optionA: newOptionA,
    optionB: newOptionB,
    optionC: newOptionC,
    optionD: newOptionD,
    questionFormat,
  },
}) {
  console.log(questionId);
  console.log("yhenr mom");
  // console.log(question);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(editQuestionCallback, {
    questionId: questionId,
    moduleId: moduleId,
    newName: newName || "",
    newDescription: newDescription || "",
    newImage: newImage || "",
    newPoints: newPoints || 0,
    newModuleId: newModuleId || "",
    newType: newType || "",
    newVideoLink: newVideoLink || "",
    newArticleLink: newArticleLink || "",
    newExpectedAnswer: newExpectedAnswer || "",
    newAdminId: newAdminId || "",
    newHint: newHint || "",
    newExtraLink: newExtraLink || "",
    newOptionA: newOptionA || "",
    newOptionB: newOptionB || "",
    newOptionC: newOptionC || "",
    newOptionD: newOptionD || "",
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

  return questionId ? (
    <form
      className="w-3/4 overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Question</h6>
      <p className="text-sm font-light ">
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
                  Description
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <textarea
                  className={`shadow appearance-none border rounded w-full h-16 py-1 px-2 font-light focus:outline-none   ${
                    errors.newDescription ? "border-red-500" : ""
                  }`}
                  name="newDescription"
                  placeholder=""
                  value={values.newDescription}
                  onChange={onChange}
                  error={errors.newDescription ? "true" : "false"}
                  type="text"
                  rows="20"
                />
                {errors.newDescription && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newDescription}
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
            {questionFormat === "Multiple Choice" && (
              <>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className=" font-semibold uppercase tracking-wide ">
                      Option A
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.newOptionA ? "border-red-500" : ""
                      }`}
                      name="newOptionA"
                      placeholder=""
                      value={values.newOptionA}
                      onChange={onChange}
                      error={errors.newOptionA ? "true" : "false"}
                      type="text"
                    />
                    {errors.newOptionA && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.newOptionA}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className=" font-semibold uppercase tracking-wide ">
                      Option B
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.newOptionB ? "border-red-500" : ""
                      }`}
                      name="newOptionB"
                      placeholder=""
                      value={values.newOptionB}
                      onChange={onChange}
                      error={errors.newOptionB ? "true" : "false"}
                      type="text"
                    />
                    {errors.newOptionB && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.newOptionB}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className=" font-semibold uppercase tracking-wide ">
                      Option C
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.newOptionC ? "border-red-500" : ""
                      }`}
                      name="newOptionC"
                      placeholder=""
                      value={values.newOptionC}
                      onChange={onChange}
                      error={errors.newOptionC ? "true" : "false"}
                      type="text"
                    />
                    {errors.newOptionC && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.newOptionC}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className=" font-semibold uppercase tracking-wide ">
                      Option D
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.newOptionD ? "border-red-500" : ""
                      }`}
                      name="newOptionD"
                      placeholder=""
                      value={values.newOptionD}
                      onChange={onChange}
                      error={errors.newOptionD ? "true" : "false"}
                      type="text"
                    />
                    {errors.newOptionD && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.newOptionD}
                      </p>
                    )}
                  </td>
                </tr>
              </>
            )}
            {questionFormat !== "Multiple Choice" &&
              questionFormat !== "" &&
              questionFormat && (
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className=" font-semibold uppercase tracking-wide ">
                      Resource Link
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.newExtraLink ? "border-red-500" : ""
                      }`}
                      name="newExtraLink"
                      placeholder=""
                      value={values.newExtraLink}
                      onChange={onChange}
                      error={errors.newExtraLink ? "true" : "false"}
                      type="text"
                    />
                    {errors.newExtraLink && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.newExtraLink}
                      </p>
                    )}
                  </td>
                </tr>
              )}

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
    $newDescription: String
    $newHint: String
    $newExpectedAnswer: String
    $newPoints: Int
    $newVideoLink: String
    $newArticleLink: String
    $newName: String
    $newType: String
    $newAdminId: String
    $newOptionA: String
    $newOptionB: String
    $newOptionC: String
    $newOptionD: String
    $newExtraLink: String
  ) {
    editQuestion(
      questionId: $questionId
      moduleId: $moduleId
      newModuleId: $newModuleId
      newImage: $newImage
      newDescription: $newDescription
      newHint: $newHint
      newExpectedAnswer: $newExpectedAnswer
      newPoints: $newPoints
      newVideoLink: $newVideoLink
      newArticleLink: $newArticleLink
      newName: $newName
      newType: $newType
      newAdminId: $newAdminId
      newOptionA: $newOptionA
      newOptionB: $newOptionB
      newOptionC: $newOptionC
      newOptionD: $newOptionD
      newExtraLink: $newExtraLink
    ) {
      id
      name
      description
      image
      points
      moduleId
      type
      videoLink
      articleLink
      expectedAnswer
      adminId
      hint
    }
  }
`;

export default EditQuestion;
