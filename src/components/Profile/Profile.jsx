import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { getUser } from "../../features/selectors/selectors";

import { logoutUser } from "../../features/user/userSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { CloseIcon } from "../Icons/Icons";
import UserForm from "../User/UserForm";

import styles from "../../styles/Profile.module.css";

const Profile = ({ closeProfile }) => {
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());

    closeProfile();
  };
  //TODO: the same if statement
  // if (!user) {
  //   return null;
  // }
  if (!user) return null;

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
