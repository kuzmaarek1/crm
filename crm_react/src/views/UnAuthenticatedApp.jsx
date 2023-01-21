import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "views";

const UnAuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/login-in" element={<Auth />} />
      <Route path="/*" element={<Navigate to="/login-in" />} />
    </Routes>
  );
};
export default UnAuthenticatedApp;
