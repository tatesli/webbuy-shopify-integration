import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, ButtonType } from "../Button/Button";
import { ROUTES } from "../../pages/Routes";
import { cleanCollectionId } from "../../utils/common";
import { getAllCollections } from "../../features/collections/collectionsSlice";

import styles from "./Sidebar.module.css";

export const Sidebar = ({ onClose }) => {
  const list = useSelector(getAllCollections);
  const navigate = useNavigate();
  const params = useParams();

  const handleClick = (id) => {
    navigate(`/collections/${cleanCollectionId(id)}`);
    onClose?.();
  };

  return (
    <section
      className={`${styles.sidebar} ${onClose ? styles.modalSidebar : ""}`}
    >
      {!onClose && <h2 className={styles.title}>CATEGORIES</h2>}
      <div className={`${styles.menu} ${onClose ? styles.modalSidebar : ""}`}>
        {/* {list.map(({ id, title }) => (
          <div
            key={id}
            className={`${styles.link} ${
              params.collectionId === cleanCollectionId(id) ? styles.active : ""
            }`}
            onClick={() => handleClick(id)}
          >
            {title}
          </div>
        ))} */}
        {list.map(({ id, title }) => {
          const isActive = params.collectionId === cleanCollectionId(id);

          if (onClose) {
            return (
              <Button
                key={id}
                type={ButtonType.default}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                label={title}
                onClick={() => handleClick(id)}
                fullWidth
              />
            );
          }
          return (
            <div
              key={id}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
              onClick={() => handleClick(id)}
            >
              {title}
            </div>
          );
        })}
      </div>

      {!onClose && (
        <div className={styles.footer}>
          <a className={styles.link} href={ROUTES.HELP}>
            Help
          </a>
          <a className={styles.link} href={ROUTES.TERMS}>
            Terms & Conditions
          </a>
        </div>
      )}
    </section>
  );
};
