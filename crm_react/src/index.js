import React from "react";
import ReactDOM from "react-dom/client";
import "animate.css";
import { Root } from "views";
import AppProviders from "providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <Root />
    </AppProviders>
  </React.StrictMode>
);
