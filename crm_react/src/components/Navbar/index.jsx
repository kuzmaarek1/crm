import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import * as Styles from "./styles";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.authData);
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.auth_token && !teams.currentTeam) {
      dispatch(
        teamsApiSlice.util.prefetch("getTeam", undefined, {
          force: true,
        })
      );
    }
  }, [auth?.auth_token]);

  console.log(teams.currentTeam);
  return (
    <Styles.Wrapper>
      <Styles.Title to="/teams">
        {teams.currentTeam && auth ? teams.currentTeam.name : "CRM"}
      </Styles.Title>
      {auth ? (
        <Styles.Links>
          {teams.currentTeam && (
            <>
              <Styles.Link to="leads">Leads </Styles.Link>
              <Styles.Link to="teams">Teams </Styles.Link>
              <Styles.Link to="clients">Clients </Styles.Link>
            </>
          )}
          <Styles.Link to="my-account">My account </Styles.Link>
        </Styles.Links>
      ) : (
        <Styles.Links>
          <Styles.Link to="sign-up">Sing up</Styles.Link>
          <Styles.Link to="login-in">Log in </Styles.Link>
        </Styles.Links>
      )}
    </Styles.Wrapper>
  );
};

export default Navbar;
