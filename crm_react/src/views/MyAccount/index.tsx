// @ts-nocheck
import React, { useState } from "react";
import { useAppSelector } from "types/hooks";
import { useAuth } from "hooks/useAuth";
import { useGetUserQuery } from "reducers/authApiSlice";
import { MyAccountLoader, ModalForm, Button } from "components";
import { useTeams } from "hooks/useTeams";
import * as Styles from "./styles";

const MyAccount = () => {
  const authHook = useAuth();
  const teamsHook = useTeams();
  const teams = useAppSelector((state) => state.teams);
  const { data: auth, isLoading } = useGetUserQuery();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <Styles.Wrapper>
      <Styles.Header>MyAccount</Styles.Header>
      {isLoading ? (
        <MyAccountLoader />
      ) : (
        <Styles.DetailsWrapper>
          {Object.entries(auth).map(([key, index]) => (
            <React.Fragment key={key}>
              <Styles.Details boldText={true}>
                {" "}
                {key[0].toUpperCase()}
                {key.slice(1).replace("_", " ")}
              </Styles.Details>
              <Styles.Details>{index}</Styles.Details>
            </React.Fragment>
          ))}
        </Styles.DetailsWrapper>
      )}
      <Styles.ButtonWrapper
        small={typeof teams.currentTeam.id == "number" ? true : false}
      >
        {typeof teams.currentTeam.id != "number" && (
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
          red={true}
          height="40px"
          aria-label="logout-button"
        >
          Log out
        </Button>
      </Styles.ButtonWrapper>
    </Styles.Wrapper>
  );
};

export default MyAccount;
