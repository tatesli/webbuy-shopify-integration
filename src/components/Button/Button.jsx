import React from "react";
import styles from "../../styles/Button.module.css";

export const ButtonType = {
  primary: "primary",
  default: "default",
  icon: "icon",
  primaryIcon: "primaryIcon",
};

export const Button = ({
  onClick,
  type,
  icon,
  isLoading,
  disabled,
  label,
  children,
  active,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${styles.button}
        ${styles[type]}
        ${disabled ? styles.disabled : ""}
         `}
    >
      {icon ? icon : label}
      {children}
    </button>
  );
};
