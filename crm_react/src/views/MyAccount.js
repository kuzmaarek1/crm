import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const MyAccount = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>MyAccount</h1>
      <button onClick={auth.logOut}>Log out</button>
    </div>
  );
};

export default MyAccount;
