import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { useState } from "react";
import { GET_STUDENTS_BY_MENTOR } from "../../components/admin/Students";
import DashboardStudents from "../../components/mentor/DashboardStudents";
import Footer from "../../components/mentor/Footer";
import NavBar from "../../components/mentor/NavBar";
import WelcomeModal from "../../components/mentor/WelcomeModal";
import LoadingScreen from "../../components/student/LoadingScreen";
import { MentorAuthContext } from "../../context/mentorAuth";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_MENTOR_BY_ID } from "../../pages/admin/AdminUsers";
import { useEffect } from "react";
import ReactGA from "react-ga";

export default function MentorDashboard(props) {
  const { mentor } = useContext(MentorAuthContext);
  var mentorId;
  if (mentor) {
    mentorId = mentor.id;
  } else {
    props.history.push("/loginMentor");
  }
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  var selectedStudentId = props.match.params.studentId;
  const [welcomeIsOpen, setWelcomeIsOpen] = useState(
    selectedStudentId === "welcome" ? true : false
  );
  // console.log(welcomeIsOpen);
  function toggleWelcomeIsOpen(e) {
    e.preventDefault();
    setWelcomeIsOpen(!welcomeIsOpen);
  }
  const { data: { getMentorById: mentorObject } = {} } = useQuery(
    GET_MENTOR_BY_ID,
    {
      variables: { mentorId },
      client: mentorClient,
    }
  );
  const { data: { getStudentsByMentor: addedStudents } = {} } = useQuery(
    GET_STUDENTS_BY_MENTOR,
    {
      variables: { mentorId },
      client: mentorClient,
    }
  );

  const mentorDashboard = mentorObject ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <WelcomeModal
        welcomeIsOpen={welcomeIsOpen}
        toggleWelcomeIsOpen={toggleWelcomeIsOpen}
        mentorObject={mentorObject}
      />
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-8 sm:pl-24 md:pl-32 lg:pl-48 pb-10">
        <p className="text-4xl truncate text-white">Mentor Dashboard</p>
      </div>
      <div className="h-full flex-1 flex mx-8 sm:mx-24 md:mx-32 lg:mx-48 mt-4 my-8">
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
    <LoadingScreen />
  );
  return mentorDashboard;
}
