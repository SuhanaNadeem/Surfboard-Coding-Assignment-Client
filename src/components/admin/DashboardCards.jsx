import CategoryCard from "./CategoryCard";
import BadgeCard from "./BadgeCard";
import ChallengeCard from "./ChallengeCard";
import ModuleCard from "./ModuleCard";
import QuestionCard from "./QuestionCard";
import QuestionTemplateCard from "./QuestionTemplateCard";

import React from "react";
export default function DashboardCards({ props, objects, adminObjects, type }) {
  var createPage;
  if (type === "Categories") {
    createPage = "category";
  } else {
    createPage = type.slice(0, -1).toLowerCase();
  }
  return objects && adminObjects ? (
    <div className="pb-8">
      <div className="flex items-center justify-center">
        <h4 className="px-10 text-3xl mr-2 w-11/12">{type}</h4>
        <button
          onClick={(e) => {
            props.history.push(`/adminCreate/${createPage}`);
          }}
          className="w-1/12 flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold"
        >
          Create
        </button>
      </div>

      {type === "Modules" && (
        <div className="h-64 ml-10 grid grid-flow-row grid-cols-4 gap-2 items-stretch justify-start py-1 overflow-y-auto relative mt-3">
          {objects.map((module, index) => (
            <ModuleCard
              key={index}
              props={props}
              module={module}
              created={adminObjects.some(
                (adminObject) => adminObject.id === module.id
              )}
            />
          ))}
        </div>
      )}
      {type === "Questions" && (
        <div className="h-64 mt-2 ml-10 grid grid-flow-row grid-cols-4 gap-2 items-stretch justify-start py-1 overflow-y-auto relative">
          {objects.map((question, index) => (
            <QuestionCard
              key={index}
              props={props}
              question={question}
              created={adminObjects.some(
                (adminObject) => adminObject.id === question.id
              )}
            />
          ))}
        </div>
      )}
      {/* {type === "Question Templates" && (
        <div className=" pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
          {objects.map((questionTemplate, index) => (
            <QuestionTemplateCard
              key={index}
              props={props}
              questionTemplate={questionTemplate}
              created={adminObjects.some(
                (adminObject) => adminObject.id === questionTemplate.id
              )}
            />
          ))}
        </div>
      )} */}
      {type === "Badges" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
          {objects.map((badge, index) => (
            <BadgeCard
              key={index}
              props={props}
              badge={badge}
              created={adminObjects.some(
                (adminObject) => adminObject.id === badge.id
              )}
            />
          ))}
        </div>
      )}
      {type === "Categories" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
          {objects.map((category, index) => (
            <CategoryCard
              key={index}
              props={props}
              category={category}
              created={adminObjects.some(
                (adminObject) => adminObject.id === category.id
              )}
            />
          ))}
        </div>
      )}
      {type === "Challenges" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
          {objects.map((challenge, index) => (
            <ChallengeCard
              key={index}
              props={props}
              challenge={challenge}
              created={adminObjects.some(
                (adminObject) => adminObject.id === challenge.id
              )}
            />
          ))}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}
