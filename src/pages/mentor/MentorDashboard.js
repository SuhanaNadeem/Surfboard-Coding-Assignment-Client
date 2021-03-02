import { MentorAuthContext } from "../../context/mentorAuth";
import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../../components/mentor/NavBar";
import { mentorClient } from "../../GraphqlApolloClients";
import Footer from "../../components/mentor/Footer";
export default function MentorDashboard(props) {
  const { mentor } = useContext(MentorAuthContext);

  if (!mentor) {
    props.history.push("/login");
  }

  const mentorDashboard = mentor ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-40 flex items-center justify-start "></div>
      <div className="h-full flex-1 flex mx-48 mt-4 mb-8">HI THERE</div>
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
