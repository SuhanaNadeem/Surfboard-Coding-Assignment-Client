import React from "react";
import { adminClient } from "../../GraphqlApolloClients";
import Badge from "./Badge";
import { gql, useQuery } from "@apollo/client";

function Badges({ student }) {
  const { data: { getBadgesByStudent: badges } = {} } = useQuery(
    GET_BADGES_BY_STUDENT,
    {
      variables: { studentId: student.id },
      client: adminClient,
    }
  );
  console.log(badges);
  return badges && badges.length !== 0 ? (
    <div className="mr-2 flex flex-col w-1/2  mt-4">
      <h2 className="text-lg mb-2 text-red-800 ">Badges</h2>

      {badges.map((badge, index) => (
        <Badge key={index} badge={badge} />
      ))}
    </div>
  ) : (
    <></>
  );
}

export default Badges;

export const GET_BADGES_BY_STUDENT = gql`
  query getBadgesByStudent($studentId: String!) {
    getBadgesByStudent(studentId: $studentId) {
      id
      name
      type
      requiredAmount
      adminId
      image
      createdAt
      description
    }
  }
`;
