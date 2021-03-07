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
      className="overflow-hidden w-full focus:outline-none"
    >
      <input {...getInputProps()} />
      {/* {isDragActive ? ( */}
      {isDragActive ? (
        <p
          className={`break-words font-normal w-full text-center border-dashed p-2 border-2 rounded bg-red-300 border-red-800`}
        >
          Drop the file here...
        </p>
      ) : // {/* {isDragAccept && !isDragActive && (

      previewImages && previewImages[imageName] ? (
        <p
          className={`focus:outline-none break-words text-sm font-light  w-full text-center hover:text-red-800 text-black cursor-pointer border-dashed p-2 border-2 rounded bg-red-100 border-red-800`}
        >
          Drop or click to change file
        </p>
      ) : (
        <p
          className={`focus:outline-none break-words text-sm font-light w-full text-center hover:text-red-800 cursor-pointer border-dashed p-2 border-2 rounded bg-gray-100 border-red-800`}
        >
          Drop or click to select file
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
