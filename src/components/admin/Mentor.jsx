import React from "react";
import { MdPerson } from "react-icons/md";

function Mentor({ mentor }) {
  return mentor ? (
    <div className="flex items-center justify-start mb-2">
      <MdPerson size={20} className="flex-grow-0" />
      <h3 className="font-semibold mx-1 text-sm uppercase">{mentor.name}</h3>
    </div>
  ) : (
    <></>
  );
}

export default Mentor;
