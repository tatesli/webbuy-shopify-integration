import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../styles/Favorites.module.css";

import { getFavorites } from "../../features/selectors/selectors";
import { removeFromFavList } from "../../features/favorites/favoritesSlice";

const cleanId = (id) => id.replace("gid://shopify/Product/", "");

//TODO: Favorites i Cart sa takie same komponenty, utworz common component do prezentacji  favorites i cart

const Favorites = () => {
  const favorites = useSelector(getFavorites);
  console.log(favorites);
  const dispatch = useDispatch();

  return (
    <section className={styles.favorites}>
      <h2>Favorites</h2>
      {!favorites.length ? (
        <p className={styles.empty}>Here is empty</p>
      ) : (
        <>
          <div className={styles.list}>
            {favorites.map((item) => {
              const {
                title,
                productType,
                images = [],
                variants = [],
                id,
              } = item;
              const image = images[0] || "default_image_url.jpg";
              const price = variants[0]?.price || 0;
              const key = cleanId(id);
              return (
                <div className={styles.item} key={key}>
                  <img className={styles.image} src={image} alt={title} />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{productType}</div>
                  </div>
                  <div>{price} $</div>
                  <div
                    className={styles.close}
                    onClick={() => dispatch(removeFromFavList(item.id))}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
