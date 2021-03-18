import React from "react";
import ReactPlayer from "react-player";

export default function QuestionDisplay({ question }) {
  return (
    <>
      {question.image && question.image !== "" && (
        <div className="mt-2 mb-4 mx-auto">
          <img
            className="w-full h-72 object-cover object-center rounded-lg  "
            alt="Question"
            src={question.image}
          />
        </div>
      )}
      {question.articleLink && question.articleLink !== "" && (
        <div className="flex justify-center items-center mb-2 w-full">
          <h5 className="font-semibold uppercase tracking-wide text-sm mr-2">
            Article:
          </h5>
          <a
            className="font-light text-md lg:text-sm truncate focus:outline-none focus:text-blue-500"
            href={question.articleLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {question.articleLink}
          </a>
        </div>
      )}

      <h6 className="text-md text-left font-normal lg:font-light leading-snug ">
        {question.description}
      </h6>
      {question.extraLink && question.extraLink !== "" && (
        <div className="flex justify-center items-center mt-3 mb-2 w-full">
          <h5 className="font-semibold uppercase tracking-wide text-sm mr-2">
            Visit:
          </h5>
          <a
            className="font-light text-md lg:text-sm truncate focus:outline-none focus:text-blue-500"
            href={question.extraLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {question.extraLink}
          </a>
        </div>
      )}

      {question.videoLink && question.videoLink !== "" && (
        <>
          <div className="mt-4 w-full mb-2">
            <ReactPlayer
              url={question.videoLink}
              width="100%"
              height={300}
              controls={true}
            />
          </div>
        </>
      )}
    </>
  );
}
