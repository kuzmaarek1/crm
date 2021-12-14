import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import AuthenticatedApp from "./AuthenticatedApp.js";
import UnauthenticatedApp from './UnauthenticatedApp.js';

const Root = () => {
  const auth = useAuth();
  return (<>
    {auth.isAuthenticated ? <AuthenticatedApp />: <UnauthenticatedApp />}
    </>
  );
};

export default Root;
