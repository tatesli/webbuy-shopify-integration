import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonType } from "../Button";

import styles from "./Poster.module.css";
import buttonStyles from "../Button/Button.module.css";

import POSTER from "../../assets/images/poster.png";

export const Poster = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.home}>
      <h1 className={styles.title}>BIG SALE 20%</h1>
      <div className={styles.product}>
        <div className={styles.text}>
          <h1 className={styles.subtitle}>the bestseller of 2024</h1>
          <div className={styles.head}>IPhone 16 Apple intelligence</div>
          <Button
            className={buttonStyles.button}
            type={ButtonType.primary}
            label="Shop Now"
            onClick={() =>
              navigate("/collections/303382134991/products/7641769705679")
            }
          />
        </div>
        <div className={styles.image}>
          <img src={POSTER} alt="Poster" />
        </div>
      </div>
    </section>
  );
};
