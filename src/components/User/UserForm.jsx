import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../features/user/userSlice";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";

import { Modal } from "../Modal";
import UserSignUpForm from "./UserSignUpForm";
import UserLogInForm from "./UserLogInForm";

export const formTypes = {
  login: "login",
  signup: "signup",
};

export const UserForm = () => {
  const { formType, showForm } = useSelector(getUser);
  const dispatch = useDispatch();

  const closeForm = () => {
    dispatch(toggleForm(false));
  };
  const toggleCurrentTypeForm = (type) => {
    dispatch(toggleFormType(type));
  };

  return (
    <Modal
      isOpen={showForm}
      onClose={closeForm}
      title={formType === formTypes.signup ? "Sign Up" : "Log In"}
    >
      {formType === formTypes.signup ? (
        <UserSignUpForm
          closeForm={closeForm}
          toggleCurrentTypeForm={toggleCurrentTypeForm}
        />
      ) : (
        <UserLogInForm
          closeForm={closeForm}
          toggleCurrentTypeForm={toggleCurrentTypeForm}
        />
      )}
    </Modal>
  );
};
