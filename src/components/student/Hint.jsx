import React from "react";

export default function Hint({
  submitIsOpen,
  hint,
  hintVisible,
  toggleIsVisible,
  loadingHandleAnswerPoints,
}) {
  return submitIsOpen && hint && hint !== "" ? (
    <button
      onClick={toggleIsVisible}
      type="button"
      className="focus:outline-none flex mt-2 px-4 py-2 items-center justify-center text-black tracking-wide hover:text-red-800 text-sm"
    >
      <h3 className="font-semibold uppercase tracking-wide text-sm ">Hint</h3>
      {hintVisible && !loadingHandleAnswerPoints && (
        // && !isOpen
        <h3 className="font-light text-md lg:text-sm ml-2 focus:outline-none focus:text-blue-500 truncate">
          {hint}
        </h3>
      )}
    </button>
  ) : (
    <></>
  );
}
