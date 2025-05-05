import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Button, ButtonType } from "../Button";
import styles from "./Modal.module.css";

export const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{title}</div>
          <div>
            <Button
              type={ButtonType.icon}
              icon={<FontAwesomeIcon icon={faClose} />}
              onClick={onClose}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
