import React, { useContext, useRef, useState } from "react";
import { StudentAuthContext } from "../../context/studentAuth";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";

function LoginStudent(props) {
  const context = useContext(StudentAuthContext);
  if (context.student) {
    props.history.push("/explore");
  }
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginStudentFunc, {
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
      if (err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      }
    },
    variables: values,
  });

  function loginStudentFunc() {
    loginStudent();
  }

  return (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:my-8 md:max-w-xs">
        <form
          onSubmit={onSubmit}
          noValidate
          className="md:flex-grow flex-col overflow-y-auto flex-1 p-8 w-full"
        >
          <div className="my-4 w-full">
            <h4 className="font-thin uppercase">Email</h4>
            <div className="border-b-2 py-4 border-gray-400 flex items-center justify-start w-full">
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
              <p className="text-red-500 md:text-xs">
                <b>&#33;</b> {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4 w-full">
            <h4 className="mt-10 font-thin uppercase">Password</h4>

            <div className="border-b-2 py-4 border-gray-400 flex items-center justify-start w-full">
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
              <p className="text-red-500 md:text-xs">
                <b>&#33;</b> {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-8 uppercase text-xl mr-5 w-full bg-blue-700 text-white border border-blue-700 font-light py-2 px-6 rounded-full"
          >
            Log in
          </button>
          <button
            onClick={(e) => {
              props.history.push("/signup");
            }}
            className="mt-2 uppercase text-xl mr-5 w-full bg-white text-blue-700 font-light py-2 px-6 rounded-full"
          >
            or Sign up
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
