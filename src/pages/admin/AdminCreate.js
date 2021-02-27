import React, { useContext } from "react";
import NavBar from "../../components/admin/NavBar";
import Footer from "../../components/admin/Footer";
import { AdminAuthContext } from "../../context/adminAuth";
import CreateModule from "../../components/admin/CreateModule";
import CreateQuestion from "../../components/admin/CreateQuestion";
import CreateCategory from "../../components/admin/CreateCategory";
import CreateBadge from "../../components/admin/CreateBadge";
import CreateChallenge from "../../components/admin/CreateChallenge";

export default function AdminCreate(props) {
  console.log("in create");
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const page = props.match.params.page;
  console.log(page);
  return page ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-32 pb-10">
        <p className="text-4xl text-white">Admin Create</p>
      </div>
      {page === "module" && (
        <div className="h-full justify-start items-center flex mx-32 my-10">
          <CreateModule admin={admin} props={props} />
        </div>
      )}
      {page === "question" && (
        <div className="h-full justify-start items-center flex mx-32 my-10">
          <CreateQuestion admin={admin} props={props} />
        </div>
      )}
      {page === "category" && (
        <div className="h-full justify-start items-center flex mx-32 my-10">
          <CreateCategory admin={admin} props={props} />
        </div>
      )}
      {page === "badge" && (
        <div className="h-full justify-start items-center flex mx-32 my-10">
          <CreateBadge admin={admin} props={props} />
        </div>
      )}
      {page === "challenge" && (
        <div className="h-full justify-start items-center flex mx-32 my-10">
          <CreateChallenge admin={admin} props={props} />
        </div>
      )}
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
