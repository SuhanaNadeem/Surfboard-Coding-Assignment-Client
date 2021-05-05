import React from "react";

export default function SubmitAnswer({ submitIsOpen, question }) {
  return (
    <div className="flex flex-col">
      {submitIsOpen && (
        <>
          <button
            type="submit"
            // className={`${
            //   question.questionFormat === "Multiple Choice"
            //     ? `mt-4 w-16`
            //     : `ml-4 w-20`
            // }  border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold text-center items-center justify-center flex focus:outline-none focus:ring mx-auto`}
            className="mt-2 w-20  border-2 border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-xs font-semibold text-center items-center justify-center flex focus:outline-none focus:ring mx-auto"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}
