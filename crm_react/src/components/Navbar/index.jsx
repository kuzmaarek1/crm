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

  return (
    <Styles.Wrapper>
      <Styles.Title to="/teams">
        {teams.currentTeam && auth
          ? teams.currentTeam.name.length > 15
            ? `${teams.currentTeam.name.substring(0, 15)}...`
            : teams.currentTeam.name
          : "CRM"}
      </Styles.Title>
      {auth && (
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
      )}
    </Styles.Wrapper>
  );
};

export default Navbar;
