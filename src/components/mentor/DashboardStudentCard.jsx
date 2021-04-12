import React from "react";
import { AiOutlineFundView } from "react-icons/ai";
import AddStudent from "./AddStudent";
import RemoveStudent from "./RemoveStudent";
export default function DashboardStudentCard({
  props,
  student,
  added,
  mentor,
  setIsOpen,
  handleStudentClick,
}) {
  /* Should be able to (1) view the stats from student, inProg + completedMods + answers from admin, 
      (2) add the student, (3) remove the student, (4) see that the student is already "added." */

  return student ? (
    <div>
      <div
        className={`${
          added ? `bg-gray-200` : `bg-white`
        }  flex-shrink-0 first:ml-2 shadow w-40  ease-in-out text-sm font-semibold md:hover:-translate-y-1 align-middle flex flex-col items-center text-center p-4 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 h-full justify-start `}
      >
        {/* <p className="uppercase tracking-wide text-red-800 font-semibold text-md w-40 truncate">
          {badge.name}
        </p> */}
        <p className="text-red-800 uppercase font-sm leading-tight w-32 truncate">
          {student.name}
        </p>
        <p className="font-light mt-1 mb-3 w-32 truncate ">{student.email}</p>
        <div className="flex items-center justify-center">
          <button
            className="hover:text-red-800 focus:outline-none mr-3"
            onClick={(e) => {
              // console.log("clicked");
              setIsOpen(true);
              handleStudentClick(student.id);
              props.history.push(`/mentorDashboard/${student.id}`);
            }}
          >
            <AiOutlineFundView size={20} />
          </button>
          {added ? (
            <RemoveStudent mentor={mentor} student={student} />
          ) : (
            <AddStudent mentor={mentor} student={student} />
          )}
        </div>
        {/* <img
          src={badge.image && badge.image !== "" ? badge.image : "https://li-images.s3.amazonaws.com/3206906234/tempSvg.png"}
          className="object-contain w-full h-14 mt-1"
        /> */}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
