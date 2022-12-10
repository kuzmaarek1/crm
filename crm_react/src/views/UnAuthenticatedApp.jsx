import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "views";

const UnAuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/login-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<RegisterPage />} />
      <Route path="/my-account" element={<Navigate to="/login-in" />} />
      <Route path="/*" element={<Navigate to="/login-in" />} />
    </Routes>
  );
};
export default UnAuthenticatedApp;
