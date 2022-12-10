import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MyAccount,
  Leads,
  Clients,
  Teams,
  AddLead,
  AddClient,
  AddMember,
  EditLead,
  EditClient,
  AddTeam,
} from "views";

const AuthenticatedApp = () => {
  const teams = useSelector((state) => state.teams);
  return (
    <>
      {teams?.currentTeam ? (
        <Routes>
          <Route path="/leads" element={<Leads />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/edit-lead/:id" element={<EditLead />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/add-member/:id" element={<AddMember />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/edit-client/:id" element={<EditClient />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="*" element={<Navigate to="/my-account" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="*" element={<Navigate to="/my-account" />} />
        </Routes>
      )}
    </>
  );
};
export default AuthenticatedApp;
