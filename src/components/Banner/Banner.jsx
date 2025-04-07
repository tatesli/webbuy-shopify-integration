import React from "react";

import BANNER from "../../images/banner.png";
import { Button, ButtonType } from "../../components/Button/Button";

import styles from "../../styles/Banner.module.css";
import buttonStyles from "../../styles/Button.module.css";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.text}>
          NEW YEAR
          <span>SALE</span>
        </p>
        <Button
          className={buttonStyles.button}
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

export default Banner;
