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
    setActiveQuestionId(selectedQuestionId);
    getQuestionById({ variables: { questionId: selectedQuestionId } });
  }, [selectedQuestionId]);

  const [isOpen, setIsOpen] = useState(
    activeQuestionId !== undefined && activeQuestionId !== "" ? true : false
  );

  const previewModule = module ? (
    <>
      <div className="flex flex-col items-center justify-center text-center mx-auto">
        <h6 className="text-xl text-red-800">Preview Module</h6>

        <div className="grid gap-4 items-stretch justify-start h-full pl-2 mb-6">
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
