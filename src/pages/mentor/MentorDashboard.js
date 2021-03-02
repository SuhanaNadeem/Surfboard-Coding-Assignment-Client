import { MentorAuthContext } from "../../context/mentorAuth";
import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/mentor/NavBar";
import { mentorClient } from "../../GraphqlApolloClients";
import Footer from "../../components/mentor/Footer";
import { GET_STUDENTS_BY_MENTOR } from "../../components/admin/Students";
import { GET_MENTOR_BY_ID } from "../../pages/admin/AdminUsers";
import DashboardStudents from "../../components/mentor/DashboardStudents";

export default function MentorDashboard(props) {
  const { mentor } = useContext(MentorAuthContext);

  if (!mentor) {
    props.history.push("/login");
  }
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
    <div className="h-full flex flex-col min-h-screen">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-48 pb-10">
        <p className="text-4xl text-white">Admin Dashboard</p>
      </div>
      <div className="h-full flex-1 flex mx-48 my-8">
        <DashboardStudents
          props={props}
          addedStudents={addedStudents}
          mentor={mentorObject}
        />
      </div>
      <Footer />
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
  return mentorDashboard;
}
