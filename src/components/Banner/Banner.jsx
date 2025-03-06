import React from "react";

import BANNER from "../../images/banner.png";

import styles from "../../styles/Banner.module.css";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.text}>
          NEW YEAR
          <span>SALE</span>
        </p>
        <button className={styles.more}>See More</button>
      </div>
      <div
        className={styles.right}
        //TODO: img
        style={{ backgroundImage: `url(${BANNER})` }}
      >
        <p className={styles.discount}>
          save up to<span> 50%</span> off
        </p>
      </div>
    </section>
  );
};

export default Banner;
