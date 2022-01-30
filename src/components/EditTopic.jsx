import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_TOPICS } from "../pages/Welcome";
import { useForm } from "../util/hooks";

function EditTopic({
  props,
  topic: {
    id: topicId,
    title: newTitle,
    description: newDescription,
    timeEstimate: newTimeEstimate,
  },
}) {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit, setValues } = useForm(editTopicCallback, {
    topicId,
    newTitle: newTitle || "",
    newTimeEstimate: newTimeEstimate || 0,
    newDescription: newDescription || "",
  });

  const [editTopic] = useMutation(EDIT_TOPIC, {
    refetchQueries: [
      {
        query: GET_TOPICS,
      },
    ],
    update() {
      setErrors({});
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function editTopicCallback() {
    editTopic();
  }

  // const setImagePreview = (imageTempUrl, imageName, imageFile) => {
  //   setPreviewImages({
  //     ...previewImages,
  //     [imageName]: imageTempUrl,
  //   });
  //   // bannerLogoFile;

  //   if (imageFile) {
  //     // console.log(previewImages);
  //     setValues({
  //       ...values,
  //       [imageName + "File"]: imageFile,
  //     });
  //   }
  // };
  // const [previewImages, setPreviewImages] = useState({
  //   newImage: image,
  // });

  return topicId ? (
    <form
      className="w-full overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">{newTitle}</h6>

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
                    errors.newTitle ? "border-red-800" : ""
                  }`}
                  name="newTitle"
                  placeholder=""
                  value={values.newTitle}
                  onChange={onChange}
                  error={errors.newTitle ? "true" : "false"}
                  type="text"
                />
                {errors.newTitle && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newTitle}
                  </p>
                )}
              </td>
              
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Time
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.newTimeEstimate ? "border-red-800" : ""
                  }`}
                  name="newTimeEstimate"
                  placeholder=""
                  value={values.newTimeEstimate}
                  onChange={onChange}
                  error={errors.newTimeEstimate ? "true" : "false"}
                  type="number"
                />
                {errors.newTimeEstimate && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newTimeEstimate}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  About
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <textarea
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.newDescription ? "border-red-800" : ""
                  }`}
                  rows="3"
                  name="newDescription"
                  placeholder=""
                  value={values.newDescription}
                  onChange={onChange}
                  error={errors.newDescription ? "true" : "false"}
                  type="text"
                />
                {errors.newDescription && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newDescription}
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
                    errors.newImageLink ? "border-red-800" : ""
                  }`}
                  name="newImageLink"
                  placeholder=""
                  value={values.newImageLink}
                  onChange={onChange}
                  error={errors.newImageLink ? "true" : "false"}
                  type="text"
                />
                {errors.newImageLink && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.newImageLink}
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
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-1/4">
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

const EDIT_TOPIC = gql`
  mutation editTopic(
    $topicId: String!
    $newTitle: String
    $newTimeEstimate: Int
    $newDescription: String
    $newImageLink: String
  ) {
    editTopic(
      topicId: $topicId
      newTitle: $newTitle
      newTimeEstimate: $newTimeEstimate
      newDescription: $newDescription
      newImageLink: $newImageLink
    ) 
  }
`;

export default EditTopic;
