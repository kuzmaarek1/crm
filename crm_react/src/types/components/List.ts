import {
  FieldValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormResetField,
} from "react-hook-form";
import type {
  HookTeam,
  HookLead,
  HookClient,
  TeamData,
  LeadAndClientData,
} from "types";

export type ListProps<H, TFieldValues extends FieldValues> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  hook: H extends "C" ? HookClient : H extends "L" ? HookLead : HookTeam;
  data?: H extends "T" ? TeamData : LeadAndClientData;
  fetchingData: boolean;
  fetchingSearchData: boolean;
  endpoint: {
    endpoints: H extends "C"
      ? { getClients: any } & { searchClient: any }
      : H extends "L"
      ? { getLeads: any } & { searchLead: any }
      : { getTeams: any } & { searchTeam: any };
    util: any;
  };
  register: UseFormRegister<TFieldValues>;
  setFocus: UseFormSetFocus<TFieldValues>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  resetSearch: UseFormResetField<TFieldValues>;
};

export type TeamProps = {
  readonly team?: boolean;
};

export type ThemeProps = {
  readonly theme: any;
};
