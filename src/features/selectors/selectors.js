export const getProducts = (state) => state.products.list;

export const getSingleProduct = (state) => state.product.product;

export const getFilteredProducts = (state) => state.products.filtered;

export const getRelatedByTypeProducts = (state) => state.products.related;

export const getCollections = (state) => state.collections.list;

export const getProductsCollection = (state) => state.collectionProducts;

export const getFavorites = (state) => state.favorites.favListItem;

export const getCart = (state) => state.cart;

export const getUser = (state) => state.user;
