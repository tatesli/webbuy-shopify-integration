import React from "react";
import { Link } from "react-router-dom";

import { collectionId } from "../Sidebar/Sidebar";

import styles from "../../styles/Collections.module.css";

const Collections = ({ title, collections = [], amount }) => {
  const list = collections.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {list.map(({ id, title, image }) => (
          <Link
            to={`/collections/${collectionId(id)}`}
            className={styles.item}
            key={id}
          >
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className={styles.title}>{title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Collections;
