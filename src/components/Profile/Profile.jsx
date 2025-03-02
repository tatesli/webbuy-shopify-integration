import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import { logoutUser } from "../../features/user/userSlice";
import { clearCart } from "../../features/cart/cartSlice";
import UserForm from "../User/UserForm";

import styles from "../../styles/Profile.module.css";

const Profile = ({ closeProfile }) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());

    closeProfile();
  };
  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      {user ? (
        <>
          <div className={styles.close} onClick={closeProfile}>
            <svg className={styles.icon}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
            </svg>
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
