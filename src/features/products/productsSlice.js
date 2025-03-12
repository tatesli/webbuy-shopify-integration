import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "shopify-buy";

import { shuffle } from "../../utils/common";

const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

export const getProducts = createAsyncThunk(
  "products/getProducts",

  async () => {
    const products = await client.product.fetchAll();
    return products.map((product) => {
      const image = product.images[0]?.src;
      const rawPrice = product.variants[0]?.price?.amount;
      const price = rawPrice ? parseFloat(rawPrice) : 0;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        image,
        price,
        productType: product.productType,
      };
    });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], filtered: [], related: [], isLoading: false },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter((product) => product.price < payload);
    },
    getRelatedByType: (state, { payload }) => {
      const list = state.list.filter(
        (product) => product.productType === payload
      );
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { filterByPrice, getRelatedByType } = productsSlice.actions;

export default productsSlice.reducer;
