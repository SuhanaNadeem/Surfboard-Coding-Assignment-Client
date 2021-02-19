import React from "react";

import ModuleCard from "./ModuleCard";

export default function DashboardCard({ props, objects, type }) {
  return objects ? (
    <div className="pt-8">
      <h4 className="px-10 text-3xl">{type}</h4>

      {type === "Modules" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {objects.map((module, index) => (
            <ModuleCard key={index} props={props} module={module} />
          ))}
        </div>
      )}
      {type === "Questions" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {objects.map((question, index) => (
            <QuestionCard key={index} props={props} question={question} />
          ))}
        </div>
      )}
      {type === "QuestionTemplates" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {objects.map((questionTemplate, index) => (
            <QuestionTemplateCard
              key={index}
              props={props}
              questionTemplate={questionTemplate}
            />
          ))}
        </div>
      )}
      {type === "Badges" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {objects.map((badge, index) => (
            <BadgeCard key={index} props={props} badge={badge} />
          ))}
        </div>
      )}
      {type === "Categories" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {objects.map((category, index) => (
            <CategoryCard key={index} props={props} category={category} />
          ))}
        </div>
      )}
      {type === "Challenges" && (
        <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {objects.map((challenge, index) => (
            <ChallengeCard key={index} props={props} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <div></div>
  );
}
