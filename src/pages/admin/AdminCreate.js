import React, { useContext, useRef, useState } from "react";
import NavBar from "../../components/admin/NavBar";
import Footer from "../../components/admin/Footer";
import { AdminAuthContext } from "../../context/adminAuth";

function AdminCreate(props) {
  const context = useContext(AdminAuthContext);

  return (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-48 pb-10">
        <p className="text-4xl text-white">Admin Create</p>
      </div>
      <div className="h-full flex-1 flex mx-36 mt-4 mb-8">CREATE</div>
      <Footer />
    </div>
  );
}

export default AdminCreate;
