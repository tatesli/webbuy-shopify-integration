import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import styles from "../../styles/User.module.css";

const UserSignUpForm = ({ closeForm, toggleCurrentTypeForm }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { ...data, id: data.email };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch(registerUser(newUser));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className={styles.icon}>
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            autoComplete="off"
            {...register("email", { required: "Email is required" })}
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.group}>
          <input
            type="text"
            name="avatar"
            placeholder="Your avatar URL"
            autoComplete="off"
            {...register("avatar", { required: "Avatar URL is required" })}
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
        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
