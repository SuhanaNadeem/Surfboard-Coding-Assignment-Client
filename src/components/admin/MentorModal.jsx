import { useQuery } from "@apollo/client";
import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_MENTOR_BY_ID } from "../../pages/admin/AdminUsers";
import EditMentor from "./EditMentor";
import Students from "./Students";

export default function MentorModal({
  props,
  isMentorOpen,
  setIsMentorOpen,
  activeMentorId,
  handleMentorClick,
}) {
  const { data: { getMentorById: mentor } = {} } = useQuery(GET_MENTOR_BY_ID, {
    variables: { mentorId: activeMentorId },
    client: adminClient,
  });

  return isMentorOpen && mentor ? (
    <>
      <button
        tabIndex="-1"
        onClick={(e) => {
          setIsMentorOpen(false);
          handleMentorClick("");
        }}
        className="fixed inset-0 h-full w-full bg-gray-800 opacity-50 cursor-default z-20"
      ></button>

      <div className="fixed mx-auto inset-0 overscroll-contain overflow-y-auto max-w-2xl my-4 p-8 bg-white z-40 rounded-lg shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-3xl text-red-800">{mentor.name}</h3>
          <h3 className="text-xl my-1 font-semibold">{mentor.orgName}</h3>
          <h3 className="text-lg mb-4 font-light">{mentor.email}</h3>
        </div>
        <div className="flex items-start justify-start">
          <Students mentor={mentor} />
        </div>
        <div className="flex justify-start items-center mt-6">
          <EditMentor mentor={mentor} props={props} />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
