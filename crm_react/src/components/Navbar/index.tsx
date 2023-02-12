import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "types/hooks";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import MobileNavbar from "./MobileNavbar";
import * as Styles from "./styles";

const Navbar = () => {
  const [showNavbar, setShowNabar] = useState<boolean>(false);
  const auth = useAppSelector((state) => state.auth.authData);
  const teams = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth?.auth_token && typeof teams.currentTeam.id != "number") {
      dispatch(
        teamsApiSlice.util.prefetch("getTeam", undefined, {
          force: true,
        })
      );
    }
  }, [auth?.auth_token]);

  return (
    <Styles.Wrapper>
      <Styles.TitleWrapper>
        <Styles.Title to="/teams">
          {teams.currentTeam.id && auth.auth_token
            ? teams.currentTeam?.name?.length > 30
              ? `${teams.currentTeam.name.substring(0, 30)}...`
              : teams.currentTeam.name
            : "CRM"}
        </Styles.Title>
      </Styles.TitleWrapper>
      {auth.auth_token && (
        <>
          <Styles.Ul>
            {teams.currentTeam.id &&
              ["leads", "teams", "clients"].map((props, index) => (
                <Styles.Link key={index} to={props} data-testid={props}>
                  {props[0].toUpperCase()}
                  {props.slice(1)}
                </Styles.Link>
              ))}
            <Styles.Link to="my-account" data-testid="my-account">
              My account{" "}
            </Styles.Link>
          </Styles.Ul>
          <MobileNavbar
            teams={teams}
            setShowNabar={setShowNabar}
            showNavbar={showNavbar}
          />
        </>
      )}
    </Styles.Wrapper>
  );
};

export default Navbar;
