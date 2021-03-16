import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";
export default function ModuleEndCard({
  props,
  module,
  isOpen,
  setIsOpen,
  // toggleQuesCard,
  selectedQuestionId,
  setQuesIsOpen,
  student,
}) {
  if (selectedQuestionId === "end") {
    setIsOpen(true);
  }
  function toggleIsOpen() {
    // console.log("enters");
    setQuesIsOpen(false);
    setIsOpen(false);
    // toggleQuesCard();

    props.history.push(`/module/${module.id}`);
  }
  function returnToDash() {
    props.history.push("/dashboard");
  }
  return isOpen && module && student ? (
    <>
      <button
        tabIndex="-1"
        onClick={toggleIsOpen}
        className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20"
      ></button>

      <div className="fixed mx-2 md:mx-auto inset-0 overscroll-contain max-w-3xl my-4 p-8 bg-white z-50 rounded-lg shadow-xl ">
        <div className="flex flex-col justify-start items-center h-full overflow-y-auto">
          <h3 className="text-3xl text-red-800 font-semibold mb-2">
            Congratulations, {student.name}
          </h3>
          <p className="font-light tracking-wide text-xl ">
            You completed {module.name}
          </p>
          <div className="w-64 mx-auto h-96 flex rounded-lg">
            <img
              src={tempModuleCardImg}
              className="object-contain flex"
              alt="LYNX Logo"
            />
          </div>
          <button
            onClick={returnToDash}
            className="flex items-center justify-center"
          >
            <p className="font-light tracking-wide lg:text-sm text-md uppercase mr-2">
              Return to dashboard
            </p>
            <RiArrowGoBackFill size={24} />
          </button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
