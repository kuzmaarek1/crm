import type { LeadAndClientValues } from "types";

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

export type searchProps = {
  name: string;
} & Page &
  Team;

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

export type deleteClientProps = {
  client: number;
} & Team;

export type deleteAndCovertLeadProps = {
  lead: number;
} & Team;
