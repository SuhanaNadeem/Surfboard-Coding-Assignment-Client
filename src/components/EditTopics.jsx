import React from "react";
import EditTopicCard from "./EditTopicCard";

export default function EditTopics({ props, topics }) {
  return topics ? (
    <div className="pt-8">
      <h4 className="text-3xl">Modify Agenda Items</h4>

        <div className="pt-4 grid grid-flow-col gap-2 items-stretch justify-start py-1 mr-2 overflow-x-auto relative">
          {topics.map((topic, index) => (
            <EditTopicCard key={index} props={props} topic={topic} />
          ))}
        </div>

    </div>
  ) : (
    <div></div>
  );
}
