import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "../../pages/Routes/Routes";
import { clearCart } from "../../features/cart/cartSlice";
import { getUser } from "../../features/user/userSlice";
import { logoutUser } from "../../features/user/userSlice";

import { Button, ButtonType } from "../Button";
import { UserForm } from "../User";
import styles from "./Profile.module.css";

export const Profile = ({ closeProfile }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    enqueueSnackbar("You have successfully logged out!", {
      variant: "success",
    });
    closeProfile();
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {user ? (
        <>
          <div className={styles.close}>
            <Button
              type={ButtonType.icon}
              icon={<FontAwesomeIcon icon={faClose} />}
              onClick={closeProfile}
            />
          </div>

          <h1 className={styles.title}>Welcome, {user.user?.name}!</h1>
          <div className={styles.links}>
            <Link to={ROUTES.CART}>Your Cart</Link>
            <Link to={ROUTES.FAVORITES}>Your Favorites</Link>
          </div>
          <div className={styles.logout}>
            <Button
              type={ButtonType.primary}
              onClick={handleLogout}
              label="Logout"
            />
          </div>
        </>
      ) : (
        <UserForm />
      )}
    </div>
  );
};
