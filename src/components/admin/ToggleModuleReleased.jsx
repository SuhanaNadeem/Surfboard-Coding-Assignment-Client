import { gql, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { AdminAuthContext } from "../../context/adminAuth";
import { adminClient } from "../../GraphqlApolloClients";
import {
  GET_MODULES,
  GET_MODULES_BY_ADMIN,
} from "../../pages/admin/AdminDashboard";
import { useForm } from "../../util/hooks";

function ToggleModuleReleased({ module: { id: moduleId, name, released } }) {
  const { admin } = useContext(AdminAuthContext);
  // const [errors, setErrors] = useState({});

  const { values, onSubmit } = useForm(toggleModuleReleasedCallback, {
    moduleId,
  });

  const [toggleModuleReleased] = useMutation(TOGGLE_MODULE_RELEASED, {
    refetchQueries: [
      {
        query: GET_MODULES,
      },
      {
        query: GET_MODULES_BY_ADMIN,
        variables: { adminId: admin && admin.id },
      },
    ],
    // update(proxy, { data: { toggleModuleReleased: moduleData } }) {
    //   setErrors({});
    // },
    // onError(err) {
    //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    // },
    variables: values,
    client: adminClient,
  });

  function toggleModuleReleasedCallback() {
    toggleModuleReleased();
  }

  return module ? (
    <form
      className="md:mx-auto my-8 w-full  overflow-hidden flex flex-col md:flex-row items-center justify-center lg:items-start"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="w-full flex flex-col">
        <h6 className="text-xl text-red-800">Toggle Module Visibility</h6>
        <p className="text-sm font-normal lg:font-light text-left">
          {released
            ? `Hide ${name} from students.`
            : `Make ${name} visible to all students.`}{" "}
          You can change this at any time.
        </p>
      </div>
      <div className="text-right md:text-sm mx-auto mt-4 flex focus:outline-none">
        <button
          type="submit"
          className="flex focus:outline-none border-2 mx-auto border-red-800 px-4 py-2 uppercase text-red-800 rounded-lg  hover:shadow-md hover:bg-red-800 hover:text-white tracking-wide text-sm font-semibold "
        >
          {released ? `Hide` : `Release`}
        </button>
      </div>
    </form>
  ) : (
    <></>
  );
}

const TOGGLE_MODULE_RELEASED = gql`
  mutation toggleModuleReleased($moduleId: String!) {
    toggleModuleReleased(moduleId: $moduleId)
  }
`;

export default ToggleModuleReleased;
