import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import EditAndPreviewQuestionModal from "../../components/admin/EditAndPreviewQuestionModal";
import EditAndPreviewQuestionCard, {
  GET_QUESTION_BY_ID,
} from "../../components/admin/EditAndPreviewQuestionCard";
export default function PreviewModule({ props, selectedQuestionId, module }) {
  const [activeQuestionId, setActiveQuestionId] = useState(selectedQuestionId);

  useEffect(() => {
    setActiveQuestionId(selectedQuestionId);
  }, [setActiveQuestionId, selectedQuestionId]);

  function handleQuestionClick(selectedQuestionId) {
    console.log(selectedQuestionId);
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

  const [getQuestionById, { loading, data }] = useLazyQuery(GET_QUESTION_BY_ID);

  useEffect(() => {
    if (selectedQuestionId) {
      setIsOpen(true);
    }
    setActiveQuestionId(selectedQuestionId);
    getQuestionById({ variables: { questionId: selectedQuestionId } });
  }, [selectedQuestionId]);

  const [isOpen, setIsOpen] = useState(
    activeQuestionId !== undefined && activeQuestionId !== "" ? true : false
  );

  const previewModule = module ? (
    <>
      <div className="flex w-2/3 flex-col items-center justify-start text-center mx-auto h-96 overflow-y-scroll">
        <h6 className="text-xl text-red-800">Preview Module Questions</h6>

        <div className="grid gap-4 items-stretch justify-start pl-2 pt-4 pb-6">
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
