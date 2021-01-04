import React from "react";

import { useHistory } from "react-router-dom";

export default function DashboardModules({ props, modules, type }) {
  return modules ? (
    <div>
      <h4 className="pt-6 px-10 text-3xl">{type}</h4>

      <div className="grid grid-cols-3 overflow-x-scroll mb-2 gap-4 mx-auto py-4 px-8 md:p-4 md:max-w-2xl xl:max-w-6xl">
        {modules.map((module, index) => (
          <div
            key={index}
            className="bg-white rounded-xl hover:shadow-md w-full h-full flex flex-col items-center justify-start py-4 px-6"
          >
            <p className="uppercase tracking-wide text-red-800 font-semibold text-lg w-full pb-4 border-gray-300 border-b-2">
              {module.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
