import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "../components/atoms/Menu/Menu.js";
import Dashboard from "./Dasboard.js";
import MyAccount from "./MyAccount/MyAccount.js";
import Leads from "./Leads/Leads.js";
import AddLead from "./AddLeads/AddLead.js";
import GlobalStyle from '../theme/GlobalStyle.js';

const AuthenticatedApp = () => {
    return ( 
         <BrowserRouter>
         <GlobalStyle/>
            <Menu/>
                <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/add-lead" element={<AddLead />}/>
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="*" element={<Navigate to="/my-account"/>} />
            </Routes>
      </BrowserRouter>
      )
    };
export default AuthenticatedApp;