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

function CreateQuestion({ admin, props }) {
  const [errors, setErrors] = useState({});
  var moduleId = "";
  var description = "";
  var expectedAnswer = "";
  var hint = "";
  var questionFormat = "";
  var points = 0;
  var videoLink = "";
  var articleLink = "";
  var name = "";
  var type = "";
  var extraLink = "";
  var optionA = "";
  var optionB = "";
  var optionC = "";
  var optionD = "";
  // console.log(values.points);

  const { values, onChange, onSubmit, setValues } = useForm(
    createNewQuestionCallback,
    {
      imageFile: null,
      moduleId: moduleId || "",
      description: description || "",
      expectedAnswer: expectedAnswer || "",
      hint: hint || "",
      questionFormat: questionFormat || "",
      points: points || 0,
      videoLink: videoLink || "",
      articleLink: articleLink || "",
      name: name || "",
      type: type || "",
      extraLink: extraLink || "",
      optionA: optionA || "",
      optionB: optionB || "",
      optionC: optionC || "",
      optionD: optionD || "",
    }
  );

  const [createNewQuestion, { loading }] = useMutation(CREATE_NEW_QUESTION, {
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
      values.expectedAnswer = "";
      values.hint = "";
      values.points = 0;
      values.videoLink = "";
      values.articleLink = "";
      values.name = "";
      // values.type = "";
      values.extraLink = "";
      values.optionA = "";
      values.optionB = "";
      values.optionC = "";
      values.optionD = "";
      values.questionFormat = "";
      setPreviewImages({
        image: "",
      });
    },
    onError(err) {
      console.log(values);
      console.log(err);

      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function createNewQuestionCallback() {
    createNewQuestion();
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
      className="w-full overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Create a Question</h6>
      <p className="text-sm font-light ">
        Create a new question by entering a name, descriptions, points
        allocation, multiple choice options, expected answer, hint, required
        links, module, and image.
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
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  Type
                </label>
              </td>
              <td className="font-light text-sm px-2 py-2 border-b border-gray-200">
                <div>
                  <input
                    className="mr-2"
                    name="type"
                    value="Question"
                    onChange={onChange}
                    error={errors.type ? "true" : "false"}
                    type="radio"
                    id="Question"
                  />
                  <label htmlFor="Question">Question</label>
                </div>
                <div>
                  <input
                    className="mr-2"
                    name="type"
                    value="Skill"
                    onChange={onChange}
                    error={errors.type ? "true" : "false"}
                    type="radio"
                    id="Skill"
                  />
                  <label htmlFor="Skill">Skill</label>
                </div>
                {errors.type && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.type}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
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
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
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
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  Video Link
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.videoLink ? "border-red-500" : ""
                  }`}
                  name="videoLink"
                  placeholder=""
                  value={values.videoLink}
                  onChange={onChange}
                  error={errors.videoLink ? "true" : "false"}
                  type="text"
                />
                {errors.videoLink && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.videoLink}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  Article Link
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.articleLink ? "border-red-500" : ""
                  }`}
                  name="articleLink"
                  placeholder=""
                  value={values.articleLink}
                  onChange={onChange}
                  error={errors.articleLink ? "true" : "false"}
                  type="text"
                />
                {errors.articleLink && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.articleLink}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  Description
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <textarea
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  rows="3"
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

            {values.type === "Question" && (
              <>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Format
                    </label>
                  </td>
                  <td className="font-light text-sm px-2 py-2 border-b border-gray-200">
                    <div>
                      <input
                        className="mr-2"
                        name="questionFormat"
                        value="Multiple Choice"
                        onChange={onChange}
                        error={errors.questionFormat ? "true" : "false"}
                        type="radio"
                        id="Multiple Choice"
                      />
                      <label htmlFor="Multiple Choice">Multiple Choice</label>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        name="questionFormat"
                        value="Written Response"
                        onChange={onChange}
                        error={errors.questionFormat ? "true" : "false"}
                        type="radio"
                        id="Written Response"
                      />
                      <label htmlFor="Written Response">Written Response</label>
                    </div>
                    <div>
                      <input
                        className="mr-2"
                        name="questionFormat"
                        value="Link"
                        onChange={onChange}
                        error={errors.questionFormat ? "true" : "false"}
                        type="radio"
                        id="Link"
                      />
                      <label htmlFor="Link">Link</label>
                    </div>
                    {errors.questionFormat && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.questionFormat}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Expected Answer
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.expectedAnswer ? "border-red-500" : ""
                      }`}
                      name="expectedAnswer"
                      placeholder=""
                      value={values.expectedAnswer}
                      onChange={onChange}
                      error={errors.expectedAnswer ? "true" : "false"}
                      type="text"
                    />
                    {errors.expectedAnswer && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.expectedAnswer}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Hint
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.hint ? "border-red-500" : ""
                      }`}
                      name="hint"
                      placeholder=""
                      value={values.hint}
                      onChange={onChange}
                      error={errors.hint ? "true" : "false"}
                      type="text"
                    />
                    {errors.hint && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.hint}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
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
              </>
            )}
            {values.questionFormat === "Multiple Choice" && (
              <>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Option A
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.optionA ? "border-red-500" : ""
                      }`}
                      name="optionA"
                      placeholder=""
                      value={values.optionA}
                      onChange={onChange}
                      error={errors.optionA ? "true" : "false"}
                      type="text"
                    />
                    {errors.optionA && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.optionA}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Option B
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.optionB ? "border-red-500" : ""
                      }`}
                      name="optionB"
                      placeholder=""
                      value={values.optionB}
                      onChange={onChange}
                      error={errors.optionB ? "true" : "false"}
                      type="text"
                    />
                    {errors.optionB && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.optionB}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Option C
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.optionC ? "border-red-500" : ""
                      }`}
                      name="optionC"
                      placeholder=""
                      value={values.optionC}
                      onChange={onChange}
                      error={errors.optionC ? "true" : "false"}
                      type="text"
                    />
                    {errors.optionC && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.optionC}
                      </p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Option D
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.optionD ? "border-red-500" : ""
                      }`}
                      name="optionD"
                      placeholder=""
                      value={values.optionD}
                      onChange={onChange}
                      error={errors.optionD ? "true" : "false"}
                      type="text"
                    />
                    {errors.optionD && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.optionD}
                      </p>
                    )}
                  </td>
                </tr>
              </>
            )}
            {values.questionFormat !== "Multiple Choice" &&
              values.questionFormat !== "" &&
              values.questionFormat && (
                <tr>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <label className="text-red-800 font-semibold uppercase tracking-wide ">
                      Resource Link
                    </label>
                  </td>
                  <td className="text-sm py-2 border-b border-gray-200">
                    <input
                      className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                        errors.extraLink ? "border-red-500" : ""
                      }`}
                      name="extraLink"
                      placeholder=""
                      value={values.extraLink}
                      onChange={onChange}
                      error={errors.extraLink ? "true" : "false"}
                      type="text"
                    />
                    {errors.extraLink && (
                      <p className="text-red-500">
                        <b>&#33;</b> {errors.extraLink}
                      </p>
                    )}
                  </td>
                </tr>
              )}
            <tr>
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  Image
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
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
                /> */}
                <ImageUploadBox
                  setImagePreviewCallback={setImagePreview}
                  imageName="image"
                  previewImages={previewImages}
                  setErrorsCallback={setErrors}
                  errors={errors}
                />
                {errors.imageFile && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.imageFile}
                  </p>
                )}
                {previewImages.image && (
                  <div className="h-20 w-full">
                    <img
                      className="h-full w-full object-contain rounded mt-2 bg-gray-200 p-1"
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

const CREATE_NEW_QUESTION = gql`
  mutation createNewQuestion(
    $imageFile: Upload
    $moduleId: String!
    $description: String
    $expectedAnswer: String
    $hint: String
    $questionFormat: String
    $points: Int
    $videoLink: String
    $articleLink: String
    $name: String
    $type: String
    $extraLink: String
    $optionA: String
    $optionB: String
    $optionC: String
    $optionD: String
  ) {
    createNewQuestion(
      imageFile: $imageFile
      moduleId: $moduleId
      description: $description
      expectedAnswer: $expectedAnswer
      hint: $hint
      questionFormat: $questionFormat
      points: $points
      videoLink: $videoLink
      articleLink: $articleLink
      name: $name
      type: $type
      extraLink: $extraLink
      optionA: $optionA
      optionB: $optionB
      optionC: $optionC
      optionD: $optionD
    ) {
      id
      image
      moduleId
      description
      expectedAnswer
      hint
      questionFormat
      points
      videoLink
      articleLink
      name
      type
      extraLink
      optionA
      optionB
      optionC
      optionD
      adminId
      createdAt
    }
  }
`;

export default CreateQuestion;
