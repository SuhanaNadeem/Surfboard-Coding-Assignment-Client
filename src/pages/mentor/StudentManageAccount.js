import React, { useContext, useRef, useState } from "react";
import { MentorAuthContext } from "../../context/mentorAuth";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";

function StudentManageAccount(props) {
  const context = useContext(MentorAuthContext);
  if (context.mentor) {
    props.history.push("/explore");
  }
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginMentorFunc, {
    email: "",
    password: "",
  });

  const [loginMentor, { loading }] = useMutation(LOGIN_MENTOR, {
    update(_, { data: { loginMentor: mentorData } }) {
      context.loginMentor(mentorData);
      props.history.push("/explore");
    },
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
    variables: values,
  });

  function loginMentorFunc() {
    loginMentor();
  }

  return (
    <div className="h-full flex flex-col min-h-screen">MANAGE ACCOUNT</div>
  );
}

export default StudentManageAccount;
