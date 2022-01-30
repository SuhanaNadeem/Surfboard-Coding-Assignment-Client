import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_MESSAGES } from "../pages/Welcome";
import { useForm } from "../util/hooks";

function SendMessage({
  props,
  sender,
  text,
}) {
  
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit, setValues } = useForm(addMessageCallback, {
    sender: sender || "",
    text: text || "",
  });

  const [addMessage] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: GET_MESSAGES,
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

  function addMessageCallback() {
    addMessage();
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

  return (
    <form
      className="w-full overflow-hidden flex flex-col "
      onSubmit={onSubmit}
      noValidate
    >

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
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.sender ? "border-red-800" : ""
                  }`}
                  name="sender"
                  placeholder=""
                  value={values.sender}
                  onChange={onChange}
                  error={errors.sender ? "true" : "false"}
                  type="text"
                />
                {errors.sender && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.sender}
                  </p>
                )}
              </td>
              
            </tr>
            <tr>
              <td className="text-sm py-2 border-b border-gray-200 w-full pr-3 truncate ">
                <label className=" font-semibold uppercase tracking-wide ">
                  Message
                </label>
              </td>
              <td className="text-sm py-2 border-b border-gray-200">
                <input
                  className={`shadow appearance-none border rounded w-full py-1 px-2 font-normal lg:font-light focus:outline-none    ${
                    errors.text ? "border-red-800" : ""
                  }`}
                  name="text"
                  placeholder=""
                  value={values.text}
                  onChange={onChange}
                  error={errors.text ? "true" : "false"}
                  type="text"
                />
                {errors.text && (
                  <p className="text-red-800 font-normal lg:font-light">
                    <b>&#33;</b> {errors.text}
                  </p>
                )}
              </td>
            </tr>

          </tbody>
        </table>
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-1/4 md:w-1/6">
          <button
            type="submit"
            className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold w-20"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}

const ADD_MESSAGE = gql`
  mutation addMessage(
    $sender: String!
    $text: String!
  ) {
    addMessage(
      sender: $sender
      text: $text
    ) 
  }
`;

export default SendMessage;
