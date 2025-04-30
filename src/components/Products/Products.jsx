import React from "react";
import { Link, useParams } from "react-router-dom";

import { cleanProductId } from "../../utils/common";

import styles from "./Products.module.css";

const Products = ({ title, style = {}, products = [], amount }) => {
  const { collectionId } = useParams();
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.products} style={style}>
      <h2>{title}</h2>
      <div className={styles.list}>
        {list.map(({ id, title, image, price }) => (
          <Link
            to={`/products/${cleanProductId(id)}`}
            key={id}
            className={styles.product}
          >
            <div className={styles.imgWrapper}>
              <img className={styles.image} src={image} alt="product" />
            </div>

            <div className={styles.wrapper}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.info}>
                <div className={styles.price}>{price}$</div>
                <div className={styles.oldPrice}>
                  {Math.floor(price * 1.5)}$
                </div>
                <div className={styles.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} people purchased
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
