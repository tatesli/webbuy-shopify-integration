import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import { loginUser } from "../../features/user/userSlice";
import { switchCartToUser } from "../../features/cart/cartSlice";

import { Button, ButtonType } from "../Button";
import { formTypes } from "./UserForm";
import styles from "./User.module.css";

const UserLogInForm = ({ closeForm, toggleCurrentTypeForm }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
      enqueueSnackbar("Successfully logged in!", {
        variant: "success",
      });
    } else {
      setError("server", {
        type: "manual",
        message: "Invalid email or password",
      });
      enqueueSnackbar("Login failed!", {
        variant: "error",
      });
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.group}>
        <input
          type="email"
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
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div className={styles.group}>
        <input
          type="password"
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
      {errors.server && <p className={styles.error}>{errors.server.message}</p>}
      <div
        className={styles.link}
        onClick={() => toggleCurrentTypeForm(formTypes.signup)}
      >
        Create an account
      </div>
      <Button
        type={ButtonType.primary}
        onClick={handleSubmit(onSubmit)}
        label="Login"
        fullWidth
      />
    </form>
  );
};

export default UserLogInForm;
