import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import React from "react"
import ReactGA from "react-ga";
import { useEffect } from "react";
import Introduction from "../components/Introduction";
import { gql, useQuery } from "@apollo/client";
import Topics from "../components/Topics";
import Chat from "../components/Chat";
import EditTopics from "../components/EditTopics";
import AddTopic from "../components/AddTopic";

export default function Welcome(props) {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  const {
    data: { getTopics: topics } = {},
  } = useQuery(GET_TOPICS);
  const {
    data: { getMessages: messages } = {},
  } = useQuery(GET_MESSAGES);
  return (
    <div className="h-full flex flex-col min-h-screen w-full">
      <NavBar props={props} />

      <div className="h-full flex-1 flex mx-8 sm:mx-24 md:mx-32 lg:mx-48 mb-8">
        <div className="flex items-start justify-start flex-col w-full">
          <Introduction />
          <Topics
            props={props}
            topics={topics}
          />
          <AddTopic
            props={props}
            title={""}
            timeEstimate={0}
            imageLink={""}
            description={""}
          />
          <EditTopics
            props={props}
            topics={topics}
          />
          <Chat
            props={props}
            messages={messages}
          />
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const GET_TOPICS = gql`
  query getTopics {
    getTopics {
      id
      title
      timeEstimate
      description
      imageLink
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages {
    getMessages {
      id
      sender
      text
    }
  }
`;