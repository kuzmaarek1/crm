import React from "react";
import ReactDOM from "react-dom/client";
import Root from "views/Root.js";
import { AuthProvider } from "hooks/useAuth.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>
);
