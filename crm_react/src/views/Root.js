import React from "react";
import { useAuth } from "hooks/useAuth.js";
import AuthenticatedApp from "views/AuthenticatedApp.js";
import UnauthenticatedApp from "views/UnauthenticatedApp.js";

const Root = () => {
  const auth = useAuth();
  return (
    <>
      {auth.isAuthenticated && (auth.teamid || auth.teamid === undefined) ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </>
  );
};

export default Root;
