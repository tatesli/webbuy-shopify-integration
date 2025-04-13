import React from "react";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/index.css";

import { store } from "./features/store";

import App from "./pages/App/App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
