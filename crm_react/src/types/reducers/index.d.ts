import type { LeadAndClientValues, TeamValues } from "types";

type Id = {
  id: number;
};

type Team = {
  team: number;
};

type Page = {
  page: number;
};

export type GetProps = Page & Id;

export type SearchLeadAndClientProps = {
  name: string;
} & Page &
  Team;

export type SearchTeamProps = {
  name: string;
} & Page;

export type CreateLeadAndClientProps = {
  data: LeadAndClientValues;
} & Id;

export type EditClientProps = {
  client: number;
} & editLeadAndClientProps;

export type EditLeadProps = {
  lead: number;
} & editLeadAndClientProps;

export type EditTeamProps = {
  data: TeamValues;
} & Id;

export type DeleteClientProps = {
  client: number;
} & Team;

export type DeleteAndCovertLeadProps = {
  lead: number;
} & Team;

export type DeleteTeamProps = {
  teams: number;
} & Id;

export type AddMemberProps = {
  username: string;
} & Id;

export type CreateMessage = {
  message: "Create";
};

export type EditMessage = {
  message: "Update";
};

export type DeleteMessage = {
  message: "Deleted";
};

export type ConvertMessage = {
  message: "Convert";
};
