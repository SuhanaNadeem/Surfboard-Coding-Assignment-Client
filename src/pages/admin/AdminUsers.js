import { AdminAuthContext } from "../../context/adminAuth";
import React, { useContext, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import NavBar from "../../components/admin/NavBar";
import { adminClient } from "../../GraphqlApolloClients";
import StudentCard from "../../components/admin/StudentCard";
import MentorCard from "../../components/admin/MentorCard";
import Footer from "../../components/admin/Footer";
import StudentModal from "../../components/admin/StudentModal";
import { GET_STUDENT_BY_ID } from "../../components/student/ModuleSummaryBar";
import MentorModal from "../../components/admin/MentorModal";

export default function AdminUsers(props) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    props.history.push("/loginAdmin");
  }
  var selectedStudentId;
  var selectedMentorId;
  var selectedId = props.match.params.userId;
  const {
    data: { getStudentById: student } = {},
    loading: loadingStudent,
  } = useQuery(GET_STUDENT_BY_ID, {
    client: adminClient,
    variables: { studentId: selectedId },
  });
  const {
    data: { getMentorById: mentor } = {},
    loading: loadingMentor,
  } = useQuery(GET_MENTOR_BY_ID, {
    client: adminClient,
    variables: { mentorId: selectedId },
  });
  if (student) {
    selectedStudentId = selectedId;
  } else if (mentor) {
    selectedMentorId = selectedId;
  }
  const [activeStudentId, setActiveStudentId] = useState(selectedStudentId);
  const [activeMentorId, setActiveMentorId] = useState(selectedMentorId);

  useEffect(() => {
    setActiveStudentId(selectedStudentId);
  }, [setActiveStudentId, selectedStudentId]);

  useEffect(() => {
    console.log("in mentor's useEffect");
    setActiveMentorId(selectedMentorId);
  }, [setActiveMentorId, selectedMentorId]);
  const [isOpen, setIsOpen] = useState(true);

  const [isMentorOpen, setIsMentorOpen] = useState(true);
  const {
    data: { getStudents: students } = {},
    loading: loadingStudents,
  } = useQuery(GET_STUDENTS, {
    client: adminClient,
  });
  const {
    data: { getMentors: mentors } = {},
    loading: loadingMentors,
  } = useQuery(GET_MENTORS, {
    client: adminClient,
  });

  function handleStudentClick(selectedStudentId) {
    console.log("wb here?");
    setActiveMentorId("");
    if (selectedStudentId) {
      setActiveStudentId(selectedStudentId);
      // refetchStudent({ questionId: selectedStudentId });
      props.history.push(`/adminUsers/${selectedStudentId}`);
    } else {
      setActiveStudentId("");
      props.history.push(`/adminUsers/`);
    }
  }

  function handleMentorClick(selectedMentorId) {
    console.log("comes in here?");
    setActiveStudentId("");

    if (selectedMentorId) {
      setActiveMentorId(selectedMentorId);
      // refetchMentor({ questionId: selectedMentorId });
      props.history.push(`/adminUsers/${selectedMentorId}`);
    } else {
      setActiveMentorId("");
      props.history.push(`/adminUsers/`);
    }
  }

  return students && mentors ? (
    <div className="h-full flex flex-col min-h-screen">
      <NavBar props={props} />
      <div className="bg-red-800 w-full h-32 flex flex-col justify-end pl-48 pb-10">
        <p className="text-4xl text-white">Admin Users</p>
      </div>
      <div className="flex flex-col mx-48 mt-4 mb-8 justify-center items-center">
        <div className="w-full justify-start ">
          <h4 className="text-3xl mt-4">Students</h4>
          <div className="pt-4  grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
            {students.map((student, index) => (
              <StudentCard
                key={index}
                props={props}
                student={student}
                setIsOpen={setIsOpen}
                handleStudentClick={handleStudentClick}
              />
            ))}
          </div>
        </div>
        <div className="w-full justify-start">
          <h4 className="text-3xl mt-6">Mentors</h4>

          <div className="pt-4  grid grid-flow-col gap-2 items-stretch justify-start py-1 overflow-x-auto relative">
            {mentors.map((mentor, index) => (
              <MentorCard
                key={index}
                props={props}
                mentor={mentor}
                setIsMentorOpen={setIsMentorOpen}
                handleMentorClick={handleMentorClick}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <StudentModal
        props={props}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeStudentId={activeStudentId}
        handleStudentClick={handleStudentClick}
      />
      <MentorModal
        props={props}
        isMentorOpen={isMentorOpen}
        setIsMentorOpen={setIsMentorOpen}
        activeMentorId={activeMentorId}
        handleMentorClick={handleMentorClick}
      />
    </div>
  ) : (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <p>LOADING</p>
      </div>
    </div>
  );
}
export const GET_STUDENTS = gql`
  query getStudents {
    getStudents {
      id
      orgName
      name
      password
      email
      inProgressModules
      completedModules
      badges
      starredModules
      starredQuestions
      completedQuestions
      completedSkills
      mentors
      modulePointsDict {
        key
        value
      }
      quesAnsDict {
        id
        key
        value
      }
      createdAt
      token
    }
  }
`;

export const GET_MENTORS = gql`
  query getMentors {
    getMentors {
      id
      name
      orgName
      password
      email
      createdAt
      token
    }
  }
`;
export const GET_MENTOR_BY_ID = gql`
  query getMentorById($mentorId: String!) {
    getMentorById(mentorId: $mentorId) {
      id
      name
      orgName
      password
      email
      createdAt
      token
    }
  }
`;
