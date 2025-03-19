import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Client from "shopify-buy";

const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

const loadCart = (user) => {
  const key = user ? `cart_user_${user.email}` : "cart_guest";
  const storedCart = localStorage.getItem(key);
  return storedCart ? JSON.parse(storedCart) : [];
};
const saveCart = (itemList, user) => {
  const key = user ? `cart_user_${user.email}` : "cart_guest";
  localStorage.setItem(key, JSON.stringify(itemList));
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
    itemsList: loadCart(null),
    isLoading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      let newCart = state.itemsList.map((item) => {
        if (item.id === action.payload.id) {
          const updatedItem = {
            ...item,
            quantity: action.payload.quantity || 1,
          };
          return updatedItem.quantity === 0 ? null : updatedItem;
        }
        return item;
      });
      newCart = newCart.filter((item) => item.quantity > 0);
      if (!newCart.some((item) => item.id === action.payload.id)) {
        newCart = [...newCart, { ...action.payload, quantity: 1 }];
      }

      saveCart(newCart, null);
      return { ...state, itemsList: newCart };
    },

    removeFromCart: (state, action) => {
      const newCart = state.itemsList.filter(
        (item) => item.id !== action.payload
      );
      saveCart(newCart, null);
      return { ...state, itemsList: newCart };
    },

    switchCartToUser: (state, action) => {
      const user = action.payload;
      const guestCart = loadCart(null);
      const userCart = loadCart(user);
      const mergedCart = [...guestCart];
      userCart.forEach((userItem) => {
        const existingItem = mergedCart.find((item) => item.id === userItem.id);
        if (existingItem) {
          existingItem.quantity += userItem.quantity;
        } else {
          mergedCart.push(userItem);
        }
      });

      saveCart(mergedCart, user);
      localStorage.removeItem("cart_guest");
      return { ...state, itemsList: mergedCart };
    },
    clearCart: (state) => {
      state.itemsList = [];
      localStorage.removeItem("cart_guest");
      localStorage.removeItem("cart_user_" + state.user?.email);
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
    builder.addCase(createCheckout.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { addToCart, removeFromCart, switchCartToUser, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
