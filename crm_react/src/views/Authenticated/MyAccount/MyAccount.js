import React from "react";
import { useAuth } from "hooks/useAuth";
import { useGetUserQuery } from "reducers/authApiSlice";
import {
  MyAccountWrapper,
  MyAccountButton,
  DetailsWrapper,
  DetailsLeadWrapper,
} from "./MyAccount.styles.js";

const MyAccount = () => {
  const authHook = useAuth();
  const { data: auth, isLoading } = useGetUserQuery();

  return (
    <MyAccountWrapper>
      <h1>MyAccount</h1>
      <DetailsWrapper>
        <DetailsLeadWrapper title="true">UserId: </DetailsLeadWrapper>
        <DetailsLeadWrapper>{auth?.id}</DetailsLeadWrapper>
        <DetailsLeadWrapper title="true">Login: </DetailsLeadWrapper>{" "}
        <DetailsLeadWrapper>{auth?.username}</DetailsLeadWrapper>
      </DetailsWrapper>
      <MyAccountButton onClick={() => authHook.handleLogOut()}>
        Log out
      </MyAccountButton>
    </MyAccountWrapper>
  );
};

export default MyAccount;
