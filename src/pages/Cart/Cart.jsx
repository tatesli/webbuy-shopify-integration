import React from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addToCart,
  removeFromCart,
  getCart,
} from "../../features/cart/cartSlice.js";

import { sumBy } from "../../utils/common.js";

import WishlistCart, {
  WishlistCartType,
} from "../../components/WishlistCart/WishlistCart.jsx";

import Layout from "../Layout/Layout";

const Cart = () => {
  const dispatch = useDispatch();

  const { isLoading, itemsList } = useSelector(getCart);

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
    <Layout>
      <WishlistCart
        items={itemsList}
        onRemove={removeFromCart}
        onChangeQuantity={changeQuantity}
        type={WishlistCartType.cart}
        isLoading={isLoading}
        totalPrice={totalPrice}
      />
    </Layout>
  );
};
export default Cart;
