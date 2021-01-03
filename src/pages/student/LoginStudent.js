import React, { useContext, useRef, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
import StudentTitleBar from "../../components/student/StudentTitleBar";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";

function LoginStudent(props) {
  const context = useContext(StudentAuthContext);
  if (context.student) {
    props.history.push("/dashboard");
  }
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginStudentCallback, {
    email: "",
    password: "",
  });

  const [loginStudent, { loading }] = useMutation(LOGIN_STUDENT, {
    update(_, { data: { loginStudent: studentData } }) {
      context.loginStudent(studentData);
      props.history.push("/dashboard");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginStudentCallback() {
    loginStudent();
  }

  return (
    <div className="flex flex-col">
      <StudentTitleBar />
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:max-w-md">
        <form
          onSubmit={onSubmit}
          noValidate
          className="md:flex-grow flex-col overflow-y-auto flex-1 p-8 w-full"
        >
          <div className="my-4 w-full">
            <h4 className="font-thin mt-4 uppercase tracking-wider">Email</h4>
            <div className="border-b-2 py-2 border-gray-700 flex items-center justify-start w-full">
              {/* <MdPersonOutline size={32} /> */}
              <input
                className="w-full focus:outline-none ml-4 text-lg"
                name="email"
                placeholder="Your Email"
                value={values.email}
                onChange={onChange}
                error={errors.email ? "true" : "false"}
                type="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-700 md:text-xs">
                <b>&#33;</b> {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <h4 className="font-thin mt-10 uppercase tracking-wider">
              Password
            </h4>

            <div className="border-b-2 py-2 border-gray-700 flex items-center justify-start w-full">
              {/* <VscKey size={32} /> */}
              <input
                className="w-full focus:outline-none ml-4 text-lg"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={onChange}
                error={errors.password ? "true" : "false"}
                type="password"
              />
            </div>
            {errors.password && (
              <p className="text-red-700 md:text-xs">
                <b>&#33;</b> {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            text-bold
            tracking-wide
            className="focus:outline-none mt-8 uppercase text-md mr-5 w-full text-white bg-red-700 shadow-md border border-red-700  py-2 px-6 rounded-full"
          >
            Log In
          </button>
          <button
            onClick={(e) => {
              props.history.push("/signup");
            }}
            className="mt-2 uppercase text-md mr-5 w-full bg-white text-red-700 text-bold tracking-wide py-2 px-6 rounded-full"
          >
            or Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

const LOGIN_STUDENT = gql`
  mutation loginStudent($email: String!, $password: String!) {
    loginStudent(email: $email, password: $password) {
      id
      email
      name
      orgName
      createdAt
      token
    }
  }
`;

export default LoginStudent;
