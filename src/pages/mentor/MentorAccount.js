import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import EditMentor from "../../components/mentor/EditMentor";
import Footer from "../../components/mentor/Footer";
import NavBar from "../../components/mentor/NavBar";
import LoadingScreen from "../../components/student/LoadingScreen";
import { MentorAuthContext } from "../../context/mentorAuth";
import { mentorClient } from "../../GraphqlApolloClients";
import { GET_MENTOR_BY_ID } from "../admin/AdminUsers";

export default function MentorAccount(props) {
  const { mentor } = useContext(MentorAuthContext);
  if (!mentor) {
    props.history.push("/login");
  }
  const { data: { getMentorById: mentorObject } = {} } = useQuery(
    GET_MENTOR_BY_ID,
    {
      variables: { mentorId: mentor && mentor.id },

      client: mentorClient,
    }
  );

  const mentorAccount = mentorObject ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end  pl-8 sm:pl-24 md:pl-32 lg:pl-48  pb-10">
        <p className="text-4xl truncate text-white">Mentor Account</p>
      </div>
      <div className="flex flex-1 justify-start items-start my-6  mx-8 sm:mx-24 md:mx-32 lg:mx-48 ">
        <div className="flex justify-start items-center mb-1">
          <EditMentor mentor={mentorObject} props={props} />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <LoadingScreen />
  );
  return mentorAccount;
}
