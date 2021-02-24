import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { useForm } from "../../util/hooks";
import CategoryInputDropdown from "./CategoryInputDropdown";

function CreateChallenge({ admin, props }) {
  const [errors, setErrors] = useState({});
  var image = "";
  var challengeDescription = "";
  var extraLink = "";
  var dueDate = "";
  var categoryId = "";
  var name = "";

  const { values, onChange, onSubmit } = useForm(createNewChallengeCallback, {
    name: name || "",
    categoryId: categoryId || "",
    challengeDescription: challengeDescription || "",
    image: image || "",
    extraLink: extraLink || "",
    dueDate: dueDate || "",
  });

  const [createNewChallenge, { loading }] = useMutation(CREATE_NEW_CHALLENGE, {
    refetchQueries: [],
    update() {
      setErrors({});
      values.name = "";
      values.categoryId = "";
      values.challengeDescription = "";
      values.image = "";
      values.extraLink = "";
      values.dueDate = "";
    },
    onError(err) {
      console.log(values);
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    client: adminClient,
  });

  function createNewChallengeCallback() {
    createNewChallenge();
  }

  return (
    <form
      className="w-3/4 overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >
      <h6 className="text-xl text-red-800">Create a Challenge</h6>
      <p className="text-sm font-light ">
        Create a new challenge by entering a name, description, link, category,
        due date, and image.
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
                  Description
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
                    errors.challengeDescription ? "border-red-500" : ""
                  }`}
                  name="challengeDescription"
                  placeholder=""
                  value={values.challengeDescription}
                  onChange={onChange}
                  error={errors.challengeDescription ? "true" : "false"}
                  type="text"
                />
                {errors.challengeDescription && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.challengeDescription}
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
                    errors.dueDate ? "border-red-500" : ""
                  }`}
                  name="dueDate"
                  placeholder=""
                  value={values.dueDate}
                  onChange={onChange}
                  error={errors.dueDate ? "true" : "false"}
                  type="text"
                />
                {errors.dueDate && (
                  <p className="text-red-500">
                    <b>&#33;</b> {errors.dueDate}
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
            <tr>
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

const CREATE_NEW_CHALLENGE = gql`
  mutation createNewChallenge(
    $name: String!
    $categoryId: String!
    $challengeDescription: String
    $image: String
    $extraLink: String
    $dueDate: String
  ) {
    createNewChallenge(
      name: $name
      categoryId: $categoryId
      challengeDescription: $challengeDescription
      image: $image
      extraLink: $extraLink
      dueDate: $dueDate
    ) {
      id
      name
      categoryId
      challengeDescription
      image
      extraLink
      dueDate
      adminId
      createdAt
    }
  }
`;

export default CreateChallenge;
