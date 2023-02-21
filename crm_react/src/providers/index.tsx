import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "theme/GlobalStyle";
import { Navbar } from "components";
import { theme } from "assets/styles/theme";

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <Toaster />
          <Navbar />
          {children}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

export default AppProviders;
