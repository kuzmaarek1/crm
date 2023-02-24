import { Path } from "react-hook-form";

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
};

export type Team = {
  id: number;
  name: string;
  description: string;
  created_by: User;
  members: User[];
};

export type LeadAndClient = {
  id: number;
  first_name: string;
  last_name: string;
  phone: number;
  email: string;
  description: string;
  created_by: number;
  assigned_to: User | null;
  members: undefined;
};

export type Page = {
  has_next: boolean;
  page: string;
};

export type TeamData = {
  results: Team[];
} & Page;

export type LeadAndClientData = {
  results: LeadAndClient[];
} & Page;

export type TeamExtend = {
  id: null;
  name: null;
  description?: null;
  created_by?: null;
  members: User[];
};

export type UserExtend = {
  id: null;
  username: null;
  first_name: null;
  last_name: null;
};

export type CurrentTeamState = {
  currentTeam: TeamExtend | Team;
};

export type UserState = {
  auth_token: null | string;
  user: UserExtend | User | null;
};

export type Member = {
  data: {
    id: number;
    user: User;
  };
};

export interface LoginValues {
  username: string;
  password: string;
}

export interface RegisterValues extends LoginValues {
  first_name: string;
  last_name: string;
  re_password: string;
}

export interface LeadAndClientValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description: string;
  assigned_to: string;
}

export interface TeamValues {
  name: string;
  description: string;
}

export interface MemberValues {
  username: string;
}

export interface IForm {
  type: string;
  required: boolean;
}

export interface ILoginForm extends IForm {
  name: Path<LoginValues>;
}

export interface IRegisterForm extends IForm {
  name: Path<RegisterValues>;
  validate?: boolean;
}

export interface ILeadAndClientForm extends IForm {
  name: Path<LeadAndClientValues>;
}

export interface ITeamForm extends IForm {
  name: Path<TeamValues>;
}

export interface IMembersForm extends IForm {
  name: Path<MemberValues>;
}

export interface TeamSearchValues {
  "team-search": string;
}

export interface LeadSearchValues {
  "lead-search": string;
}

export interface ClientSearchValues {
  "client-search": string;
}

export type InputNameSearch =
  | TeamSearchValues
  | LeadSearchValues
  | ClientSearchValues;

export type HookTeam = {
  handleAdd: (team: number, data: TeamValues) => Promise<void>;
  handleChangeTeams: (team: Team) => void;
  handleDelete: (team: Team, teams: number) => Promise<void>;
  handleEdit: (id: number, team: number, data: TeamValues) => Promise<void>;
  handleAddMember: (id: number, request: MemberValues) => Promise<void>;
};

export type HookLead = {
  handleAdd: (id: number, data: LeadAndClientValues) => Promise<void>;
  handleDelete: (lead: LeadAndClient, team: number) => Promise<void>;
  handleEdit: (
    lead: number,
    team: number,
    data: LeadAndClientValues
  ) => Promise<void>;
  handleConvertToClient: (lead: LeadAndClient, team: number) => Promise<void>;
};

export type HookClient = {
  handleAdd: (id: number, data: LeadAndClientValues) => Promise<void>;
  handleDelete: (client: LeadAndClient, team: number) => Promise<void>;
  handleEdit: (
    client: number,
    team: number,
    data: LeadAndClientValues
  ) => Promise<void>;
};
