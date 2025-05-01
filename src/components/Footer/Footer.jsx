import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faSquareFacebook,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";

import LOGO from "../../assets/images/logo.svg";
import { ROUTES } from "../../pages/Routes";

import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      {/* <div className={styles.rights}>
        Developed by {""}
        <a href="https://github.com/tatesli">Tetiana Slidenko</a>
      </div> */}
      <div className={styles.socials}>
        <a href="https://instagram.com">
          <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
        </a>
        <a href="https://facebook.com">
          <FontAwesomeIcon
            icon={faSquareFacebook}
            className={styles.socialIcon}
          />
        </a>
        <a href="https://youtube.com">
          <FontAwesomeIcon
            icon={faSquareYoutube}
            className={styles.socialIcon}
          />
        </a>
      </div>
    </section>
  );
};
