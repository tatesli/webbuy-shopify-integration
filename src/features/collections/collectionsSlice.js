import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN,
});

export const getCollections = createAsyncThunk(
  "collections/getCollections",

  async () => {
    const collections = await client.collection.fetchAll();
    return collections.map((collection) => ({
      id: collection.id,
      title: collection.title,
      image: collection.image ? collection.image.src : null,
    }));
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
export const getAllCollections = (state) => state.collections.list;
