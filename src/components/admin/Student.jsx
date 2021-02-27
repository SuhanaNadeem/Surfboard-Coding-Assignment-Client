import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";

import { MdPerson } from "react-icons/md";
function Student({ student }) {
  return student ? (
    <div className="flex items-start justify-start mb-2">
      <MdPerson size={20} />
      <h3 className="font-semibold mx-1 text-sm uppercase">{student.name}</h3>
    </div>
  ) : (
    <></>
  );
}

export default Student;