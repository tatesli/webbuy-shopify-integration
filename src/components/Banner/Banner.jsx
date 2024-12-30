import React from "react";

import styles from "../../styles/Banner.module.css";
import BANNER from "../../images/banner.png";

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
