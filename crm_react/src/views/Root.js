import React from "react";
import { useSelector } from "react-redux";
import AuthenticatedApp from "views/AuthenticatedApp.js";
import UnauthenticatedApp from "views/UnauthenticatedApp.js";

const Root = () => {
  const auth = useSelector((state) => state.auth.authData);
  return <>{auth ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
};

export default Root;
