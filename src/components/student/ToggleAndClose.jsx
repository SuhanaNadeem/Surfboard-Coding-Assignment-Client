import React from "react";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
export default function ToggleAndClose({
  question,
  module,
  onSubmit,
  togglePrevOpen,
  setIsOpen,
  setSubmitIsOpen,
  toggleIsOpen,
  studentObject,
  completedQuestions,
  goToEndCard,
  toggleNextOpen,
  //   module.id,
}) {
  return (
    <form className="flex mt-6 justify-between" onSubmit={onSubmit}>
      {module.questions.indexOf(question.id) !== 0 && (
        <button
          className="mx-auto focus:outline-none focus:ring rounded-sm"
          onClick={(e) => {
            togglePrevOpen();
            setIsOpen(false);
            setSubmitIsOpen(true);
          }}
          type="button"
        >
          <BsChevronLeft size={32} />
        </button>
      )}
      <button
        className="mx-auto focus:outline-none focus:ring rounded-sm"
        onClick={toggleIsOpen}
        type="button"
      >
        <GrClose size={26} />
      </button>
      {((module.questions.indexOf(question.id) + 1 ===
        module.questions.length &&
        studentObject.completedModules.includes(module.id)) ||
        module.questions.indexOf(question.id) + 1 !== module.questions.length ||
        (module.questions.indexOf(question.id) + 1 ===
          module.questions.length &&
          module.questions.length === 1) ||
        (question.type === "Skill" &&
          completedQuestions.length + 1 === module.questions.length)) && (
        <button
          className="mx-auto focus:outline-none focus:ring rounded-sm"
          type={question.type === "Skill" ? `submit` : `button`}
          onClick={(e) => {
            setIsOpen(false);
            setSubmitIsOpen(true);
            // console.log("settt");
            if (
              module.questions.indexOf(question.id) + 1 ===
              module.questions.length
            ) {
              // toggleIsOpen();
              goToEndCard();
              // used to toggle here
            } else if (question.type !== "Skill") {
              e.preventDefault();
              toggleNextOpen(e);
            }
          }}
        >
          <BsChevronRight size={32} />
        </button>
      )}
    </form>
  );
}
