import { CurrentTeamState } from "types";

export type MobileNavbarProps = {
  teams: CurrentTeamState;
  setShowNabar: React.Dispatch<React.SetStateAction<boolean>>;
  showNavbar: boolean;
};

export type TypeShowNavbar = {
  readonly showNavbar?: boolean;
};
