import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { CloseIcon } from "../Icons/Icons";

import styles from "../../styles/User.module.css";

const UserSignUpForm = ({ closeForm, toggleCurrentTypeForm }) => {
  const dispatch = useDispatch();
  //TODO: react-hook-form
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { ...userData, id: userData.email };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch(registerUser(newUser));
    closeForm();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <CloseIcon className={styles.icon} />
      </div>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={userData.email}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={userData.name}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={userData.password}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="text"
            name="avatar"
            placeholder="Your avatar URL"
            value={userData.avatar}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div
          className={styles.link}
          onClick={() => toggleCurrentTypeForm("login")}
        >
          i already have an account
        </div>
        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
