import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <NavLink to="sign-up">Sing up</NavLink>
      <NavLink to="login-in">Log in </NavLink>
    </div>
  );
};

export default Menu;
