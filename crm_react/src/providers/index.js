import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store";
import GlobalStyle from "theme/GlobalStyle.js";
import Menu from "components/Menu/Menu.js";

const AppProviders = ({ children }) => (
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <Menu />
      {children}
    </Provider>
  </BrowserRouter>
);

export default AppProviders;
