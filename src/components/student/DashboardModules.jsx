import React from "react";
import ModuleCard from "./ModuleCard";

export default function DashboardModules({ props, modules, type }) {
  return modules ? (
    <div className="pt-8">
      <h4 className="text-3xl">{type}</h4>

      {modules.length > 0 ? (
        <div className="pt-4 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {modules.map((module, index) => (
            <ModuleCard key={index} props={props} module={module} />
          ))}
        </div>
      ) : (
        <p className="font-normal lg:font-light text-md mt-3">
          {type === "In-Progress Modules" ? "Start" : "Complete"} a module to
          see {type} here.
        </p>
      )}
    </div>
  ) : (
    <div></div>
  );
}
