import { MentorAuthContext } from "../../context/mentorAuth";
import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../../components/mentor/NavBar";
import { mentorClient } from "../../GraphqlApolloClients";
import Footer from "../../components/mentor/Footer";
import { GET_MENTOR_BY_ID } from "../admin/AdminUsers";
import EditMentor from "../../components/mentor/EditMentor";

export default function MentorAccount(props) {
  const { mentor } = useContext(MentorAuthContext);
  if (!mentor) {
    props.history.push("/login");
  }
  const { data: { getMentorById: mentorObject } = {} } = useQuery(
    GET_MENTOR_BY_ID,
    {
      variables: { mentorId: mentor.id },

      client: mentorClient,
    }
  );

  const mentorAccount = mentorObject ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-48 pb-10">
        <p className="text-4xl text-white">Your Account</p>
      </div>
      <div className="flex flex-col mx-48 mt-4 mb-8 justify-center items-center">
        <div className="flex justify-start items-center mb-1">
          <EditMentor mentor={mentorObject} props={props} />
        </div>
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
  return mentorAccount;
}
