import React from "react";
import { useSelector } from "react-redux";

import { removeFromFavList } from "../../features/favorites/favoritesSlice";
import WishlistCart, { WishlistCartType } from "../WishlistCart/WishlistCart";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favListItem);

  return (
    <WishlistCart
      items={favorites}
      type={WishlistCartType.favorites}
      onRemove={removeFromFavList}
      isLoading={false}
    />
  );
};

export default Favorites;
