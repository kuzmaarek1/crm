import React from "react";
import ReactDOM from "react-dom";
import Root from "./views/Root.js";
import { AuthProvider } from "./hooks/useAuth.js";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
