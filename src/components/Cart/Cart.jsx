import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../styles/Cart.module.css";
import { CloseIcon, MinusIcon, PlusIcon } from "../Icons/Icons.jsx";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice.jsx";

import { sumBy } from "../../utils/common.js";

const cleanId = (id) => id.replace("gid://shopify/Product/", "");

const Cart = () => {
  const dispatch = useDispatch();
  //TODO:
  // The function below is called a selector and allows us to select a value from
  // the state. Selectors can also be defined inline where they're used instead of
  //  in the slice file. For example: `useSelector((state) => state.counter.value)`
  // export const selectCount = (state) => state.counter.value // w slice eg: https://redux-toolkit.js.org/tutorials/quick-start#what-youve-learned
  const { itemsList = [], isLoading } = useSelector((state) => state.cart);
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
                      <MinusIcon />
                    </div>
                    <span>{quantity}</span>
                    <div
                      className={styles.plus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <PlusIcon />
                    </div>
                  </div>
                  <div className={styles.total}>{price * quantity}$</div>
                  <div
                    className={styles.close}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <CloseIcon />
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
