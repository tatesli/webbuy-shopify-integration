import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN,
});

export const getCollectionProducts = createAsyncThunk(
  "collectionProducts/getCollectionProducts",

  async (collectionId, { rejectWithValue }) => {
    try {
      const collections = await client.collection.fetchAllWithProducts(
        `gid://shopify/Collection/${collectionId}`
      );
      const collection = collections.find((collection) => {
        return collection.id === `gid://shopify/Collection/${collectionId}`;
      });
      const products = collection.products.map((product) => {
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
      return {
        title: collection.title,
        products,
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
const collectionProductsSlice = createSlice({
  name: "collectionProduct",
  initialState: {
    title: "",
    list: [],
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollectionProducts.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });
    builder.addCase(getCollectionProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.list = action.payload.products;
      state.title = action.payload.title;
    });
    builder.addCase(getCollectionProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.error.message;
    });
  },
});
export default collectionProductsSlice.reducer;
