import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN,
});

export const getProduct = createAsyncThunk(
  "product/getProduct",

  async (productId) => {
    const product = await client.product.fetch(productId);
    const variants = product.variants.map((variant) => {
      const price = parseFloat(variant.price.amount);
      const color = variant.selectedOptions.find(
        (option) => option.name.toLowerCase() === "color"
      )?.value;

      const size = variant.selectedOptions.find(
        (option) => option.name.toLowerCase() === "size"
      )?.value;

      return {
        id: variant.id,
        price,
        color: color || null,
        size: size || null,
      };
    });

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      images: product.images.map((image) => image.src),
      variants,
      productType: product.productType,
    };
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: { product: null, isLoading: false },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.product = payload;
      state.isLoading = false;
    });
    builder.addCase(getProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { clearProduct } = productSlice.actions;
export const getSingleProduct = (state) => state.product.product;
export default productSlice.reducer;
