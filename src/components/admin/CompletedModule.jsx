import { useQuery } from "@apollo/client";
import React from "react";
import { BiCheckboxChecked } from "react-icons/bi";
import { adminClient } from "../../GraphqlApolloClients";
import { GET_MODULE_POINTS_BY_STUDENT } from "../../pages/student/StudentModule";

function CompletedModule({ student, module }) {
  const { data: { getModulePointsByStudent: points } = {} } = useQuery(
    GET_MODULE_POINTS_BY_STUDENT,
    {
      variables: {
        moduleId: module && module.id,
        studentId: student && student.id,
      },
      client: adminClient,
    }
  );
  // console.log(module == true);
  // console.log(student == true);
  // console.log(points);
  // console.log(module);

  return points !== undefined && module && student ? (
    <div className="flex items-start justify-start mb-2">
      <BiCheckboxChecked size={24} className="flex-shrink-0" />
      <h3 className="font-semibold mx-1 text-sm w-1/2 md:w-36 leading-tight">
        {module.name}
      </h3>
      <h2 className="font-light text-md lg:text-sm truncate leading-tight w-1/2 md:w-full text-left ">
        ({points} LYNX Tokens)
      </h2>
    </div>
  ) : (
    <></>
  );
}

export default CompletedModule;
