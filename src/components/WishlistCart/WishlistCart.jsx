import React from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import styles from "../../styles/WishlistCart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const cleanId = (id) => id.replace("gid://shopify/Product/", "");

export const WishlistCartType = {
  cart: "cart",
  favorites: "favorites",
};

const WishlistCart = ({
  items,
  type,
  onRemove,
  isLoading,
  onChangeQuantity,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <section className={`${styles.container} ${styles[type]}`}>
      <h2>{type === WishlistCartType.cart ? "Your Cart" : "Favorites"}</h2>

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

                  {type === WishlistCartType.cart && (
                    <div className={styles.quantity}>
                      <div
                        className={styles.minus}
                        onClick={() => {
                          onChangeQuantity(item, Math.max(0, quantity - 1));
                          enqueueSnackbar("Item removed from cart!", {
                            variant: "success",
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                      <span>{quantity}</span>
                      <div
                        className={styles.plus}
                        onClick={() => {
                          onChangeQuantity(item, Math.max(1, quantity + 1));
                          enqueueSnackbar("Item added to cart!", {
                            variant: "success",
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </div>
                  )}

                  {type === WishlistCartType.cart && (
                    <div className={styles.total}>{price * quantity}$</div>
                  )}

                  <div
                    className={styles.close}
                    onClick={() => {
                      dispatch(onRemove(item.id));
                      enqueueSnackbar("Item removed!", {
                        variant: "success",
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </div>
                </div>
              );
            })}
          </div>
          {type === WishlistCartType.cart && (
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
