import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import NavBar from "../../components/admin/NavBar";
import Footer from "../../components/admin/Footer";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import EditAdmin from "../../components/admin/EditAdmin";
import { GET_ADMIN_BY_ID } from "../../components/admin/AdminInputDropdown";

export default function AdminEditAccount(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const {
    data: { getAdminById: adminObject } = {},
    loading: loadingAdmin,
    error,
  } = useQuery(GET_ADMIN_BY_ID, {
    variables: { adminId: admin.id },
    client: adminClient,
  });
  console.log("on right page");
  return adminObject ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-32 pb-10">
        <p className="text-4xl text-white">Admin Edit Account</p>
      </div>
      <div className="flex justify-start items-center my-6 mx-32">
        <EditAdmin admin={adminObject} props={props} />
      </div>
      <Footer />
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
}
