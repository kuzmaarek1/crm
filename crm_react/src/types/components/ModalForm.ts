import {
  FieldValues,
  UseFormResetField,
  UseFormWatch,
  UseFormRegister,
  UseFormSetValue,
  Path,
} from "react-hook-form";
import type {
  HookTeam,
  HookLead,
  HookClient,
  LeadAndClient,
  Team,
  CurrentTeamState,
} from "types";

export type ModalFormProps<H, TFieldValues extends FieldValues> = {
  hook: H extends "C" ? HookClient : H extends "L" ? HookLead : HookTeam;
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  teams?: CurrentTeamState;
  modalIsOpen: boolean;
  closeModal: () => void;
  closeDetails?: () => void;
  list?: H extends "T" ? Team : LeadAndClient;
  addMember?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  endpoint?: {
    endpoints: H extends "C"
      ? { getClients: any } & { searchClient: any }
      : H extends "L"
      ? { getLeads: any } & { searchLead: any }
      : { getTeams: any } & { searchTeam: any };
    util: any;
  };
  resetSearch?: UseFormResetField<TFieldValues>;
};

export type DownshiftListProps<TFieldValues extends FieldValues> = {
  teams: CurrentTeamState;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
};

export type LiProps = {
  readonly highlighted: boolean;
  readonly selectedItem: boolean;
};
