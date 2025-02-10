import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "edu-dev-shop.myshopify.com",
  storefrontAccessToken: "39b5cd1ccff7d43bc2e65fb56c9f5970",
});

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const createCheckout = createAsyncThunk(
  "cart/createCheckout",

  async () => {
    const checkout = await client.checkout.create();
    return checkout;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    itemsList: loadCartFromLocalStorage(),
    isLoading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action);
      const itemToAdd = {
        ...action.payload,
        quantity: action.payload.quantity || 1,
      };
      const existingItemIndex = state.itemsList.findIndex(
        (item) => item.id === itemToAdd.id
      );
      if (existingItemIndex >= 0) {
        state.itemsList[existingItemIndex].quantity = itemToAdd.quantity;
      } else {
        state.itemsList.push(itemToAdd);
      }
      saveCartToLocalStorage(state.itemsList);
    },

    removeFromCart: (state, action) => {
      state.itemsList = state.itemsList.filter(
        (item) => item.id !== action.payload
      );
      saveCartToLocalStorage(state.itemsList);
    },
    clearCart: (state) => {
      state.itemsList = [];
      saveCartToLocalStorage(state.itemsList);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCheckout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      state.cartId = action.payload.id;
      state.isLoading = false;
    });
    builder.addCase(createCheckout.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartQuantity = (state) => {
  return state.cart.itemsList.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlice.reducer;
