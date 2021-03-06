import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import LoadingIcon from "../../images/tempModuleCardImg.PNG";

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
    variables: { adminId: admin && admin.id },
    client: adminClient,
  });
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
    <div className="h-full flex flex-col min-h-screen w-full items-center justify-center">
      <div className="uppercase font-light text-lg flex flex-col w-full justify-center items-center">
        {/* <p>loading...</p> */}
        <img
          src={LoadingIcon}
          className="rounded-lg object-contain w-full h-32 p-2"
        />
      </div>
    </div>
  );
}
