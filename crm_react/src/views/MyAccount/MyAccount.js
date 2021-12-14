import React from "react";
import { MyAccountWrapper, MyAccountButton } from './MyAccount.styles.js';
import { useAuth } from "../../hooks/useAuth.js";

const MyAccount = () => {
  const auth = useAuth();

  return (
    <MyAccountWrapper>
      <h1>MyAccount</h1>
      <MyAccountButton onClick={auth.logOut}>Log out</MyAccountButton>
    </MyAccountWrapper>
  );
};

export default MyAccount;
