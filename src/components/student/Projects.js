import React from "react";
import NavBar from "../components/NavBar";
import ProjectCard from "../components/ProjectCard";
import ProjectsHeader from "../components/ProjectsHeader";
// import doodle from "../images/Doodle6.png";
import thinkTwiceGroup from "../images/thinkTwiceGroup.JPG";
import htn from "../images/htn.jpg";
// import pb from "../images/pb.jpg";
import bib from "../images/bib.jpg";
import walmart from "../images/walmart.jpg";
import wealth from "../images/wealth.jpg";
import kim from "../images/kim.jpg";
import dress from "../images/dress.png";
import doodleLogo from "../images/doodleLogo.jpg";
import Footer from "../components/Footer";
import qkd from "../images/qkd.PNG";

export default function Projects() {
  const projectCards = [
    {
      image: doodleLogo,
      title:
        "Tensorflow 2.2 Challenge: Building AI Responsibly - AI-Generated Google Doodles",
      description:
        "Web app that provides a custom Google Doodles using the subject and event entered, using Machine Learning techniques like Keras Eager Execution and Neural Style Transfer through Tensorflow.",
      gitLink: "https://github.com/SuhanaNadeem/AI-Generated-Google-Doodles",
      ytLink: "https://youtu.be/PzddWB1BojY",
    },
    {
      image: thinkTwiceGroup,
      title: "SHAD York 2019 - ThinkTwice",
      description:
        "Led my design-engineering project group in prototyping and pitching to Angel Investors ThinkTwice, a mobile app that provides environmentally-responsible alternatives to common grocery items. Later integrated this concept into the grocery delivery app I helped develop at BringHome.        ",
      gitLink: "https://github.com/SuhanaNadeem/ThinkTwice-Showcase-Website",
      ytLink: "https://youtu.be/DndYEdzMFhc",
    },
    // {
    //   image: doodle,
    //   title: "Flashed",
    //   description:
    //     "Flutter- and Firebase-powered mobile app which provides weekly news briefings personalized to topics selected by the user, leveraging Cloud Storage and Google APIs.",
    //   gitLink: "https://github.com/SuhanaNadeem/Personalized-Flash-Briefings",
    //   // ytLink: "https://github.com/SuhanaNadeem/AI-Generated-Google-Doodles",
    // },
    {
      image: qkd,
      title: "Quantum Key Distribution (QKD) Simulator",
      description:
        "Simulator that demonstrates how a quantum cryptography technique, called Quantum Key Distribution, works. You can simulate the encryption process with and without an eavesdropper, as per the BB84 Protocol.",
      fileLink: "https://www.suhananadeem.ca/QKDSimulator",
    },
    {
      image: kim,
      title: "Kim Possible Game",
      description:
        "Unique, modular multi-platform game with the theme of the TV Show, Kim Possible, created using PyGame in Python.        ",
      gitLink: "https://github.com/SuhanaNadeem/Kim-Possible-Game",
      ytLink: "https://youtu.be/ZIbPN0OQVr8",
    },

    {
      image: bib,
      title: "Automatic Bibliography Generator",
      description:
        "Program that uses Selenium browser automation to automatically create EasyBib citations given links to sources.",
      gitLink: "https://github.com/SuhanaNadeem/Automatic-Bibliography",
      ytLink: "https://youtu.be/diK7kTe02mk",
    },
    {
      image: dress,
      title: "Dress Smart",
      description:
        "Amazon Alexa Skill made on the Alexa Development Console, which uses Google APIs to allow Alexa users to learn what they should wear based on what the weather is like. ",
      gitLink: "https://github.com/SuhanaNadeem/Dress-Smart-Alexa-Skill",
      // ytLink: "https://github.com/SuhanaNadeem/AI-Generated-Google-Doodles",
    },
    // {
    //   image: pb,
    //   title: "PC Hacks - PB & J",
    //   description:
    //     "Helped develop and pitch a web app that allows people with disabilities to collaborate on daily activities or chores.        ",
    //   devLink: "https://devpost.com/software/pb-j-f4pule",
    // },
    {
      image: htn,
      title: "Hack the North - SprayZ",
      description:
        "Worked with a group of UW students to develop and demonstrate an Augmented Reality app that allows users to “spray paint” on flat surfaces by moving their phone, using Unity.",
      gitLink: "https://github.com/SuhanaNadeem/HackTheNorth2019",
      devLink: "https://devpost.com/software/sprayz",
    },
    {
      image: walmart,
      title: "TKS Walmart Challenge - Proposal for AI Store Assistant",
      description:
        "As a TKS Innovator, I worked in a group to research and develop a solution to tackle the challenge of optimizing shopping at Walmart while decreasing operational costs. Our proposal was focused on adding AI integrations to their new Store Assistant features.",
      fileLink:
        "https://drive.google.com/file/d/1rH5neEpFdIFSup7ogJntQqViakcmD2gc/view?usp=sharing",
    },
    {
      image: wealth,
      title: "TKS Wealthsimple Challenge - Proposal for RESP Growth App",
      description:
        "To promote the Growth of RESPs for this youth-targeted company, I worked with my TKS group to propose an easily-accessible, detailed app targeted towards explaining the RESP mission to low-income families.        ",
      fileLink:
        "https://drive.google.com/file/d/1_TzQ2sqFzdBT8v7iYnqMtEh1SY-fz42M/view?usp=sharing",
    },
  ];

  return (
    <div>
      <NavBar />
      <ProjectsHeader />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-2 gap-4 mx-auto py-4 px-8 md:px-0 w-full md:max-w-2xl xl:max-w-6xl">
        {projectCards.map((projectInfo) => (
          <ProjectCard key={projectInfo.title} projectInfo={projectInfo} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
