import React from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, ButtonType } from "../Button";
import styles from "./WishlistCart.module.css";
import { useWindowSize } from "@uidotdev/usehooks";
const cleanId = (id) => id.replace("gid://shopify/Product/", "");

export const WishlistCartType = {
  cart: "cart",
  favorites: "favorites",
  checkout: "checkout",
};

export const WishlistCart = ({
  items,
  type,
  onRemove,
  isLoading,
  onChangeQuantity,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <section className={`${styles.container} ${styles[type]}`}>
      <h2>
        {type === WishlistCartType.cart
          ? "Your Cart"
          : type === WishlistCartType.checkout
          ? "Checkout"
          : "Favorites"}
      </h2>

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
                  <div className={styles.left}>
                    <div className={styles.imageWrapper}>
                      <img className={styles.image} src={image} alt={title} />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.nameWrapper}>
                        <h3 className={styles.name}>{title}</h3>
                        <div className={styles.category}>{productType}</div>
                      </div>
                      <div className={styles.price}>{price} $</div>
                    </div>
                  </div>
                  {(type === WishlistCartType.cart ||
                    type === WishlistCartType.checkout) && (
                    <div className={styles.right}>
                      <div className={styles.quantity}>
                        {type === WishlistCartType.cart ? (
                          <>
                            <Button
                              type={ButtonType.icon}
                              icon={<FontAwesomeIcon icon={faMinus} />}
                              onClick={() => {
                                onChangeQuantity(
                                  item,
                                  Math.max(0, quantity - 1)
                                );
                                enqueueSnackbar("Item removed from cart!", {
                                  variant: "success",
                                });
                              }}
                            />
                            <span>{quantity}</span>
                            <Button
                              type={ButtonType.icon}
                              icon={<FontAwesomeIcon icon={faPlus} />}
                              onClick={() => {
                                onChangeQuantity(
                                  item,
                                  Math.max(1, quantity + 1)
                                );
                                enqueueSnackbar("Item added to cart!", {
                                  variant: "success",
                                });
                              }}
                            />
                          </>
                        ) : (
                          <span>{quantity}</span>
                        )}
                      </div>
                      <div className={styles.total}>{price * quantity}$</div>
                      {type !== WishlistCartType.checkout && (
                        <Button
                          type={ButtonType.icon}
                          icon={<FontAwesomeIcon icon={faClose} />}
                          onClick={() => {
                            dispatch(onRemove(item.id));
                            enqueueSnackbar("Item removed!", {
                              variant: "success",
                            });
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {(type === WishlistCartType.cart ||
            type === WishlistCartType.checkout) && (
            <div className={styles.actions}>
              <div className={styles.total}>
                TOTAL PRICE:
                <span> {totalPrice}$</span>
              </div>
              {type === WishlistCartType.cart && (
                <Button
                  type={ButtonType.primary}
                  label="Proceed to checkout"
                  onClick={() => navigate("/checkout")}
                  fullWidth={width < 640}
                />
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};
