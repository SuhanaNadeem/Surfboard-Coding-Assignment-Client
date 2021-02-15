import React, { useContext, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

export default function ModuleEndCard({
  props,
  moduleId,
  isOpen,
  setIsOpen,
  toggleQuesCard,
}) {
  const { student } = useContext(StudentAuthContext);

  function toggleIsOpen() {
    // console.log("enters");
    setIsOpen(false);
    toggleQuesCard();
    props.history.push(`/module/${moduleId}`);
  }
  return (
    isOpen && (
      <>
        <button
          tabIndex="-1"
          onClick={toggleIsOpen}
          className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
        ></button>

        <div className="fixed mx-auto inset-0 overscroll-contain max-w-2xl my-4 p-8 bg-red-800 z-50 rounded-lg shadow-xl">
          <p>Congratulations</p>
        </div>
      </>
    )
  );
}
