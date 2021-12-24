import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "../components/atoms/Menu/Menu.js";
import Dashboard from "./Dasboard.js";
import MyAccount from "./MyAccount/MyAccount.js";
import Leads from "./Leads/Leads.js";
import Teams from "./Teams/Teams.js";
import AddLead from "./AddLead/AddLead.js";
import AddMember from "./AddMember/AddMember.js";
import EditLead from "./EditLead/EditLead.js";
import AddTeam from "./AddTeam/AddTeam.js";
import GlobalStyle from '../theme/GlobalStyle.js';

const AuthenticatedApp = () => {
    const auth = useAuth();
    return ( 
         <BrowserRouter>
            <GlobalStyle/>
                <Menu/>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/leads" element={<Leads />} />
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/add-lead" element={<AddLead />}/>
                        <Route path="/edit-lead/:id" element={<EditLead />}/>
                        <Route path="/add-team" element={<AddTeam />}/>
                        <Route path="/add-member/:id" element={<AddMember />}/>
                        <Route path="/my-account" element={<MyAccount />} />
                        <Route  path="*" element={<Navigate to="/my-account"/>}/>
                    </Routes>
         </BrowserRouter>
      )
    };
export default AuthenticatedApp;