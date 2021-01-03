import React, { useEffect, useState, useRef, useContext } from "react";

import { useHistory } from "react-router-dom";
// import NavBarDropdown from "./NavBarDropdown";
import { StudentAuthContext } from "../../context/studentAuth";
import { useForm } from "../../util/hooks";
import { gql, useQuery } from "@apollo/client";
import StudentAccountDropdown from "./AccountDropdown";
import { MdPersonOutline } from "react-icons/md";
import { VscSearch } from "react-icons/vsc";
export default function StudentNavBar(props) {
  const history = useHistory();
  // const [navBar, setNavBar] = useState(false);

  const pageLinksAndTitles = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Learn", link: "/learn" },
    { title: "Search", link: "/search" },
  ];

  const { student, logoutStudent } = useContext(StudentAuthContext);
  // const [errors, setErrors] = useState({});

  // const values = useForm(getStudentCallback);

  // const [getStudent, { loading }] = useMutation(GET_STUDENT, {
  //   onError(err) {
  //     console.log(values);
  //     console.log(err);
  //     setErrors(err.graphQLErrors[0].extensions.exception.errors);
  //     console.log(err.graphQLErrors[0].extensions.exception.errors);
  //   },
  //   variables: values,
  // });

  // function getStudentCallback() {
  //   getStudent();
  // }

  return (
    <div className="bg-black shadow-lg flex items-center justify-center w-full z-10 text-center">
      <nav className="py-4 px-8 md:px-0 flex items-center justify-center  w-full md:max-w-2xl xl:max-w-5xl">
        <div className="w-full flex items-center justify-center font-light text-md text-white ">
          <div className="items-center flex flex-1 h-full md:h-8 justify-start">
            <StudentAccountDropdown props={props} logout={logoutStudent} />
          </div>
          <div className="flex items-center justify-center">
            <p className="mr-2">LYNX Institute</p> <MdPersonOutline size={16} />
          </div>
          <div className="flex-1 flex items-center justify-end">
            {pageLinksAndTitles.map((pageInfo) => (
              <button
                key={pageInfo.title}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(pageInfo.link);
                }}
                className="hover:opacity-75 font-light mr-4 last:mr-2 focus:outline-none"
              >
                {pageInfo.title}
              </button>
            ))}
            <VscSearch size={15} />
          </div>
        </div>
      </nav>
    </div>
  );
}
