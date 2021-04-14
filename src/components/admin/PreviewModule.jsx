import React, { useEffect, useState } from "react";
import EditAndPreviewQuestionCard from "../../components/admin/EditAndPreviewQuestionCard";
import EditAndPreviewQuestionModal from "../../components/admin/EditAndPreviewQuestionModal";

export default function PreviewModule({ props, selectedQuestionId, module }) {
  const [activeQuestionId, setActiveQuestionId] = useState(selectedQuestionId);

  useEffect(() => {
    setActiveQuestionId(selectedQuestionId);
  }, [setActiveQuestionId, selectedQuestionId]);

  function handleQuestionClick(selectedQuestionId) {
    // console.log(selectedQuestionId);
    if (selectedQuestionId) {
      setActiveQuestionId(selectedQuestionId);
      props.history.push(
        `/adminEditAndPreview/${module.id}/${selectedQuestionId}`
      );
    } else {
      setActiveQuestionId("");
      props.history.push(`/adminEditAndPreview/${module.id}`);
    }
  }

  // const [getQuestionById] = useLazyQuery(GET_QUESTION_BY_ID);

  useEffect(() => {
    if (selectedQuestionId) {
      setIsOpen(true);
    }
    setActiveQuestionId(selectedQuestionId);
    // getQuestionById({ variables: { questionId: selectedQuestionId } });
  }, [selectedQuestionId]);
  // CHANGED SUMN HERE getQuesByid
  const [isOpen, setIsOpen] = useState(
    activeQuestionId !== undefined && activeQuestionId !== "" ? true : false
  );

  const previewModule =
    module && module.questions.length !== 0 ? (
      <>
        <div className="w-full pt-8 lg:pt-0 flex flex-col items-center lg:items-start lg:justify-start justify-center lg:h-96 overflow-y-auto lg:w-1/2 lg:pl-10 ">
          <h6 className="text-xl text-red-800 pb-4">
            Preview Module Questions
          </h6>

          <div className="grid gap-4 items-stretch  h-full relative w-full ">
            {module.questions.map((questionId, index) => (
              <EditAndPreviewQuestionCard
                key={index}
                props={props}
                setIsOpen={setIsOpen}
                questionId={questionId}
                handleQuestionClick={handleQuestionClick}
              />
            ))}
          </div>
        </div>

        <EditAndPreviewQuestionModal
          props={props}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          moduleId={module.id}
          activeQuestionId={activeQuestionId}
          handleQuestionClick={handleQuestionClick}
        />
      </>
    ) : (
      <></>
    );
  return previewModule;
}
