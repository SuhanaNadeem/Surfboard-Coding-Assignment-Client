import CategoryCard from "./CategoryCard";
import BadgeCard from "./BadgeCard";
import ChallengeCard from "./ChallengeCard";
import ModuleCard from "./ModuleCard";
import QuestionCard from "./QuestionCard";
import QuestionTemplateCard from "./QuestionTemplateCard";

import React from "react";
export default function DashboardCards({ props, objects, adminObjects, type }) {
  return objects && adminObjects ? (
    <div className="pb-8">
      <h4 className="px-10 text-3xl">{type}</h4>

      {type === "Modules" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
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
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
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
      {type === "Question Templates" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
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
      )}
      {type === "Badges" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
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
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
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
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
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
