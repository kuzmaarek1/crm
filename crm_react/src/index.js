import React from "react";
import ReactDOM from "react-dom/client";
import Root from "views/Root.js";
import AppProviders from "providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <Root />
    </AppProviders>
  </React.StrictMode>
);
