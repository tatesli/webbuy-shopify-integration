import React from "react";
import styles from "../../styles/Button.module.css";

export const ButtonType = {
  primary: "primary",
  default: "default",
  icon: "icon",
};

export const ButtonSize = {
  small: "small",
  medium: "medium",
  large: "large",
};

export const Button = ({
  onClick,
  type,
  icon,
  size,
  isLoading,
  disabled,
  label,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${styles.button}
        ${styles[type]}
        ${styles[size]}
        ${disabled ? styles.disabled : ""}
         `}
    >
      {icon ? icon : label}
      {children}
    </button>
  );
};
