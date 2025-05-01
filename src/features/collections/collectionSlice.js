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
      const collection = await client.collection.fetchWithProducts(
        `gid://shopify/Collection/${collectionId}`,
        {
          productsFirst: 100,
        }
      );
      console.log(collection);
      const products = collection.products.map((product) => {
        const image = product.images[0]?.src;
        const rawPrice = product.variants[0]?.price?.amount;
        const price = rawPrice ? parseFloat(rawPrice) : 0;
        const options = product.options.map((option) => {
          return {
            id: option.id,
            name: option.name,
            values: option.values.map((value) => ({
              value: value.value,
              // If you need other properties from the Scalar object, you can add them here
            })),
          };
        });

        return {
          id: product.id,
          title: product.title,
          description: product.description,
          image,
          price,
          productType: product.productType,
          options,
        };
      });

      const availableOptions = products.reduce((acc, product) => {
        product.options.forEach((option) => {
          if (!acc[option.name]) {
            acc[option.name] = new Set();
          }

          option.values.forEach((value) => {
            acc[option.name].add(value.value);
          });
        });

        return acc;
      }, {});

      const uniqueOptions = Object.fromEntries(
        Object.entries(availableOptions).map(([key, value]) => [
          key,
          [...value],
        ])
      );

      return {
        title: collection.title,
        products,
        uniqueOptions,
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
    selectedFilters: {},
    availableOptions: {},
  },
  reducers: {
    setFilter: (state, action) => {
      const { option, value } = action.payload;
      const currentFilters = { ...state.selectedFilters };

      if (currentFilters[option]?.includes(value)) {
        currentFilters[option] = currentFilters[option].filter(
          (filter) => filter !== value
        );
      } else {
        currentFilters[option] = [...(currentFilters[option] || []), value];
      }

      state.selectedFilters = currentFilters;
    },
    resetFilters: (state) => {
      state.selectedFilters = {};
    },
  },
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
      state.availableOptions = action.payload.uniqueOptions;
      state.selectedFilters = {};
    });
    builder.addCase(getCollectionProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.error.message;
    });
  },
});
export default collectionProductsSlice.reducer;

export const { setFilter, resetFilters } = collectionProductsSlice.actions;

export const getProductsCollection = (state) => state.collectionProducts;
export const getAvailableOptions = (state) =>
  state.collectionProducts.availableOptions;
export const getSelectedFilters = (state) =>
  state.collectionProducts.selectedFilters;
