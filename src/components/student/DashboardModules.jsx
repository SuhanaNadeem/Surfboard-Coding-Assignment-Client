import React from "react";

import ModuleCard from "./ModuleCard";

export default function DashboardModules({ props, modules, type }) {
  return modules ? (
    <div className="pt-8">
      <h4 className="px-10 text-3xl">{type}</h4>

      <div className="pt-4 ml-10 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
        {modules.map((module, index) => (
          <ModuleCard key={index} module={module} />
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
