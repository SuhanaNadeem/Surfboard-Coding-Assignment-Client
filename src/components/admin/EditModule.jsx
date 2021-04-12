import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_MODULES,
  GET_MODULES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";
import AdminInputDropdown from "./AdminInputDropdown";
import CategoryInputDropdown from "./CategoryInputDropdown";
import ImageUploadBox from "./ImageUploadBox";

function EditModule({
  props,
  module: {
    id: moduleId,
    categoryId: newCategoryId,
    name: newName,
    adminId: newAdminId,
    questions,
    image,
  },
}) {
  const { admin } = useContext(AdminAuthContext);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit, setValues } = useForm(
    editModuleCallback,
    {
      moduleId,
      newCategoryId,
      newName,
      newAdminId,
      newImageFile: null,
    }
  );

  const [editModule] = useMutation(EDIT_MODULE, {
    refetchQueries: [
      {
        query: GET_MODULES,
      },
      {
        query: GET_MODULES_BY_ADMIN,
        variables: { adminId: admin && admin.id },
      },
    ],
    update(proxy, { data: { editModule: moduleData } }) {
      setErrors({});
      // console.log(previewImages);
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

  function editModuleCallback() {
    editModule();
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

  return module ? (
    <form
      className={`${
        questions.length === 0 ? `` : `md:mx-auto md:w-1/3`
      }   w-full  overflow-hidden flex flex-col`}
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Module</h6>
      <p className="text-sm font-normal lg:font-light ">
        Modify {newName}'s name, category, and admin.
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
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
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
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
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
            </tr>
          </tbody>
        </table>
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none">
          <button
            type="submit"
            className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm font-semibold "
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

const EDIT_MODULE = gql`
  mutation editModule(
    $moduleId: String!
    $newCategoryId: String
    $newName: String
    $newAdminId: String
    $newImageFile: Upload
  ) {
    editModule(
      newCategoryId: $newCategoryId
      moduleId: $moduleId
      newName: $newName
      newAdminId: $newAdminId
      newImageFile: $newImageFile
    ) {
      id
      name
      categoryId
      adminId
      questions
      learningObjectives
      createdAt
    }
  }
`;

export default EditModule;
