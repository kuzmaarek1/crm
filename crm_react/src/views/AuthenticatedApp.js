import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "../components/Menu/Menu.js";
import MyAccount from "./Authenticated/MyAccount/MyAccount.js";
import Leads from "./Leads/Leads.js";
import Clients from "./Clients/Clients.js";
import Teams from "./Teams/Teams.js";
import AddLead from "./Leads/AddLead/AddLead.js";
import AddClient from "./Clients/AddClient/AddClient.js";
import AddMember from "./Teams/AddMember/AddMember.js";
import EditLead from "./Leads/EditLead/EditLead.js";
import EditClient from "./Clients/EditClient/EditClient.js";
import AddTeam from "./Teams/AddTeam/AddTeam.js";
import GlobalStyle from '../theme/GlobalStyle.js';

const AuthenticatedApp = () => {
    const auth = useAuth();
    console.log(auth.teamname);
    return ( 
         <BrowserRouter>
            <GlobalStyle/>
                <Menu/>
                        {auth.teamname ? ( 
                            <Routes>
                                <Route path="/leads" element={<Leads />} />
                                <Route path="/teams" element={<Teams />} />
                                <Route path="/add-lead" element={<AddLead />}/>
                                <Route path="/edit-lead/:id" element={<EditLead />}/>
                                <Route path="/add-team" element={<AddTeam />}/>
                                <Route path="/add-member/:id" element={<AddMember />}/>
                                <Route path="/clients" element={<Clients />} />
                                <Route path="/add-client" element={<AddClient />}/>
                                <Route path="/edit-client/:id" element={<EditClient />}/>
                                <Route path="/add-team" element={<AddTeam />}/>
                                <Route path="/my-account" element={<MyAccount />} />
                                <Route  path="*" element={<Navigate to="/my-account"/>}/>
                            </Routes>
                        ):(
                            <Routes>
                                <Route path="/my-account" element={<MyAccount />} />
                                <Route path="/add-team" element={<AddTeam />}/>
                                <Route  path="*" element={<Navigate to="/my-account"/>}/>
                            </Routes>
                        )}
         </BrowserRouter>
      )
    };
export default AuthenticatedApp;