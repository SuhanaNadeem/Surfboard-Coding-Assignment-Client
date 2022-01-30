import React from "react";
import TopicCard from "./TopicCard";

export default function Topics({ props, topics }) {
  return topics ? (
    <div className="pt-8">
      <h4 className="text-3xl">Agenda Items</h4>

        <div className="pt-4 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {topics.map((topic, index) => (
            <TopicCard key={index} props={props} topic={topic} />
          ))}
        </div>

    </div>
  ) : (
    <div></div>
  );
}
