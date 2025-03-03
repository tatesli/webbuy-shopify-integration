import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "../../styles/User.module.css";
import { loginUser } from "../../features/user/userSlice";
import { switchCartToUser } from "../../features/cart/cartSlice";

const UserLogInForm = ({ closeForm, toggleCurrentTypeForm }) => {
  const dispatch = useDispatch();
  //TODO: react-hook-form
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = users.find(
      (user) =>
        user.email.toLowerCase() === loginData.email.toLowerCase() &&
        user.password === loginData.password
    );

    if (storedUser) {
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
      dispatch(loginUser(storedUser));
      dispatch(switchCartToUser(storedUser));
      closeForm();
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className={styles.icon}>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <h1 className={styles.title}>Log In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={loginData.email}
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
            value={loginData.password}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div
          className={styles.link}
          onClick={() => toggleCurrentTypeForm("signup")}
        >
          Create an account
        </div>
        <button className={styles.submit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogInForm;
