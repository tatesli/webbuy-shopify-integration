import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Footer.module.css";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "../Icons/Icons";
import LOGO from "../../images/logo.svg";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      <div className={styles.rights}>
        Developed by {""}
        <a href="https://github.com/tatesli">Tetiana Slidenko</a>
      </div>
      <div className={styles.socials}>
        <a href="https://instagram.com">
           <InstagramIcon className={styles.icon} />
        </a>
        <a href="https://facebook.com">
          <FacebookIcon className={styles.icon} />
        </a>
        <a href="https://youtube.com">
          <YoutubeIcon className={styles.icon} />
        </a>
      </div>
    </section>
  );
};

export default Footer;
