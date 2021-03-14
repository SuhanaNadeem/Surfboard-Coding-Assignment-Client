import React, { useContext } from "react";
import NavBar from "../../components/admin/NavBar";
import Footer from "../../components/admin/Footer";
import { AdminAuthContext } from "../../context/adminAuth";
import CreateModule from "../../components/admin/CreateModule";
import CreateQuestion from "../../components/admin/CreateQuestion";
import CreateCategory from "../../components/admin/CreateCategory";
import CreateBadge from "../../components/admin/CreateBadge";
import CreateChallenge from "../../components/admin/CreateChallenge";
import LoadingScreen from "../../components/student/LoadingScreen";

export default function AdminCreate(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  const page = props.match.params.page;
  // console.log(page);
  return page ? (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-12 md:pl-32 lg:pl-48 xl:pl-56  pb-10">
        <p className="text-4xl text-white">Admin Create</p>
      </div>
      {page === "module" && (
        <div className="flex-1 h-full justify-start items-start flex mx-12 md:mx-32 lg:mx-48 xl:mx-56 my-10">
          <CreateModule admin={admin} props={props} />
        </div>
      )}
      {page === "question" && (
        <div className="flex-1 h-full justify-start items-center flex mx-12 md:mx-32 lg:mx-48 xl:mx-56 my-10">
          <CreateQuestion admin={admin} props={props} />
        </div>
      )}
      {page === "category" && (
        <div className="flex-1 h-full justify-start items-start flex mx-12 md:mx-32 lg:mx-48 xl:mx-56 my-10">
          <CreateCategory admin={admin} props={props} />
        </div>
      )}
      {page === "badge" && (
        <div className="flex-1 h-full justify-start items-center flex mx-12 md:mx-32 lg:mx-48 xl:mx-56 my-10">
          <CreateBadge admin={admin} props={props} />
        </div>
      )}
      {page === "challenge" && (
        <div className="flex-1 h-full justify-start items-center flex mx-12 md:mx-32 lg:mx-48 xl:mx-56 my-10">
          <CreateChallenge admin={admin} props={props} />
        </div>
      )}
      <Footer />
    </div>
  ) : (
    <LoadingScreen />
  );
}
