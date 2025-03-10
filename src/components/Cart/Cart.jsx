import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart, removeFromCart } from "../../features/cart/cartSlice.jsx";

import { sumBy } from "../../utils/common.js";

import WishlistCart from "../WishlistCart/WishlistCart.jsx";

const Cart = () => {
  const dispatch = useDispatch();

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
    <WishlistCart
      items={itemsList}
      onRemove={removeFromCart}
      onChangeQuantity={changeQuantity}
      type="cart"
      isLoading={isLoading}
      totalPrice={totalPrice}
    />
  );
};
export default Cart;
