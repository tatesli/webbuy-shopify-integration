import React from "react";
import { useDispatch } from "react-redux";

import styles from "../../styles/WishlistCart.module.css";

const cleanId = (id) => id.replace("gid://shopify/Product/", "");

const WishlistCart = ({
  items,
  type,
  onRemove,
  isLoading,
  onChangeQuantity,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  return (
    <section className={`${styles.container} ${styles[type]}`}>
      <h2>{type === "cart" ? "Your Cart" : "Favorites"}</h2>

      {isLoading && <p>Loading {type}...</p>}

      {items.length === 0 ? (
        <p className={styles.empty}>Here is empty</p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => {
              const {
                title,
                productType,
                images = [],
                variants = [],
                id,
                quantity = 1,
              } = item;
              const image = images[0] || "default_image_url.jpg";
              const price = variants[0]?.price || 0;
              const uniqueId = cleanId(id);
              const key = `${uniqueId}-${quantity}`;

              return (
                <div className={styles.item} key={key}>
                  <img className={styles.image} src={image} alt={title} />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{productType}</div>
                  </div>
                  <div>{price} $</div>

                  {type === "cart" && (
                    <div className={styles.quantity}>
                      <div
                        className={styles.minus}
                        onClick={() =>
                          onChangeQuantity(item, Math.max(0, quantity - 1))
                        }
                      >
                        <svg className="icon">
                          <use
                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                          />
                        </svg>
                      </div>
                      <span>{quantity}</span>
                      <div
                        className={styles.plus}
                        onClick={() =>
                          onChangeQuantity(item, Math.max(1, quantity + 1))
                        }
                      >
                        <svg className="icon">
                          <use
                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {type === "cart" && (
                    <div className={styles.total}>{price * quantity}$</div>
                  )}

                  <div
                    className={styles.close}
                    onClick={() => dispatch(onRemove(item.id))}
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

          {type === "cart" && (
            <div className={styles.actions}>
              <div className={styles.total}>
                TOTAL PRICE:
                <span> {totalPrice}$</span>
              </div>
              <button className={styles.proceed}>Proceed to checkout</button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default WishlistCart;
