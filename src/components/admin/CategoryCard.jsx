import React from "react";

import tempModuleCardImg from "../../images/tempModuleCardImg.PNG";

export default function CategoryCard({ props, category, created }) {
  return category ? (
    <button
      className="focus:outline-none"
      onClick={(e) => {
        // console.log("Go Somewhere");
        props.history.push(`/adminEditAndPreview/${category.id}`);
      }}
    >
      <div
        className={
          created
            ? `bg-gray-100 flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-200 h-full justify-center`
            : `bg-white flex-shrink-0 first:ml-2 shadow w-48 transition-all duration-150 ease-in-out md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden h-full hover:shadow-md hover:bg-gray-100 justify-center`
        }
      >
        <p className="uppercase tracking-wide text-red-800 font-semibold text-md">
          {category.name}
        </p>
        {/* <p className=" text-gray-700 font-semibold text-md leading-tight">
        {category.id}
      </p>
      <p className=" text-gray-700 font-thin text-sm">{category.createdAt} </p> */}
        <img
          src={tempModuleCardImg}
          className="rounded-lg object-contain w-full h-32 p-2"
        />
      </div>
    </button>
  ) : (
    <></>
  );
}
