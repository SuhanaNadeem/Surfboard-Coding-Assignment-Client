import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { GET_ADMIN_BY_ID } from "../../components/admin/AdminInputDropdown";
import EditAdmin from "../../components/admin/EditAdmin";
import Footer from "../../components/admin/Footer";
import NavBar from "../../components/admin/NavBar";
import LoadingScreen from "../../components/student/LoadingScreen";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";

export default function AdminEditAccount(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const { data: { getAdminById: adminObject } = {} } = useQuery(
    GET_ADMIN_BY_ID,
    {
      variables: { adminId: admin && admin.id },
      client: adminClient,
    }
  );
  return adminObject ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end px-12 lg:px-48  pb-10">
        <p className="text-4xl text-white truncate">Admin Edit Account</p>
      </div>
      <div className="flex flex-1 justify-start items-start my-6 mx-12 lg:mx-48 ">
        <EditAdmin admin={adminObject} props={props} />
      </div>
      <Footer />
    </div>
  ) : (
    <LoadingScreen />
  );
}
