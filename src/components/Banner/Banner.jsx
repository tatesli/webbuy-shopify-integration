import React from "react";

import BANNER from "../../assets/images/banner.png";
import { Button, ButtonType } from "../Button";

import styles from "./Banner.module.css";
import buttonStyles from "../Button/Button.module.css";

export const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.text}>
          NEW YEAR
          <span>SALE</span>
        </p>
        <Button
          className={`${buttonStyles.button} ${styles.responsiveButton}`}
          type={ButtonType.primary}
          label="See More"
        />
      </div>
      <div className={styles.right}>
        <img src={BANNER} alt="Banner" className={styles.image} />
        <p className={styles.discount}>
          save up to<span> 50%</span> off
        </p>
      </div>
    </section>
  );
};
