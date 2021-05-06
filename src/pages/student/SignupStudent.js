import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import Footer from "../../components/student/Footer";
import LoadingScreen from "../../components/student/LoadingScreen";
// import LoadingScreen from "../../components/student/LoadingScreen";
import StudentTitleBar from "../../components/student/TitleBar";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";
import { StudentAuthContext } from "../../context/studentAuth";
import loginSignup from "../../images/login.png";
import { useForm } from "../../util/hooks";
import ReactGA from "react-ga";

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

  const [signupStudent, { loading: loadingSignup }] = useMutation(
    SIGNUP_STUDENT,
    {
      update(_, { data: { signupStudent: studentData } }) {
        context.loginStudent(studentData);
        props.history.push("/dashboard/welcome");
        // <LoadingScreen />;
      },
      onError(err) {
        // console.log(values);
        // console.log(err);
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
        // console.log(err.graphQLErrors[0].extensions.exception.errors);
      },
      variables: values,
    }
  );

  function signupStudentCallback() {
    signupStudent();
  }

  return loadingSignup ? (
    <LoadingScreen />
  ) : (
    <div className="h-full flex flex-col min-h-screen w-full">
      <StudentTitleBar />
      <div className="flex w-full flex-col mx-auto py-10 px-16 sm:px-24 md:px-16 md:flex-row items-center">
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex-col justify-center items-center flex md:pr-8 w-full md:w-96"
        >
          <h3 className="text-3xl mb-6 font-normal uppercase lg:font-semibold">
            Student Signup
          </h3>
          <div className="w-full md:w-64 mb-6">
            <h4 className="font-normal text-lg  uppercase tracking-wider">
              Name
            </h4>
            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
              {/* <MdPersonOutline size={32} /> */}
              <input
                className="w-full focus:outline-none text-lg font-normal"
                name="name"
                placeholder="Your Name"
                value={values.name}
                onChange={onChange}
                type="name"
              />
            </div>
          </div>
          <div className="w-full md:w-64 mb-6">
            <h4 className="font-normal text-lg  uppercase tracking-wider">
              Organization
            </h4>
            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
              {/* <MdPersonOutline size={32} /> */}
              <input
                className="w-full focus:outline-none text-lg font-normal"
                name="orgName"
                placeholder="Your Organization"
                value={values.orgName}
                onChange={onChange}
                type="orgName"
              />
            </div>
            <p className="mt-2 text-gray-700 md:text-xs font-light leading-snug">
              For FRC Teams, usually the form "FRC 1234" is used.
            </p>
          </div>
          <div className="w-full md:w-64 mb-6">
            <h4 className="font-normal text-lg  uppercase tracking-wider">
              Email
            </h4>
            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
              {/* <MdPersonOutline size={32} /> */}
              <input
                className="w-full focus:outline-none text-lg font-normal"
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
          <div className=" w-full md:w-64 mb-6">
            <h4 className="font-normal text-lg  uppercase tracking-wider">
              Password
            </h4>

            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
              {/* <VscKey size={32} /> */}
              <input
                className="w-full focus:outline-none text-lg font-normal"
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
          <div className=" w-full md:w-64">
            <h4 className="font-normal text-lg  uppercase tracking-wider">
              Confirm Password
            </h4>

            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
              {/* <VscKey size={32} /> */}
              <input
                className="w-full focus:outline-none text-lg font-normal"
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
            onClick={(e) => {
              ReactGA.event({
                category: "Student",
                action: "Clicked sign up on sign up student page",
              });
            }}
            className="mt-8 uppercase hover:shadow-lg text-md w-64 sm:w-72 md:w-64 flex items-center justify-center focus:ring text-white bg-red-800 shadow-md border border-red-800  py-2 px-6 rounded-full focus:outline-none"
          >
            Sign Up
          </button>
          <button
            onClick={(e) => {
              props.history.push("/login");
            }}
            className="mt-4 hover:opacity-80  uppercase text-md bg-white text-red-800 text-bold tracking-wide px-6 rounded-full focus:text-blue-500 focus:outline-none"
          >
            or Log in
          </button>
        </form>
        <div className="flex flex-1 mt-10 md:m-0 items-center justify-end flex-shrink-0">
          <img alt="LYNX Logo Large" src={loginSignup} className="w-full" />
        </div>
      </div>
      <Footer />
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
