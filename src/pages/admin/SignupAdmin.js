import React, { useContext, useRef, useState } from "react";

import { useForm } from "../../util/hooks";
import { gql, useMutation } from "@apollo/client";
// import { MdPersonOutline } from "react-icons/md";
// import { VscKey } from "react-icons/vsc";
import { AdminAuthContext } from "../../context/adminAuth";

function SignupAdmin(props) {
  const context = useContext(AdminAuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(signupAdminFunc, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signupAdmin, { loading }] = useMutation(SIGNUP_ADMIN, {
    // refetchQueries: [
    //   { query: FETCH_ADMIN_QUERY },
    //   { query: FETCH_ORDERS_BY_ADMIN_QUERY, variables: { status: 0 } },
    // ],
    update(_, { data: { signupAdmin: adminData } }) {
      context.signupAdmin(adminData);

      props.history.push("/adminAccount");
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function signupAdminFunc() {
    signupAdmin();
  }

  return (
    <div className="h-full flex flex-col min-h-screen">
      <div className="flex w-full flex-grow content-start mx-auto flex-wrap md:max-w-xs">
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

          <div className="mb-4 w-full">
            <h4 className="mt-10 font-thin uppercase">Confirm Password</h4>

            <div className="border-b-2 py-4 border-gray-400 flex items-center justify-start w-full">
              {/* <VscKey size={32} /> */}
              <input
                className="w-full focus:outline-none ml-4 text-lg"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword ? "true" : "false"}
                type="password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 md:text-xs">
                <b>&#33;</b> {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-8 uppercase text-xl mr-5 w-full bg-yellow-500 text-white border border-yellow-500 font-light py-2 px-6 rounded-full"
          >
            Sign Up
          </button>

          <button
            onClick={(e) => {
              props.history.push("/login");
            }}
            className="mt-2 uppercase text-xl mr-5 w-full bg-white text-yellow-500 font-light py-2 px-6 rounded-full"
          >
            or Log in
          </button>
        </form>
      </div>
    </div>
  );
}

const SIGNUP_ADMIN = gql`
  mutation signupAdmin(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signupAdmin(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default SignupAdmin;
