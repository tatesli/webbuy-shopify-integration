import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserSignUpForm from "./UserSignUpForm";
import UserLogInForm from "./UserLogInForm";

import styles from "../../styles/User.module.css";

import { toggleForm, toggleFormType } from "../../features/user/userSlice";

const UserForm = () => {
  //TODO: the same
  const { showForm, formType } = useSelector(({ user }) => user);

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
      {formType === "signup" ? (
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
