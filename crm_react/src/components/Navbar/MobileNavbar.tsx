import React from "react";
import * as Styles from "./styles";
import type { MobileNavbarProps } from "types/components/Navbar";

const MobileNavbar = ({
  teams,
  setShowNabar,
  showNavbar,
}: MobileNavbarProps) => {
  return (
    <Styles.MobileNavbar>
      <Styles.HaburgerLines
        onClick={() => setShowNabar((prevState) => !prevState)}
      >
        <Styles.HaburgerLine showNavbar={showNavbar}></Styles.HaburgerLine>
      </Styles.HaburgerLines>

      <Styles.MobileUl showNavbar={!showNavbar}>
        {teams.currentTeam.id &&
          ["leads", "teams", "clients"].map((props, index) => (
            <Styles.MobileLink
              onClick={() => setShowNabar(false)}
              to={props}
              key={index}
            >
              {props[0].toUpperCase()}
              {props.slice(1)}
            </Styles.MobileLink>
          ))}
        <Styles.MobileLink onClick={() => setShowNabar(false)} to="my-account">
          My account{" "}
        </Styles.MobileLink>
      </Styles.MobileUl>
    </Styles.MobileNavbar>
  );
};

export default MobileNavbar;
