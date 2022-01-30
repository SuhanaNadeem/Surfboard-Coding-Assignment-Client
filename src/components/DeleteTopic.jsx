import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_TOPICS } from "../pages/Welcome";
import { useForm } from "../util/hooks";

function DeleteTopic({
  props,
  topic: {
    id: topicId,
  },
}) {
  const [errors, setErrors] = useState({});
  const { values, onChange, onSubmit, setValues } = useForm(deleteTopicCallback, {
    topicId,
  });

  const [deleteTopic] = useMutation(DELETE_TOPIC, {
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

  function deleteTopicCallback() {
    deleteTopic();
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
      <div className="flex flex-col mt-2">
        <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none w-1/4">
          <button
            type="submit"
            className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  ) : (
    <></>
  );
}

const DELETE_TOPIC = gql`
  mutation deleteTopic(
    $topicId: String!
  ) {
    deleteTopic(
      topicId: $topicId
    ) 
  }
`;

export default DeleteTopic;
