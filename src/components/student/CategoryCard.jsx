import React from "react";
import { MdPersonOutline } from "react-icons/md";

import { useHistory } from "react-router-dom";

export default function CategoryCard(props) {
  const history = useHistory();

  const pageLinksAndTitles = [
    { title: "Statistics", link: "/dashboard" },
    { title: "Badges", link: "/dashboard" },
    { title: "Mentors", link: "/dashboard" },
    { title: "Challenges", link: "/dashboard" },
  ];

  return (
    <div className="flex items-center justify-center">
      <MdPersonOutline size={16} />
    <p className="mr-2">LYNX Institute</p> 
  </div>
  );
}
