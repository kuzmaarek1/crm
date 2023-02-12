import React from "react";
import { useAppSelector } from "types/hooks";
import { AuthenticatedApp, UnAuthenticatedApp } from "views";

const Root = () => {
  const auth = useAppSelector((state) => state.auth.authData);
  return auth.auth_token ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
};

export default Root;
