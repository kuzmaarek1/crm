import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "../components/atoms/Menu/Menu.js";
import Dashboard from "./Dasboard.js";
import MyAccount from "./MyAccount/MyAccount.js";
import Leads from "./Leads/Leads.js";
import Teams from "./Teams/Teams.js";
import AddLead from "./AddLead/AddLead.js";
import EditLead from "./EditLead/EditLead.js";
import AddTeam from "./AddTeam/AddTeam.js";
import GlobalStyle from '../theme/GlobalStyle.js';

const AuthenticatedApp = () => {
    return ( 
         <BrowserRouter>
            <GlobalStyle/>
                <Menu/>
                    <Routes>
                        <Route  path="*" element={<Navigate to="/my-account"/>} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/leads" element={<Leads />} />
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/add-lead" element={<AddLead />}/>
                        <Route path="/edit-lead/:id" element={<EditLead />}/>
                        <Route path="/add-team" element={<AddTeam />}/>
                        <Route path="/my-account" element={<MyAccount />} />
                    </Routes>
         </BrowserRouter>
      )
    };
export default AuthenticatedApp;