import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Modal } from "../Modal";

export const Profile = ({ onClose, isOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    enqueueSnackbar("You have successfully logged out!", {
      variant: "success",
    });
    onClose();
  };

  if (!user) {
    return null;
  }
  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profile">
      {user ? (
        <>
          <h1 className={styles.title}>Welcome, {user.user?.name}!</h1>
          <div className={styles.links}>
            <Button
              type={ButtonType.default}
              onClick={() => handleLinkClick(ROUTES.CART)}
            >
              Your Cart
            </Button>
            <Button
              type={ButtonType.default}
              onClick={() => handleLinkClick(ROUTES.FAVORITES)}
            >
              Your Favorites
            </Button>
          </div>
          <div className={styles.logout}>
            <Button
              type={ButtonType.primary}
              onClick={handleLogout}
              label="Logout"
              fullWidth
            />
          </div>
        </>
      ) : (
        <UserForm />
      )}
    </Modal>
  );
};
