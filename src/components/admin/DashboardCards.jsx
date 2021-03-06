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
    <div className="pb-8 last:pb-2">
      <div className="flex items-center justify-center">
        <h4 className="text-3xl mr-2 w-3/4 md:w-5/6 xl:w-11/12">{type}</h4>
        <button
          onClick={(e) => {
            props.history.push(`/adminCreate/${createPage}`);
          }}
          className="xl:w-1/12 w-1/4 md:w-1/6 flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg transition-all duration-150 hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm items-center justify-center font-semibold"
        >
          Create
        </button>
      </div>

      {type === "Modules" && (
        <div className="h-full xl:h-64 grid xl:grid-flow-row grid-flow-col xl:grid-cols-4 gap-2 justify-start py-1 xl:overflow-y-auto relative mt-3 items-stretch overflow-x-auto ">
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
        <div className="h-full xl:h-64 grid xl:grid-flow-row grid-flow-col xl:grid-cols-4 gap-2 justify-start py-1 xl:overflow-y-auto relative mt-3 items-stretch overflow-x-auto ">
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
        <div className=" pt-4 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
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
        <div className="pt-4 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
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
        <div className="pt-4 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
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
        <div className="pt-4 grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
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
