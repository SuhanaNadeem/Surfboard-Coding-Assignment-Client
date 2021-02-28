import React from "react"; // import Compressor from "compressorjs";
import { useDropzone } from "react-dropzone";
import { useWindowSize } from "../../util/hooks";

export default function ImageUploadBox({
  setImagePreviewCallback,
  imageName,
  previewImages,
  setErrorsCallback,
  errors,
}) {
  // const [uploadErrors, setUploadErrors] = useState();

  // async function myRemoveBgFunction(path, outputFile) {
  //   const result = await removeBackgroundFromImageFile({
  //     path,
  //     apiKey: "jN17TymGy51taRD4cN7wWdgq",
  //     size: "auto",
  //     type: "product",
  //     format: "jpg",

  //     crop: true,

  //     outputFile,
  //   });

  //   return result.base64img;
  // }

  const onDrop = async ([file]) => {
    setErrorsCallback({
      ...errors,
      [imageName + "UploadError"]: "",
    });

    if (file) {
      // if (file.type === "image/gif") {
      const imageTempUrl = URL.createObjectURL(file);

      setImagePreviewCallback(imageTempUrl, imageName, file);
    } else {
      setErrorsCallback({
        ...errors,
        [imageName +
        "UploadError"]: "Something went wrong. Check file type and size (max. 10 MB)",
      });
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 10485760, //10 MB
  });

  const size = useWindowSize();

  function handleChange(files) {
    setErrorsCallback({
      ...errors,
      [imageName + "UploadError"]: "",
    });
    const file = files[0];

    if (file) {
      // if (file.type === "image/gif") {
      const imageTempUrl = URL.createObjectURL(file);

      setImagePreviewCallback(imageTempUrl, imageName, file);
    } else {
      setErrorsCallback({
        ...errors,
        [imageName +
        "UploadError"]: "Something went wrong. Check file type and size (max. 10 MB)",
      });
    }
  }

  return size.width >= 768 ? (
    <div
      {...getRootProps({
        isDragActive,
        isDragAccept,
        isDragReject,
      })}
      // {...getRootProps()}
      // {
      // isDragActive,
      // isDragAccept,
      // isDragReject,
      // }
      className="overflow-hidden w-full"
    >
      <input {...getInputProps()} />
      {/* {isDragActive ? ( */}
      {isDragActive ? (
        <p
          className={`break-words font-normal w-full text-center border-dashed p-2 border-2 rounded bg-blue-100 border-blue-500`}
        >
          Drop the file here ...
        </p>
      ) : // {/* {isDragAccept && !isDragActive && (

      previewImages && previewImages[imageName] ? (
        <p
          className={`break-words font-normal w-full text-center hover:text-blue-500 cursor-pointer border-dashed p-2 border-2 rounded bg-green-100 border-green-500`}
        >
          Drop file or click to change the file
        </p>
      ) : (
        <p
          className={`break-words font-normal w-full text-center hover:text-blue-500 cursor-pointer border-dashed p-2 border-2 rounded bg-gray-100 border-gray-500`}
        >
          Drop file or click to select the file
        </p>
      )}
    </div>
  ) : (
    <div className="break-words truncate overflow-hidden">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e.target.files)}
      />
    </div>
  );
}
