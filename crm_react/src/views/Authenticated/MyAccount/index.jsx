import React from "react";
import { useAuth } from "hooks/useAuth";
import { useGetUserQuery } from "reducers/authApiSlice";
import { MyAccountLoader } from "components";
import * as Styles from "./styles";

const MyAccount = () => {
  const authHook = useAuth();
  const { data: auth, isLoading } = useGetUserQuery();
  return (
    <Styles.Wrapper>
      <h1>MyAccount</h1>
      {isLoading ? (
        <MyAccountLoader />
      ) : (
        <Styles.DetailsWrapper>
          <Styles.Details title="true">UserId: </Styles.Details>
          <Styles.Details>{auth?.id}</Styles.Details>
          <Styles.Details title="true">Login: </Styles.Details>{" "}
          <Styles.Details>{auth?.username}</Styles.Details>
        </Styles.DetailsWrapper>
      )}
      <Styles.Button onClick={() => authHook.handleLogOut()}>
        Log out
      </Styles.Button>
    </Styles.Wrapper>
  );
};

export default MyAccount;
