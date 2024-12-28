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

export const getCollections = (state) => state.collections.list;
