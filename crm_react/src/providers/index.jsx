import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "theme/GlobalStyle";
import Menu from "components/Navbar";
import { theme } from "assets/styles/theme";

const AppProviders = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <Toaster />
          <Menu />
          {children}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

export default AppProviders;
