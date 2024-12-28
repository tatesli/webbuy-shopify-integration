export const getProducts = (state) =>
  state.products.list.map((product) => {
    const image = product.images[0]?.src;
    const rawPrice = product.variants[0]?.price?.amount;
    const price = rawPrice ? parseFloat(rawPrice) : 0;
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      image: image,
      price: price,
    };
  });

export const getCollectionsList = (state) => state.collections.list;

export const getCollections = (state) =>
  state.collections.list.map((collection) => {
    return {
      id: collection.id,
      title: collection.title,
      image: collection.image.src,
    };
  });
