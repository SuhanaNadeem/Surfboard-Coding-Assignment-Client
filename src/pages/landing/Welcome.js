import Footer from "../../components/landing/Footer";
import NavBar from "../../components/landing/NavBar";
import React from "react";
// import Typical from "react-typical";
// import { TweenMax, Power3 } from "gsap";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import BackgroundSlider from "react-background-slider";

import Introduction from "../../components/landing/Introduction";
import About from "../../components/landing/About";
import Features from "../../components/landing/Features";
import Connect from "../../components/landing/Connect";

export default function Welcome(props) {
  return (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />

      <div className="h-full flex-1 flex mx-8 sm:mx-24 md:mx-32 lg:mx-48 mb-8">
        <div className="flex items-start justify-start flex-col w-full">
          <Introduction />
          <Features />
          <About />
          <Connect />
        </div>
      </div>
      <Footer />
    </div>
    //   )
    //   : (
    //     <LoadingScreen />
  );
}
