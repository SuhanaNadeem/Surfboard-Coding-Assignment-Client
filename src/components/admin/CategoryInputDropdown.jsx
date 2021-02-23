import React, { useState } from "react";
import { adminClient } from "../../GraphqlApolloClients";

import { gql, useQuery } from "@apollo/client";
import { GET_CATEGORY_BY_ID } from "./ChallengeCard";

export default function CategoryInputDropdown({
  onChange,
  errors,
  currentCategoryId,
  categoryType,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  var categoryErrors;
  if (categoryType === "newCategoryId") {
    categoryErrors = errors.newCategoryId;
  } else if (categoryType === "categoryId") {
    categoryErrors = errors.categoryId;
  }

  const {
    data: { getCategories: categories } = {},
    loading: loadingCategories,
  } = useQuery(GET_CATEGORIES, {
    client: adminClient,
  });

  const {
    data: { getCategoryById: currentCategory } = {},
    loading: loadingCategory,
    error,
  } = useQuery(GET_CATEGORY_BY_ID, {
    variables: { categoryId: currentCategoryId },
    client: adminClient,
  });

  return (
    <>
      <button
        onClick={toggleIsOpen}
        className={`shadow text-left appearance-none border rounded w-full py-1 px-2 font-light focus:outline-none   ${
          categoryErrors ? "border-red-500" : ""
        }`}
      >
        {currentCategory ? (
          <p>{currentCategory.name}</p>
        ) : (
          <p className=" text-white">Unseen Text</p>
        )}
      </button>
      {isOpen && categories && categoryType ? (
        <>
          <button
            tabIndex="-1"
            onClick={toggleIsOpen}
            className="fixed inset-0 h-full w-full bg-transparent cursor-default z-20 focus:outline-none"
          ></button>

          <div className="absolute focus:outline-none left-50 w-40 mt-1 py-1 bg-white rounded-lg shadow-xl text-xs font-light z-20">
            {categories.map((category, index) => (
              <button
                onClick={(e) => {
                  toggleIsOpen(e);
                  onChange(e);
                }}
                type="button"
                key={index}
                value={category.id}
                error={categoryErrors ? "true" : "false"}
                name={categoryType}
                className="focus:outline-none text-left font-light w-full block px-2 py-1 text-gray-800 hover:text-white hover:bg-red-800"
              >
                {category.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export const GET_CATEGORIES = gql`
  {
    getCategories {
      name
      id
      createdAt
    }
  }
`;
