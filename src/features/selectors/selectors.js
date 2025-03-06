export const getProducts = (state) => state.products.list;

export const getCollections = (state) => state.collections.list;

export const getFilteredProducts = (state) => state.products.filtered;

export const getProductSelector = (state) => state.product.product;

export const getRelatedByTypeSelect = (state) => state.products.related;

export const selectItemsList = (state) => state.cart.itemsList;

export const selectIsLoadingCart = (state) => state.cart.isLoading;

export const selectTitle = (state) => state.collectionProducts.title;

export const selectList = (state) => state.collectionProducts.list;

export const selectIsLoading = (state) => state.collectionProducts.isLoading;

export const selectIsSuccess = (state) => state.collectionProducts.isSuccess;

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export const selectShowForm = (state) => state.user.showForm;

export const selectFormType = (state) => state.user.formType;

export const selectFavorites = (state) => state.favorites.FavListItem;

export const selectUser = (state) => state.user.user;
