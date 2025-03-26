export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
export const selectCartQuantity = (state) => {
  return state.cart.itemsList.reduce((total, item) => total + item.quantity, 0);
};
export const cleanProductId = (id) => id.replace("gid://shopify/Product/", "");

export const cleanCollectionId = (id) =>
  id.replace("gid://shopify/Collection/", "");
