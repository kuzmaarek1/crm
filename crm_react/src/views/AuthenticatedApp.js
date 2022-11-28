import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.js";
import MyAccount from "views/Authenticated/MyAccount/MyAccount.js";
import Leads from "views/Leads/Leads.js";
import Clients from "views/Clients/Clients.js";
import Teams from "views/Teams/Teams.js";
import AddLead from "views/Leads/AddLead/AddLead.js";
import AddClient from "views/Clients/AddClient/AddClient.js";
import AddMember from "views/Teams/AddMember/AddMember.js";
import EditLead from "views/Leads/EditLead/EditLead.js";
import EditClient from "views/Clients/EditClient/EditClient.js";
import AddTeam from "views/Teams/AddTeam/AddTeam.js";

const AuthenticatedApp = () => {
  const auth = useAuth();
  console.log(auth.teamname);
  return (
    <>
      {auth.teamname ? (
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
