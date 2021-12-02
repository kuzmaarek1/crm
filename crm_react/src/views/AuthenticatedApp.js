import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "../components/atoms/Menu/Menu.js";
import Dashboard from "./Dasboard.js";
import MyAccount from "./MyAccount.js";
import LoginPage from "./LoginPage.js";
import RegisterPage from "./RegisterPage.js";

const AuthenticatedApp = () => {
    return ( 
         <BrowserRouter>
            <Menu />
                <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="*" element={<Navigate to="/my-account"/>} />
            </Routes>
      </BrowserRouter>
      )
    };
export default AuthenticatedApp;