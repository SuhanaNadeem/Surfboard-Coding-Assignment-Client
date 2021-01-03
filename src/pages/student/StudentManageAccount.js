import React, { useContext, useRef, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";

function StudentManageAccount(props) {
  const context = useContext(StudentAuthContext);

  return (
    <div className="h-full flex flex-col min-h-screen">MANAGE ACCOUNT</div>
  );
}

export default StudentManageAccount;
