import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import AdminTitleBar from "../../components/admin/TitleBar";
import { AdminAuthContext } from "../../context/adminAuth";
import robotics from "../../images/robotics.jpg";
import { useForm } from "../../util/hooks";

function LoginAdmin(props) {
  const context = useContext(AdminAuthContext);
  if (context.admin) {
    props.history.push("/adminDashboard");
  }
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginAdminCallback, {
    email: "",
    password: "",
  });

  const [loginAdmin] = useMutation(LOGIN_ADMIN, {
    update(_, { data: { loginAdmin: adminData } }) {
      context.loginAdmin(adminData);
      props.history.push("/adminDashboard");
    },
    onError(err) {
      // console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginAdminCallback() {
    loginAdmin();
  }

  return (
    <div className="flex flex-col w-full">
      <AdminTitleBar />
      <div className="flex w-full flex-col mx-auto py-10 px-16 sm:px-24 md:px-16 md:flex-row">
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex-col justify-center items-center flex md:pr-8 w-full md:w-96"
        >
          <div className="mb-4 w-full md:w-64">
            <h4 className="font-thin mt-4 uppercase tracking-wider">Email</h4>
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
          <div className="mb-4 w-full md:w-64">
            <h4 className="font-thin mt-10 uppercase tracking-wider">
              Password
            </h4>

            <div className="border-b-2 py-2 border-gray-300 flex items-center justify-start w-full">
              {/* <VscKey size={32} /> */}
              <input
                className="w-full focus:outline-none text-sm font-thin"
                name="password"
                placeholder="Password"
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
          <button
            type="submit"
            className="mt-8 uppercase hover:shadow-lg text-md w-64 sm:w-72 md:w-64 flex items-center justify-center  text-white bg-red-800 shadow-md border border-red-800  py-2 px-6 rounded-full focus:outline-none focus:ring"
          >
            Log In
          </button>
          <button
            onClick={(e) => {
              props.history.push("/signupAdmin");
            }}
            className="mt-4 hover:opacity-80  uppercase text-md bg-white text-red-800 text-bold tracking-wide px-6 rounded-full focus:text-blue-500 focus:outline-none"
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

const LOGIN_ADMIN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      id
      email
      name
      createdAt
      token
    }
  }
`;

export default LoginAdmin;
