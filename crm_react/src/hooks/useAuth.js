import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, signUp, logOut } from "actions/auth";
import { getTeams } from "api";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSiginIn = (data) => {
    dispatch(signIn(data, navigate));
  };

  const handleSignUp = (data) => {
    dispatch(signUp(data, navigate));
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  /*
    try {
      const response = await api.getTeam();
      setTeamid(response.data.id);
      setTeamname(response.data.name);
      localStorage.setItem("teamname", response.data.name);
      localStorage.setItem("teamid", response.data.id);
    } catch (e) {
      console.log(e);
    }

  const changeTeams = useCallback(async (id) => {
    try {
      const response = await api.changeTeams(id);
      if (response) {
        setTeamid(response.data.id);
        setTeamname(response.data.name);
        localStorage.setItem("teamname", response.data.name);
        localStorage.setItem("teamid", response.data.id);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const signUpAndMember = async (request, id) => {
    const { username } = request;
    await signUp(request);
    try {
      await api.addMember(id, { username });
    } catch (e) {
      alert("Don't add member ");
    }
  };
*/

  return {
    handleSignUp,
    handleSiginIn,
    handleLogOut,
  };
};
