import React from "react";
import { useSelector } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  MyAccountWrapper,
  MyAccountButton,
  DetailsWrapper,
  DetailsLeadWrapper,
} from "./MyAccount.styles.js";

const MyAccount = () => {
  const auth = useSelector((state) => state.auth.authData.user);
  const authHook = useAuth();
  const navigate = useNavigate;

  return (
    <MyAccountWrapper>
      <h1>MyAccount</h1>
      <DetailsWrapper>
        <DetailsLeadWrapper title>UserId: </DetailsLeadWrapper>
        <DetailsLeadWrapper>{auth?.id}</DetailsLeadWrapper>
        <DetailsLeadWrapper title>Login: </DetailsLeadWrapper>{" "}
        <DetailsLeadWrapper>{auth?.username}</DetailsLeadWrapper>
      </DetailsWrapper>
      <MyAccountButton onClick={() => authHook.handleLogOut(navigate)}>
        Log out
      </MyAccountButton>
    </MyAccountWrapper>
  );
};

export default MyAccount;
