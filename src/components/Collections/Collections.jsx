import React from "react";
import { Link } from "react-router-dom";

import { cleanCollectionId } from "../../utils/common";

import styles from "./Collections.module.css";

export const Collections = ({ title, collections = [], amount = 6 }) => {
  const list = collections.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {list.map(({ id, title, image }) => (
          <Link
            to={`/collections/${cleanCollectionId(id)}`}
            className={styles.item}
            key={id}
          >
            <img src={image} alt="collection_img" className={styles.image} />
            <div className={styles.title}>{title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};
