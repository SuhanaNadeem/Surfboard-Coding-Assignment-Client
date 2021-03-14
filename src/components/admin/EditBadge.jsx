import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_BADGES,
  GET_BADGES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";
import AdminInputDropdown from "./AdminInputDropdown";
import ImageUploadBox from "./ImageUploadBox";

function EditBadge({
  props,
  badge: {
    id: badgeId,
    name: newName,
    adminId: newAdminId,
    type: newType,
    requiredAmount: newRequiredAmount,
    description: newDescription,
    image,
  },
}) {
  // console.log(newType);
  const [errors, setErrors] = useState({});
  const { admin } = useContext(AdminAuthContext);
  const { values, onChange, onSubmit, setValues } = useForm(editBadgeCallback, {
    badgeId,
    newName: newName || "",
    newAdminId: newAdminId || "",
    newType: newType || "",
    newRequiredAmount: newRequiredAmount || 0,
    newDescription: newDescription || "",
    newImageFile: null,
  });

  const [editBadge, { loading }] = useMutation(EDIT_BADGE, {
    refetchQueries: [
      {
        query: GET_BADGES,
      },
      {
        query: GET_BADGES_BY_ADMIN,
        variables: { adminId: admin && admin.id },
      },
    ],
    update(proxy, { data: { editBadge: categoryData } }) {
      setErrors({});
      props.history.push("/adminDashboard");
    },
    onError(err) {
      // console.log(values);
      // console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function editBadgeCallback() {
    editBadge();
  }

  const setImagePreview = (imageTempUrl, imageName, imageFile) => {
    setPreviewImages({
      ...previewImages,
      [imageName]: imageTempUrl,
    });
    // bannerLogoFile;

    if (imageFile) {
      // console.log(previewImages);
      setValues({
        ...values,
        [imageName + "File"]: imageFile,
      });
    }
  };
  const [previewImages, setPreviewImages] = useState({
    newImage: image,
  });

  return badgeId ? (
    <form
      className="w-full overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Badge</h6>
      <p className="text-sm font-light ">
        Modify {newName}'s name, admin, module, question, category,
        requiredAmount, description, or image.
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
                  <p className="text-red-800 font-light">
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
                  <p className="text-red-800 font-light">
                    <b>&#33;</b> {errors.newName}
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
                    name="newType"
                    value="Question"
                    onChange={onChange}
                    error={errors.newType ? "true" : "false"}
                    type="radio"
                    id="Question"
                    checked={values.newType === "Question" ? "checked" : ""}
                  />
                  <label htmlFor="Question">Question</label>
                </div>
                <div>
                  <input
                    className="mr-2"
                    name="newType"
                    value="Module"
                    onChange={onChange}
                    error={errors.newType ? "true" : "false"}
                    type="radio"
                    id="Module"
                    checked={values.newType === "Module" ? "checked" : ""}
                  />
                  <label htmlFor="Module">Module</label>
                </div>
                {errors.newType && (
                  <p className="text-red-800 font-light">
                    <b>&#33;</b> {errors.newType}
                  </p>
                )}
              </td>
            </tr>

            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Required Amount
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newRequiredAmount ? "border-red-800" : ""
                  }`}
                  name="newRequiredAmount"
                  placeholder=""
                  value={values.newRequiredAmount}
                  onChange={onChange}
                  error={errors.newRequiredAmount ? "true" : "false"}
                  type="number"
                />
                {errors.newRequiredAmount && (
                  <p className="text-red-800 font-light">
                    <b>&#33;</b> {errors.newRequiredAmount}
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
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newDescription ? "border-red-800" : ""
                  }`}
                  name="newDescription"
                  placeholder=""
                  value={values.newDescription}
                  onChange={onChange}
                  error={errors.newDescription ? "true" : "false"}
                  type="text"
                />
                {errors.newDescription && (
                  <p className="text-red-800 font-light">
                    <b>&#33;</b> {errors.newDescription}
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
                  imageName="newImage"
                  previewImages={previewImages}
                  setErrorsCallback={setErrors}
                  errors={errors}
                />

                {/* <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.image ? "border-red-800" : ""
                  }`}
                  name="image"
                  placeholder=""
                  value={values.image}
                  onChange={onChange}
                  error={errors.image ? "true" : "false"}
                  type="text"
                />
                 */}
                {errors.newImageFile && (
                  <p className="text-red-800 font-light">
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
            </tr>
          </tbody>
        </table>
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-1/4 md:w-1/6">
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
    $newRequiredAmount: Int
    $newDescription: String
    $newType: String
    $newImageFile: Upload
  ) {
    editBadge(
      badgeId: $badgeId
      newName: $newName
      newAdminId: $newAdminId
      newType: $newType
      newRequiredAmount: $newRequiredAmount
      newDescription: $newDescription
      newImageFile: $newImageFile
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

export default EditBadge;
