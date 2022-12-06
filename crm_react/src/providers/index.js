import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "theme/GlobalStyle.js";
import Menu from "components/Menu/Menu.js";

const AppProviders = ({ children }) => (
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Toaster />
        <Menu />
        {children}
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

export default AppProviders;
