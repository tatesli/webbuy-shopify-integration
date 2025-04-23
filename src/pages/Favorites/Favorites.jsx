import React from "react";
import { useSelector } from "react-redux";

import { getFavorites } from "../../features/favorites/favoritesSlice";
import { removeFromFavList } from "../../features/favorites/favoritesSlice";
import WishlistCart, {
  WishlistCartType,
} from "../../components/WishlistCart/WishlistCart";

import Layout from "../Layout/Layout";

const Favorites = () => {
  const favorites = useSelector(getFavorites);

  return (
    <Layout>
      <WishlistCart
        items={favorites}
        type={WishlistCartType.favorites}
        onRemove={removeFromFavList}
        isLoading={false}
      />
    </Layout>
  );
};

export default Favorites;
