import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  formType: "signup",
  showForm: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.showForm = false;

      localStorage.removeItem("user");
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  toggleForm,
  toggleFormType,
} = userSlice.actions;

export default userSlice.reducer;
export const getUser = (state) => state.user;
