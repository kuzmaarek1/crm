import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "views";

const UnAuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/login-in" element={<LoginPage />} />
      <Route path="/*" element={<Navigate to="/login-in" />} />
    </Routes>
  );
};
export default UnAuthenticatedApp;
