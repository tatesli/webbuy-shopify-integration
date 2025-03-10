import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeFromFavList } from "../../features/favorites/favoritesSlice";
import WishlistCart from "../WishlistCart/WishlistCart";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favListItem);

  return (
    <WishlistCart
      items={favorites}
      type="favorites"
      onRemove={removeFromFavList}
      isLoading={false}
    />
  );
};

export default Favorites;
