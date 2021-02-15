import React, { useContext, useRef, useState } from "react";
import NavBar from "../../components/admin/NavBar";
import Footer from "../../components/admin/Footer";
import { AdminAuthContext } from "../../context/adminAuth";

function AdminDashboard(props) {
  const context = useContext(AdminAuthContext);

  return (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-red-800 w-full h-32">ADMIN DASHBOARD</div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;
