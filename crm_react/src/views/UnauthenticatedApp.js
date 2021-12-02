import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
                <Route path="login-in" element={<LoginPage />} />
                <Route path="sign-up" element={<RegisterPage />} />
            </Routes>
      </BrowserRouter>
      )
    };
export default AuthenticatedApp;