import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { addToCart, removeFromCart } from "../../features/cart/cartSlice.jsx";

import {
  selectIsLoadingCart,
  selectItemsList,
} from "../../features/selectors/selectors.js";
import { sumBy } from "../../utils/common.js";

import styles from "../../styles/Cart.module.css";

const cleanId = (id) => id.replace("gid://shopify/Product/", "");

const Cart = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoadingCart);
  const itemsList = useSelector(selectItemsList);

  const changeQuantity = (item, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart({ ...item, quantity }));
    }
  };

  const totalPrice = sumBy(
    itemsList.map(({ quantity = 1, variants = [] }) => {
      const price = variants[0]?.price || 0;
      return (Number(quantity) || 0) * (Number(price) || 0);
    })
  );
  return (
    <section className={styles.cart}>
      <h2>Your Cart</h2>

      {isLoading && <p>Loading cart...</p>}

      {itemsList.length === 0 ? (
        <p className={styles.empty}>Here is empty</p>
      ) : (
        <>
          <div className={styles.list}>
            {itemsList.map((item) => {
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

                  <div className={styles.price}>{price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(0, quantity - 1))
                      }
                    >
                      {/* TODO: zmiana na https://www.telerik.com/blogs/how-to-use-svg-react albo cos innego (jako ReactComponent) */}
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
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      {/* TODO: the same */}
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.total}>{price * quantity}$</div>
                  <div
                    className={styles.close}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    {/* TODO: the same */}
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
          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:
              <span> {totalPrice}$</span>
            </div>
            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
