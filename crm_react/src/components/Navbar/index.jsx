import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import MobileNavbar from "./MobileNavbar";
import * as Styles from "./styles";

const Navbar = () => {
  const [showNavbar, setShowNabar] = useState(false);
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
      <Styles.TitleWrapper>
        <Styles.Title to="/teams">
          {teams.currentTeam && auth
            ? teams.currentTeam.name.length > 30
              ? `${teams.currentTeam.name.substring(0, 30)}...`
              : teams.currentTeam.name
            : "CRM"}
        </Styles.Title>
      </Styles.TitleWrapper>
      {auth && (
        <Styles.Ul>
          {teams.currentTeam &&
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
      )}
      <MobileNavbar
        auth={auth}
        teams={teams}
        setShowNabar={setShowNabar}
        showNavbar={showNavbar}
      />
    </Styles.Wrapper>
  );
};

export default Navbar;
