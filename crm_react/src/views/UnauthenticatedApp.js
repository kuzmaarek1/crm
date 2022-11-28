import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "components/Menu/Menu.js";
import LoginPage from "views/Authenticated/LoginPage/LoginPage.js";
import RegisterPage from "views/Authenticated/RegisterPage/RegisterPage.js";
import GlobalStyle from "theme/GlobalStyle.js";

const AuthenticatedApp = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Menu />
      <Routes>
        <Route path="/login-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login-in" />} />
        <Route path="/my-account" element={<Navigate to="/login-in" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AuthenticatedApp;
