import React from "react";
import { useAuth } from "../../../hooks/useAuth.js";
import { MenuWrapper, MenuTitle, MenuLinks, MenuLink } from './Menu.styles.js';

const Menu = () => {
  const auth = useAuth();
  return (
    <MenuWrapper>
        <MenuTitle to="/">
        CRM
      </MenuTitle>
      {auth.isAuthenticated ? ( 
          <MenuLinks>
            <MenuLink to="leads">Leads </MenuLink>
            <MenuLink to="teams">Teams </MenuLink>
            <MenuLink to="my-account">My account </MenuLink>
          </MenuLinks>
         ):(
          <MenuLinks>
            <MenuLink to="sign-up">Sing up</MenuLink>
            <MenuLink to="login-in">Log in </MenuLink>
          </MenuLinks>)}
    </MenuWrapper>
  );
};

export default Menu;
