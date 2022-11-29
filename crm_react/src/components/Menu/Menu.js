import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuWrapper, MenuTitle, MenuLinks, MenuLink } from "./Menu.styles.js";
import { getTeam } from "actions/team.js";

const Menu = () => {
  const auth = useSelector((state) => state.auth.authData);
  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.auth_token && !teams.currentTeam) {
      dispatch(getTeam());
    }
  }, [auth?.auth_token]);

  return (
    <MenuWrapper>
      <MenuTitle to="/teams">
        {teams.currentTeam && auth ? teams.currentTeam.name : "CRM"}
      </MenuTitle>
      {auth ? (
        <MenuLinks>
          {teams.currentTeam ? (
            <>
              <MenuLink to="leads">Leads </MenuLink>
              <MenuLink to="teams">Teams </MenuLink>
              <MenuLink to="clients">Clients </MenuLink>
            </>
          ) : (
            <MenuLink to="add-team">Add team</MenuLink>
          )}
          <MenuLink to="my-account">My account </MenuLink>
        </MenuLinks>
      ) : (
        <MenuLinks>
          <MenuLink to="sign-up">Sing up</MenuLink>
          <MenuLink to="login-in">Log in </MenuLink>
        </MenuLinks>
      )}
    </MenuWrapper>
  );
};

export default Menu;
