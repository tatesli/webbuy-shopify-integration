import React from "react";
import { useSelector } from "react-redux";

import {
  Layout,
  CheckoutForm,
  WishlistCart,
  WishlistCartType,
} from "../../components";
import { sumBy } from "../../utils/common";
import { getCart } from "../../features/cart/cartSlice";

const Checkout = () => {
  const { isLoading, itemsList } = useSelector(getCart);

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
        type={WishlistCartType.checkout}
        isLoading={isLoading}
        totalPrice={totalPrice}
      />
      <CheckoutForm />
    </Layout>
  );
};

export default Checkout;
