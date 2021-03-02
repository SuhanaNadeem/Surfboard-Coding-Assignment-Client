import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_BADGES,
  GET_BADGES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";
import ImageUploadBox from "./ImageUploadBox";

function CreateBadge({ admin, props }) {
  const [errors, setErrors] = useState({});
  var type = "";
  var description = "";
  var requiredAmount = 0;
  var name = "";

  const { values, onChange, onSubmit, setValues } = useForm(
    createNewBadgeCallback,
    {
      name: name || "",
      imageFile: null,
      description: description || "",
      type: type || "",
      requiredAmount: requiredAmount || 0,
    }
  );

  const [createNewBadge, { loading }] = useMutation(CREATE_NEW_BADGE, {
    refetchQueries: [
      {
        query: GET_BADGES,
      },
      {
        query: GET_BADGES_BY_ADMIN,
        variables: { adminId: admin.id },
      },
    ],
    update() {
      setErrors({});
      values.imageFile = null;
      values.description = "";
      values.requiredAmount = 0;
      values.name = "";
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
                    value="Module"
                    onChange={onChange}
                    error={errors.type ? "true" : "false"}
                    type="radio"
                    id="Module"
                  />
                  <label htmlFor="Module">Module</label>
                </div>
                {errors.type && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.type}
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
                  Required Amount
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.requiredAmount ? "border-red-500" : ""
                  }`}
                  name="requiredAmount"
                  placeholder=""
                  value={values.requiredAmount}
                  onChange={onChange}
                  error={errors.requiredAmount ? "true" : "false"}
                  type="number"
                />
                {errors.requiredAmount && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.requiredAmount}
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

const CREATE_NEW_BADGE = gql`
  mutation createNewBadge(
    $name: String!
    $imageFile: Upload
    $description: String!
    $type: String!
    $requiredAmount: Int!
  ) {
    createNewBadge(
      name: $name
      imageFile: $imageFile
      description: $description
      requiredAmount: $requiredAmount
      type: $type
    ) {
      id
      name
      adminId
      requiredAmount
      type
      createdAt
      image
      description
    }
  }
`;

export default CreateBadge;
