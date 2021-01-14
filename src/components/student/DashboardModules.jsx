import React from "react";

import ModuleCard from "./ModuleCard";

export default function DashboardModules({ props, modules, type }) {
  // TODO fix width of screen overflow

  return modules ? (
    <div className="">
      <h4 className="pt-6 px-10 text-3xl">{type}</h4>

      <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
        {modules.map((module, index) => (
          // call component here, passing in module
          <ModuleCard key={index} module={module} />
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
