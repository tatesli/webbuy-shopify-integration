import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "edu-dev-shop.myshopify.com",
  storefrontAccessToken: "39b5cd1ccff7d43bc2e65fb56c9f5970",
});

export const getProducts = createAsyncThunk(
  "products/getProducts",

  async () => {
    const products = await client.product.fetchAll();
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], isLoading: false },
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

export default productsSlice.reducer;
