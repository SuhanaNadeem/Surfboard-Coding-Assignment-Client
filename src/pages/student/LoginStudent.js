import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import StudentTitleBar from "../../components/student/TitleBar";
import { StudentAuthContext } from "../../context/studentAuth";
import robotics from "../../images/robotics.jpg";
import { useForm } from "../../util/hooks";

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

  const [loginStudent] = useMutation(LOGIN_STUDENT, {
    update(_, { data: { loginStudent: studentData } }) {
      context.loginStudent(studentData);
      props.history.push("/dashboard");
    },
    onError(err) {
      // console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginStudentCallback() {
    loginStudent();
  }

  return (
    <div className="flex flex-col w-full">
      <StudentTitleBar />
      <div className="flex w-full flex-col mx-auto pt-10 px-16 sm:px-24 md:px-16 md:flex-row items-center">
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex-col justify-center items-center flex md:pr-8 w-full md:w-96"
        >
          <div className="mb-4 w-full md:w-64">
            <h4 className="font-normal text-lg mt-4 uppercase tracking-wider">
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
              <p className="text-red-800 font-light md:text-xs">
                <b>&#33;</b> {errors.email}
              </p>
            )}
          </div>
          <div className="mb-4 w-full md:w-64">
            <h4 className="font-normal text-lg mt-10 uppercase tracking-wider">
              Password
            </h4>

            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
              {/* <VscKey size={32} /> */}
              <input
                className="w-full focus:outline-none text-lg font-normal"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={onChange}
                error={errors.password ? "true" : "false"}
                type="password"
              />
            </div>
            {errors.password && (
              <p className="text-red-800 font-light md:text-xs">
                <b>&#33;</b> {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            text-bold
            tracking-wide
            className="mt-8 uppercase hover:shadow-lg text-md w-52 md:w-64 flex items-center justify-center  text-white bg-red-800 shadow-md border border-red-800  py-2 px-6 rounded-full focus:outline-none focus:ring"
          >
            Log In
          </button>
          <button
            onClick={(e) => {
              props.history.push("/signup");
            }}
            className="mt-4 hover:opacity-80  uppercase text-md bg-white text-red-800  text-bold tracking-wide px-6 rounded-full focus:text-blue-500 focus:outline-none"
          >
            or Sign Up
          </button>
        </form>
        <div className="flex flex-1 mt-4 md:m-0 items-center  focus:outline-none justify-end flex-shrink-0">
          <img alt="LYNX Logo Large" src={robotics} className="w-full" />
        </div>
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
