import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { formTypes } from "./UserForm";

import styles from "../../styles/User.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonType, ButtonSize } from "../Button/Button";

const UserSignUpForm = ({ closeForm, toggleCurrentTypeForm }) => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);

  const inputFile = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const objectURL = URL.createObjectURL(file);
      setAvatar(objectURL);
    }
  };

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existUser = users.some((user) => user.email === data.email);
    if (existUser) {
      setError("email", {
        type: "manual",
        message: "This email is already registered",
      });
      return;
    }
    const newUser = { ...data, id: data.email, avatar };
    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch(registerUser(newUser));
    closeForm();
  };
  const handleClick = (e) => {
    e.preventDefault();
    inputFile.current.click();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <FontAwesomeIcon icon={faClose} />
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
            ref={inputFile}
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/gif"
            placeholder="Your avatar URL"
            autoComplete="off"
            onChange={handleFileChange}
          />
          <div className={styles.avatar}>
            <div className={styles.img}>
              {avatar ? (
                <img src={avatar || undefined} alt="avatar" />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>
            <Button
              type={ButtonType.default}
              size={ButtonSize.medium}
              onClick={handleClick}
              label="Select Avatar"
            />
          </div>
        </div>
        <div
          className={styles.link}
          onClick={() => toggleCurrentTypeForm(formTypes.login)}
        >
          I already have an account
        </div>
        <Button
          size={ButtonSize.large}
          type={ButtonType.primary}
          onClick={handleSubmit(onSubmit)}
          label="Create an account"
        />
      </form>
    </div>
  );
};

export default UserSignUpForm;
