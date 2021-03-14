import React from "react";
import LoadingIcon from "../../images/tempModuleCardImg.PNG";

export default function LoadingScreen() {
  return (
    <div className="h-full flex flex-col max-h-screen min-h-screen w-full items-center justify-center">
      <img
        alt="Loading Icon"
        src={LoadingIcon}
        className="h-32 rounded-lg flex-shrink-0 flex-grow-0 animate-pulse"
      />
    </div>
  );
}
