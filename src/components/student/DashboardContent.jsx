import React from "react";

import { useHistory } from "react-router-dom";
import CategoryCard from "./CategoryCard";

export default function DashboardContent(props) {
  const history = useHistory();

  const pageLinksAndTitles = [
    { title: "Statistics", link: "/dashboard" },
    { title: "Badges", link: "/dashboard" },
    { title: "Mentors", link: "/dashboard" },
    { title: "Challenges", link: "/dashboard" },
  ];

  return (
    <div className="bg-black text-white flex flex-row items-center justify-center h-screen">
      <CategoryCard />
      <CategoryCard />
    </div>
  );
}
