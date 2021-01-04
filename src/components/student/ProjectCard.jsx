import React, { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import { AiFillGithub, AiFillYoutube } from "react-icons/ai";
import { FaDev } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function ProjectCard({
  projectInfo: {
    title,
    description,
    image,
    ytLink,
    gitLink,
    devLink,
    fileLink,
  },
}) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div
      data-aos="fade-up"
      className=" bg-white rounded-lg shadow hover:-my-4 hover:shadow-lg w-full h-full flex flex-col items-center justify-start"
    >
      <img
        alt={title}
        className="rounded-lg w-full h-64 object-cover"
        src={image}
      />
      <div className="flex-col flex justify-center items-start px-6 py-4">
        {" "}
        <h2 className="uppercase tracking-wide mt-4 text-blue-600 font-semibold text-md leading-snug w-full">
          {title}
        </h2>
        <p className="tracking-wide font-thin mt-4 mb-4 text-md">
          {description}
        </p>
        <div className="flex items-center justify-center w-full">
          {gitLink && (
            <a
              className="last:mr-0 hover:opacity-75"
              href={gitLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub size={32} />
            </a>
          )}
          {ytLink && (
            <a
              className="ml-4 hover:opacity-75"
              href={ytLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillYoutube size={32} />
            </a>
          )}
          {devLink && (
            <a
              className="ml-4 hover:opacity-75"
              href={fileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDev size={32} />
            </a>
          )}
          {fileLink && (
            <a
              className="ml-4 hover:opacity-75"
              href={fileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiOutlineExternalLink size={32} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
