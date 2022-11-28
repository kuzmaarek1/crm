import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "views/Authenticated/LoginPage/LoginPage.js";
import RegisterPage from "views/Authenticated/RegisterPage/RegisterPage.js";

const AuthenticatedApp = () => {
  return (
    <>
      <Routes>
        <Route path="/login-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/login-in" />} />
        <Route path="/my-account" element={<Navigate to="/login-in" />} />
      </Routes>
    </>
  );
};
export default AuthenticatedApp;
