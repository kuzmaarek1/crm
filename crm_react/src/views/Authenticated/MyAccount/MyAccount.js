import React from "react";
import { MyAccountWrapper, MyAccountButton,  DetailsWrapper, DetailsLeadWrapper} from './MyAccount.styles.js';
import { useAuth } from "../../../hooks/useAuth.js";

const MyAccount = () => {
  const auth = useAuth();

  return (
    <MyAccountWrapper>
      <h1>MyAccount</h1>
      <DetailsWrapper>
        <DetailsLeadWrapper title>UserId: </DetailsLeadWrapper><DetailsLeadWrapper>{auth.userid}</DetailsLeadWrapper>
        <DetailsLeadWrapper title>Login: </DetailsLeadWrapper> <DetailsLeadWrapper>{auth.username}</DetailsLeadWrapper>
      </DetailsWrapper>
      <MyAccountButton onClick={auth.logOut}>Log out</MyAccountButton>
    </MyAccountWrapper>
  );
};

export default MyAccount;
