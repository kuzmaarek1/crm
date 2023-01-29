import GlobalStyle from "theme/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { store } from "store";
import { theme } from "assets/styles/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "grey",
    values: [
      {
        name: "grey",
        value: "#f7f8fc",
      },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];
