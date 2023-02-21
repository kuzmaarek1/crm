import { FieldValues, UseFormResetField } from "react-hook-form";
import {
  HookClient,
  HookLead,
  HookTeam,
  Team,
  LeadAndClient,
  CurrentTeamState,
} from "types";

export type ModalDetailsProps<H, TFieldValues extends FieldValues> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  modalIsOpen: boolean;
  closeModal: () => void;
  list: H extends "T" ? Team : LeadAndClient;
  hook: H extends "C" ? HookClient : H extends "L" ? HookLead : HookTeam;
  teams: CurrentTeamState;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  endpoint: {
    endpoints: H extends "C"
      ? { getClients: any } & { searchClient: any }
      : H extends "L"
      ? { getLeads: any } & { searchLead: any }
      : { getTeams: any } & { searchTeam: any };
    util: any;
  };
  resetSearch: UseFormResetField<TFieldValues>;
};

export type DetailsWrapperProps = {
  readonly team: boolean;
};

export type DetailsProps = {
  readonly member?: boolean;
  readonly description?: boolean;
  readonly boldText?: boolean;
};
