import React from "react";
import { useSelector } from "react-redux";
import { AuthenticatedApp, UnAuthenticatedApp } from "views";

const Root = () => {
  const auth = useSelector((state) => state.auth.authData);
  return auth?.auth_token ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
};

export default Root;
