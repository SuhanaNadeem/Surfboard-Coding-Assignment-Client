import React from "react";
import tempConnectImg from "../../images/try1.PNG";
import { HiOutlineMail } from "react-icons/hi";
export default function Connect() {
  return (
    <div className="flex flex-col items-center w-full justify-center ">
      <h2 className="text-5xl">Contact Us</h2>
      <div className="my-20 flex flex-col xl:flex-row w-full items-center justify-center">
        <div className="flex items-center justify-center pb-10 xl:pb-0 xl:pr-10 w-full">
          <img
            alt="LI Connect Graphic"
            src={tempConnectImg}
            className="h-full rounded-lg  object-cover shadow-lg"
          />
        </div>
        <div className="flex flex-col font-normal lg:font-light text-2xl w-full h-full items-center justify-center xl:items-start">
          <h3 className=" xl:text-left text-center">
            This Node.js- and React-powered web/mobile app is currently curated
            for Team 6378 LYNX's purposes. It can be personalized for any
            organization facing the same struggles training their team that LYNX
            did. Want a platform like LYNX Institute for your own DECA, FIRST,
            MUN, or other team or club? Want to request a walkthrough of LYNX
            Institute to inform your own team training endeavours? Contact us
            at:
          </h3>
          <div className="items-center justify-center xl:justify-start flex md:flex-row flex-col my-4">
            <HiOutlineMail
              size={27}
              className="mr-2 mt-1 hidden md:flex text-red-800 flex-shrink-0"
            />
            <p className="xl:ml-3 text-md font-normal text-red-800 flex items-center justify-center align-middle">
              suhana.nadeemv@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
