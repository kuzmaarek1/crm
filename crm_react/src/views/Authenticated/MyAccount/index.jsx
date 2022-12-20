import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "reducers/authApiSlice";
import { MyAccountLoader, ModalForm, Button } from "components";
import { useTeams } from "hooks/useTeams";
import * as Styles from "./styles";

const MyAccount = () => {
  const authHook = useAuth();
  const teamsHook = useTeams();
  const teams = useSelector((state) => state.teams);
  const { data: auth, isLoading } = useGetUserQuery();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      <Styles.ButtonWrapper small={teams.currentTeam}>
        {!teams.currentTeam && (
          <>
            <Button height="40px" onClick={() => setModalIsOpen(true)}>
              Add Team
            </Button>
            <ModalForm
              header="Team"
              modalIsOpen={modalIsOpen}
              closeModal={() => setModalIsOpen(false)}
              hook={teamsHook}
            />
          </>
        )}
        <Button
          onClick={() => authHook.handleLogOut()}
          red="true"
          height="40px"
        >
          Log out
        </Button>
      </Styles.ButtonWrapper>
    </Styles.Wrapper>
  );
};

export default MyAccount;
