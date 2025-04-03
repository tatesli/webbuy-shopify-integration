import React from "react";

import { Button, ButtonType, ButtonSize } from "../Button/Button";

import styles from "../../styles/Home.module.css";
import buttonStyles from "../../styles/Button.module.css";

import POSTER from "../../images/devices.png";

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
            size={ButtonSize.medium}
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
