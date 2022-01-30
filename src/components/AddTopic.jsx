import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_TOPICS } from "../pages/Welcome";
import { useForm } from "../util/hooks";

function AddTopic({
  props,
  title,
  timeEstimate,
  description,
  imageLink, 
}) {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit, setValues } = useForm(addTopicCallback, {
    title: title || "",
    timeEstimate: timeEstimate || 0,
    description: description || "",
    imageLink: imageLink || "",
  });

  const [addTopic] = useMutation(ADD_TOPIC, {
    refetchQueries: [
      {
        query: GET_TOPICS,
      },
    ],
    update() {
      setErrors({});
    },
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  function addTopicCallback() {
    addTopic();
  }

  return (
    <form
      className="w-full overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h4 className="text-3xl mt-10">Add Topic</h4>

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
                  Title
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.title ? "border-red-800" : ""
                  }`}
                  name="title"
                  placeholder=""
                  value={values.title}
                  onChange={onChange}
                  error={errors.title ? "true" : "false"}
                  type="text"
                />
                {errors.title && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.title}
                  </p>
                )}
              </td>
              
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Time Estimate
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.timeEstimate ? "border-red-800" : ""
                  }`}
                  name="timeEstimate"
                  placeholder=""
                  value={values.timeEstimate}
                  onChange={onChange}
                  error={errors.timeEstimate ? "true" : "false"}
                  type="number"
                />
                {errors.timeEstimate && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.timeEstimate}
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
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.description ? "border-red-800" : ""
                  }`}
                  name="description"
                  placeholder=""
                  value={values.description}
                  onChange={onChange}
                  error={errors.description ? "true" : "false"}
                  type="text"
                />
                {errors.description && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.description}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  Image Link
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.imageLink ? "border-red-800" : ""
                  }`}
                  name="imageLink"
                  placeholder=""
                  value={values.imageLink}
                  onChange={onChange}
                  error={errors.imageLink ? "true" : "false"}
                  type="text"
                />
                {errors.imageLink && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.imageLink}
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
                <ImageUploadBox
                  setImagePreviewCallback={setImagePreview}
                  imageName="newImage"
                  previewImages={previewImages}
                  setErrorsCallback={setErrors}
                  errors={errors}
                />

                {errors.newImageFile && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newImageFile}
                  </p>
                )}
                {previewImages.newImage && (
                  <div className="h-20 w-full">
                    <img
                      className="h-full w-full object-contain rounded mt-2 bg-gray-200 p-1"
                      alt=""
                      src={`${previewImages.newImage}`}
                    />
                  </div>
                )}
              </td>
            </tr> */}
          </tbody>
        </table>
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
  );
}

const ADD_TOPIC = gql`
  mutation addTopic(
    $title: String!
    $timeEstimate: Int!
    $description: String!
    $imageLink: String!
  ) {
    addTopic(
      title: $title
      timeEstimate: $timeEstimate
      description: $description
      imageLink: $imageLink
    ) 
  }
`;

export default AddTopic;
