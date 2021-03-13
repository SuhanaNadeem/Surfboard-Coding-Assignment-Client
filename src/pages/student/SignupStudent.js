import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import StudentTitleBar from "../../components/student/TitleBar";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";
import { StudentAuthContext } from "../../context/studentAuth";
import robotics from "../../images/robotics.jpg";
import { useForm } from "../../util/hooks";

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
    <div className="flex flex-col w-full">
      <StudentTitleBar />
      <div className="flex w-full flex-col mx-auto py-10 px-16 md:flex-row">
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex-col justify-center items-center flex md:pr-8 w-96"
        >
          <div className="w-64 mb-6">
            <h4 className="font-thin  uppercase tracking-wider">Name</h4>
            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
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
          <div className="w-64 mb-6">
            <h4 className="font-thin  uppercase tracking-wider">
              Organization
            </h4>
            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
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
            <p className="mt-2 text-gray-700 md:text-xs font-light">
              Use what was indicated by your mentors. Usually the form "FRC
              1234" is suggested.
            </p>
          </div>
          <div className="w-64 mb-6">
            <h4 className="font-thin  uppercase tracking-wider">Email</h4>
            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
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
              <p className="text-red-800 md:text-xs">
                <b>&#33;</b> {errors.email}
              </p>
            )}
          </div>
          <div className=" w-64 mb-6">
            <h4 className="font-thin  uppercase tracking-wider">Password</h4>

            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
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
              <p className="text-red-800 md:text-xs">
                <b>&#33;</b> {errors.password}
              </p>
            )}
          </div>
          <div className=" w-64">
            <h4 className="font-thin  uppercase tracking-wider">
              Confirm Password
            </h4>

            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
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
              <p className="text-red-800 md:text-xs">
                <b>&#33;</b> {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            text-bold
            tracking-wide
            className="mt-8 uppercase hover:shadow-lg text-md w-64 flex items-center justify-center  text-white bg-red-800 shadow-md border border-red-800  py-2 px-6 rounded-full"
          >
            Sign Up
          </button>
          <button
            onClick={(e) => {
              props.history.push("/login");
            }}
            className="mt-4 hover:opacity-80  uppercase text-md bg-white text-red-800 text-bold tracking-wide px-6 rounded-full"
          >
            or Log in
          </button>
        </form>
        <div className="flex flex-1 mt-4 md:m-0 items-center justify-end flex-shrink-0">
          <img src={robotics} className="w-full" />
        </div>
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
