import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { getUser } from "../../features/selectors/selectors";
import { logoutUser } from "../../features/user/userSlice";
import { clearCart } from "../../features/cart/cartSlice";
import UserForm from "../User/UserForm";

import styles from "../../styles/Profile.module.css";
import { CloseIcon } from "../Icons/Icons";

const Profile = ({ closeProfile }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
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
          <div className={styles.close} onClick={closeProfile}>
            <CloseIcon />
          </div>
          <h1 className={styles.title}>Welcome, {user.name}!</h1>
          <div className={styles.links}>
            <Link to={ROUTES.CART}>Your Cart</Link>
            <Link to={ROUTES.FAVORITES}>Your Favorites</Link>
          </div>
          <div className={styles.logout}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <UserForm />
      )}
    </div>
  );
};

export default Profile;
