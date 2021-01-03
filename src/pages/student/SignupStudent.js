import React, { useContext, useRef, useState } from "react";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";
import { StudentAuthContext } from "../../context/studentAuth";
import StudentTitleBar from "../../components/student/StudentTitleBar";

function SignupStudent(props) {
  const context = useContext(StudentAuthContext);
  const [errors, setErrors] = useState({});
  var email = props.match.params.email;

  const { onChange, onSubmit, values } = useForm(signupStudentCallback, {
    email: email || "",
    name: "",
    orgName: "",
    password: "",
    confirmPassword: "",
  });

  const [signupStudent, { loading }] = useMutation(SIGNUP_STUDENT, {
    update(_, { data: { signupStudent: studentData } }) {
      context.loginStudent(studentData);

      props.history.push("/dashboard");
    },
    onError(err) {
      console.log(values);

      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function signupStudentCallback() {
    signupStudent();
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
            <h4 className="font-thin mt-4 uppercase tracking-wider">Name</h4>
            <div className="border-b-2 py-2 border-gray-700 flex items-center justify-start w-full">
              {/* <MdPersonOutline size={32} /> */}
              <input
                className="w-full focus:outline-none text-sm font-thin"
                name="name"
                placeholder="Your Name"
                value={values.name}
                onChange={onChange}
                type="name"
              />
            </div>
          </div>
          <div className="my-4 w-full">
            <h4 className="font-thin mt-10 uppercase tracking-wider">
              Organization
            </h4>
            <div className="border-b-2 py-2 border-gray-700 flex items-center justify-start w-full">
              {/* <MdPersonOutline size={32} /> */}
              <input
                className="w-full focus:outline-none text-sm font-thin"
                name="orgName"
                placeholder="Your Organization"
                value={values.orgName}
                onChange={onChange}
                type="orgName"
              />
            </div>
          </div>
          <div className="my-4 w-full">
            <h4 className="font-thin mt-10 uppercase tracking-wider">Email</h4>
            <div className="border-b-2 py-2 border-gray-700 flex items-center justify-start w-full">
              {/* <MdPersonOutline size={32} /> */}
              <input
                className="w-full focus:outline-none text-sm font-thin"
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
                className="w-full focus:outline-none text-sm font-thin"
                name="password"
                placeholder="Your Password"
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
          <div className="mb-4 w-full">
            <h4 className="font-thin mt-10 uppercase tracking-wider">
              Confirm Password
            </h4>

            <div className="border-b-2 py-2 border-gray-700 flex items-center justify-start w-full">
              {/* <VscKey size={32} /> */}
              <input
                className="w-full focus:outline-none text-sm font-thin"
                name="confirmPassword"
                placeholder="Your Password"
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword ? "true" : "false"}
                type="password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-700 md:text-xs">
                <b>&#33;</b> {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            text-bold
            tracking-wide
            className="mt-8 uppercase text-md mr-5 w-full text-white bg-red-700 shadow-md border border-red-700  py-2 px-6 rounded-full"
          >
            Sign Up
          </button>
          <button
            onClick={(e) => {
              props.history.push("/login");
            }}
            className="mt-2 uppercase text-md mr-5 w-full bg-white text-red-700 text-bold tracking-wide py-2 px-6 rounded-full"
          >
            or Log in
          </button>
        </form>
      </div>
    </div>
  );
}

const SIGNUP_STUDENT = gql`
  mutation signupStudent(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $name: String!
    $orgName: String!
  ) {
    signupStudent(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      name: $name
      orgName: $orgName
    ) {
      id
      email
      name
      orgName
      createdAt
      token
    }
  }
`;

export default SignupStudent;
