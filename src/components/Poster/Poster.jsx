import React from "react";

import { Button, ButtonType } from "../Button/Button";

import styles from "./Home.module.css";
import buttonStyles from "../Button/Button.module.css";

import POSTER from "../../assets/images/devices.png";

const Poster = () => {
  return (
    <section className={styles.home}>
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <h1 className={styles.subtitle}>the bestseller of 2024</h1>
          <div className={styles.head}>LENNON r2d2 NVIDIA 5090 TI</div>
          <Button
            className={buttonStyles.button}
            type={ButtonType.primary}
            label="Shop Now"
          />
        </div>
        <div className={styles.image}>
          <img src={POSTER} alt="Poster" />
        </div>
      </div>
    </section>
  );
};

export default Poster;
