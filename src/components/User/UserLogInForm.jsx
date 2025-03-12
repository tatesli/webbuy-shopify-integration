import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "../../styles/User.module.css";
import { loginUser } from "../../features/user/userSlice";
import { switchCartToUser } from "../../features/cart/cartSlice";

const UserLogInForm = ({ closeForm, toggleCurrentTypeForm }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = users.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password
    );

    if (storedUser) {
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
      dispatch(loginUser(storedUser));
      dispatch(switchCartToUser(storedUser));
      reset();
      closeForm();
    } else {
      setError("server", {
        type: "manual",
        message: "Invalid email or password",
      });
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <input
            type="email"
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
            type="password"
            placeholder="Your password"
            autoComplete="off"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        {errors.server && (
          <p className={styles.error}>{errors.server.message}</p>
        )}
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
