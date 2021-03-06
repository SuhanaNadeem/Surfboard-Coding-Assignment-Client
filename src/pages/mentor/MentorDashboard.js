import { MentorAuthContext } from "../../context/mentorAuth";
import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/mentor/NavBar";
import { mentorClient } from "../../GraphqlApolloClients";
import Footer from "../../components/mentor/Footer";
import { GET_STUDENTS_BY_MENTOR } from "../../components/admin/Students";
import { GET_MENTOR_BY_ID } from "../../pages/admin/AdminUsers";
import DashboardStudents from "../../components/mentor/DashboardStudents";
import LoadingIcon from "../../images/tempModuleCardImg.PNG";

export default function MentorDashboard(props) {
  const { mentor } = useContext(MentorAuthContext);

  if (!mentor) {
    props.history.push("/loginMentor");
  }
  var selectedStudentId = props.match.params.studentId;

  const {
    data: { getMentorById: mentorObject } = {},
    loading: loadingMentor,
    mentorError,
    refetch: refetchMentor,
  } = useQuery(GET_MENTOR_BY_ID, {
    variables: { mentorId: mentor.id },
    client: mentorClient,
  });
  const {
    data: { getStudentsByMentor: addedStudents } = {},
    loading: loadingAddedStudents,
  } = useQuery(GET_STUDENTS_BY_MENTOR, {
    variables: { mentorId: mentor.id },
    client: mentorClient,
  });

  const mentorDashboard = mentorObject ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end px-12 md:px-32 lg:px-48 pb-10">
        <p className="text-4xl truncate text-white">Mentor Dashboard</p>
      </div>
      <div className="h-full flex-1 flex mx-12 md:mx-32 lg:mx-48 mt-4 my-8">
        <DashboardStudents
          props={props}
          addedStudents={addedStudents}
          mentor={mentorObject}
          selectedStudentId={selectedStudentId}
        />
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
  return mentorDashboard;
}
