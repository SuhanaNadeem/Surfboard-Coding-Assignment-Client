import { MentorAuthContext } from "../../context/mentorAuth";
import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../../components/mentor/NavBar";
import { mentorClient } from "../../GraphqlApolloClients";
import Footer from "../../components/mentor/Footer";
import { GET_MENTOR_BY_ID } from "../admin/AdminUsers";
import EditMentor from "../../components/mentor/EditMentor";
import LoadingIcon from "../../images/tempModuleCardImg.PNG";

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
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end px-12 md:px-32 lg:px-48 pb-10">
        <p className="text-4xl truncate text-white">Mentor Account</p>
      </div>
      <div className="flex flex-1 flex-col mx-12 md:mx-32 lg:mx-48 mt-4 mb-8 justify-start items-center">
        <div className="flex justify-start items-center mb-1">
          <EditMentor mentor={mentorObject} props={props} />
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
  return mentorAccount;
}
