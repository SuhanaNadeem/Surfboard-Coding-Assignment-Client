import { StudentAuthContext } from "../../context/studentAuth";
import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../../components/student/NavBar";
import { studentClient } from "../../GraphqlApolloClients";
import Footer from "../../components/student/Footer";
import { GET_BADGES_BY_STUDENT } from "./StudentDashboard";
import EditStudent from "../../components/student/EditStudent";
import { GET_BADGES } from "../admin/AdminDashboard";
import Progress from "../../components/student/Progress";
import Mentors from "../../components/student/Mentors";
import AccountBadges from "../../components/student/AccountBadges";
import { GET_STUDENT_BY_ID } from "../../components/student/ModuleSummaryBar";
import { GET_MENTORS_BY_STUDENT } from "../../components/admin/Mentors";
import LoadingIcon from "../../images/tempModuleCardImg.PNG";

export default function StudentAccount(props) {
  const { student } = useContext(StudentAuthContext);
  if (!student) {
    props.history.push("/login");
  }
  const { data: { getStudentById: studentObject } = {} } = useQuery(
    GET_STUDENT_BY_ID,
    {
      variables: { studentId: student && student.id },

      client: studentClient,
    }
  );
  const { data: { getMentorsByStudent: mentors } = {} } = useQuery(
    GET_MENTORS_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: studentClient,
    }
  );
  const { data: { getBadgesByStudent: studentBadges } = {} } = useQuery(
    GET_BADGES_BY_STUDENT,
    {
      variables: { studentId: student && student.id },
      client: studentClient,
    }
  );
  const {
    data: { getBadges: allBadges } = {},
    loading: loadingBadges,
  } = useQuery(GET_BADGES, {
    client: studentClient,
  });

  const studentAccount =
    allBadges && mentors && studentBadges && studentObject ? (
      <div className="h-full flex flex-col min-h-screen w-full">
        <NavBar props={props} />
        <div
          className="
        bg-red-800 w-full h-32 flex flex-col justify-end pl-16 lg:pl-48 pb-10"
        >
          <p className="text-4xl text-white">Your Account</p>
        </div>
        <div className="flex flex-col mx-16 lg:mx-48 mt-4 mb-8 justify-center items-center">
          <div className="flex flex-col md:flex-row items-start w-full mt-4 mb-6 justify-start">
            <Progress student={studentObject} />
            <Mentors student={studentObject} />
          </div>
          <div className="w-full">
            {allBadges && allBadges.length !== 0 && (
              <AccountBadges
                props={props}
                allBadges={allBadges}
                studentBadges={studentBadges}
              />
            )}
          </div>

          <div
            className="flex justify-start items-center mt-6"
            id="EditAccount"
          >
            <EditStudent student={studentObject} props={props} />
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <div className="h-full flex flex-col min-h-screen w-full items-center justify-center">
        <div className="uppercase font-light text-lg flex flex-col w-full justify-center items-center">
          {/* <p>loading...</p> */}
          <img
            src={LoadingIcon}
            className="rounded-lg object-contain w-full h-32 p-2"
          />
        </div>
      </div>
    );
  return studentAccount;
}
