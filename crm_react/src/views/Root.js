import React from "react";
import { useSelector } from "react-redux";
import AuthenticatedApp from "views/AuthenticatedApp.js";
import UnAuthenticatedApp from "views/UnAuthenticatedApp.js";

const Root = () => {
  const auth = useSelector((state) => state.auth.authData);
  return (
    <>{auth?.auth_token ? <AuthenticatedApp /> : <UnAuthenticatedApp />}</>
  );
};

export default Root;
