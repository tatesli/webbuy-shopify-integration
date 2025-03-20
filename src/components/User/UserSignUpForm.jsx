import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { CloseIcon } from "../Icons/Icons";

import styles from "../../styles/User.module.css";

const UserSignUpForm = ({ closeForm, toggleCurrentTypeForm }) => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const objectURL = URL.createObjectURL(file);
      setAvatar(objectURL);
      localStorage.setItem("avatar", objectURL);
    }
  };

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { ...data, id: data.email, avatar };
    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch(registerUser(newUser));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <CloseIcon />
      </div>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            autoComplete="off"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.group}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="off"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            autoComplete="off"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.group}>
          <input
            type="file"
            name="avatar"
            accept="image/png, image/jpeg, image/gif"
            placeholder="Your avatar URL"
            autoComplete="off"
            onChange={handleFileChange}
          />
          {errors.avatar && (
            <p className={styles.error}>{errors.avatar.message}</p>
          )}
        </div>
        <div
          className={styles.link}
          onClick={() => toggleCurrentTypeForm("login")}
        >
          I already have an account
        </div>
        <button className={styles.submit} onClick={handleSubmit(onSubmit)}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
