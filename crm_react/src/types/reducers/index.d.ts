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

export type getProps = Page & Id;

export type searchLeadAndClientProps = {
  name: string;
} & Page &
  Team;

export type searchTeamProps = {
  name: string;
} & Page;

export type createLeadAndClientProps = {
  data: LeadAndClientValues;
} & Id;

export type editProps = {
  data: LeadAndClientValues;
} & Team;

export type editClientProps = {
  client: number;
} & editLeadAndClientProps;

export type editLeadProps = {
  lead: number;
} & editLeadAndClientProps;

export type editTeamProps = {
  data: TeamValues;
} & Id;

export type deleteClientProps = {
  client: number;
} & Team;

export type deleteAndCovertLeadProps = {
  lead: number;
} & Team;

export type deleteTeamProps = {
  teams: number;
} & Id;

export type addMemberProps = {
  username: string;
} & Id;
