import React from "react";
import POSTER from "../../images/devices.png";

import styles from "../../styles/Home.module.css";

const Poster = () => {
  return (
    <section className={styles.home}>
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}>
        <div className={styles.text}>
          <h1 className={styles.subtitle}>the bestseller of 2024</h1>
          <div className={styles.head}>LENNON r2d2 NVIDIA 5090 TI</div>
          <button className={styles.button}>Shop Now</button>
        </div>
        <div className={styles.image}>
          <img src={POSTER} />
        </div>
      </div>
    </section>
  );
};

export default Poster;
