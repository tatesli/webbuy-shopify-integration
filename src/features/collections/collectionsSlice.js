import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "edu-dev-shop.myshopify.com",
  storefrontAccessToken: "39b5cd1ccff7d43bc2e65fb56c9f5970",
});

export const getCollections = createAsyncThunk(
  "collections/getCollections",

  async () => {
    const collections = await client.collection.fetchAll();
    return collections;
  }
);

const collectionsSlice = createSlice({
  name: "collections",
  initialState: { list: [], isLoading: false },
  extraReducers: (builder) => {
    builder.addCase(getCollections.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCollections.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getCollections.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export default collectionsSlice.reducer;
