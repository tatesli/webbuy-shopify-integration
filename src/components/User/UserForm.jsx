import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserSignUpForm from "./UserSignUpForm";
import UserLogInForm from "./UserLogInForm";
import { getUser } from "../../features/selectors/selectors";

import styles from "../../styles/User.module.css";

import { toggleForm, toggleFormType } from "../../features/user/userSlice";
export const formTypes = {
  login: "login",
  signup: "signup",
};
const UserForm = () => {
  const { formType, showForm } = useSelector(getUser);
  const dispatch = useDispatch();

  const closeForm = () => {
    dispatch(toggleForm(false));
  };

  const toggleCurrentTypeForm = (type) => {
    dispatch(toggleFormType(type));
  };

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
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
    </>
  ) : (
    <></>
  );
};

export default UserForm;
