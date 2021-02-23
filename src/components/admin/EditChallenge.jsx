import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import AdminInputDropdown from "./AdminInputDropdown";
import CategoryInputDropdown from "./CategoryInputDropdown";

function EditChallenge({
  challenge: {
    id: challengeId,
    name: newName,
    adminId: newAdminId,
    categoryId: newCategoryId,
    extraLink: newExtraLink,
    dueDate: newDueDate,
    image: newImage,
    challengeDescription: newChallengeDescription,
  },
}) {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(editChallengeCallback, {
    challengeId: challengeId,
    newName: newName || "",
    newAdminId: newAdminId || "",
    newCategoryId: newCategoryId || "",
    newImage: newImage || "",
    newExtraLink: newExtraLink || "",
    newDueDate: newDueDate || "",
    newChallengeDescription: newChallengeDescription || "",
  });

  const [editChallenge, { loading }] = useMutation(EDIT_CHALLENGE, {
    refetchQueries: [],
    update(proxy, { data: { editChallenge: categoryData } }) {
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

  function editChallengeCallback() {
    editChallenge();
  }

  return challengeId ? (
    <form
      className="w-3/4 overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Edit Challenge</h6>
      <p className="text-sm font-light ">
        Modify {newName}'s name, admin, description, image, category, due date,
        or link.
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
                  Description
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newChallengeDescription ? "border-red-500" : ""
                  }`}
                  name="newChallengeDescription"
                  placeholder=""
                  value={values.newChallengeDescription}
                  onChange={onChange}
                  error={errors.newChallengeDescription ? "true" : "false"}
                  type="text"
                />
                {errors.newChallengeDescription && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newChallengeDescription}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Due Date
                </label>
                <p>(dd/mm/yyyy)</p>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.newDueDate ? "border-red-500" : ""
                  }`}
                  name="newDueDate"
                  placeholder=""
                  value={values.newDueDate}
                  onChange={onChange}
                  error={errors.newDueDate ? "true" : "false"}
                  type="text"
                />
                {errors.newDueDate && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.newDueDate}
                  </p>
                )}
              </td>
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200">
                <label className=" font-semibold uppercase tracking-wide ">
                  Link
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

const EDIT_CHALLENGE = gql`
  mutation editChallenge(
    $challengeId: String!
    $newCategoryId: String
    $newChallengeDescription: String
    $newName: String
    $newImage: String
    $newExtraLink: String
    $newDueDate: String
    $newAdminId: String
  ) {
    editChallenge(
      challengeId: $challengeId
      newCategoryId: $newCategoryId
      newChallengeDescription: $newChallengeDescription
      newName: $newName
      newImage: $newImage
      newExtraLink: $newExtraLink
      newDueDate: $newDueDate
      newAdminId: $newAdminId
    ) {
      name
      categoryId
      challengeDescription
      image
      extraLink
      dueDate
      adminId
      id
      createdAt
    }
  }
`;

export default EditChallenge;