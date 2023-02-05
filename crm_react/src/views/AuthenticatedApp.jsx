import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MyAccount, Leads, Clients, Teams } from "views";

const AuthenticatedApp = () => {
  const teams = useSelector((state) => state.teams);
  return teams?.currentTeam ? (
    <Routes>
      <Route path="/leads" element={<Leads />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="*" element={<Navigate to="/my-account" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="*" element={<Navigate to="/my-account" />} />
    </Routes>
  );
};
export default AuthenticatedApp;
