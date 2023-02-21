import type { HookTeam, HookLead, HookClient } from "types";

export type DataProps<H, T> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  hook: H extends "C" ? HookClient : H extends "L" ? HookLead : HookTeam;
  endpoint: {
    endpoints: H extends "C"
      ? { getClients: T } & { searchClient: T }
      : H extends "L"
      ? { getLeads: T } & { searchLead: T }
      : { getTeams: T } & { searchTeam: T };
    util: any;
  };
  getEndpoint: T;
  searchEndpoint: T;
};
