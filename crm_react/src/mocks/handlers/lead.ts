import { rest } from "msw";
import { db } from "mocks/db";
import type { LeadAndClientValues } from "types";
import type {
  createMessage,
  editMessage,
  deleteMessage,
  convertMessage,
} from "types/reducers";
import {
  responseData,
  getTeam,
  getUser,
  sanitizeLeadsAndClients,
  findLeadsOrClientsByTeam,
  create,
  searchLeadsOrClients,
  updateLeadOrClient,
  deleteLeadOrClient,
  paginate,
} from "mocks/helpers";
import type {
  LeadAndClientWithoutSanitize,
  IdRequest,
  UpdateConverAndDeleteLeadRequest,
  LeadAndClientDataResponse,
  CreateResponse,
  EditResponse,
  DeleteResponse,
  ConvertResponse,
} from "types/mocks";

export const lead = [
  rest.get<any, IdRequest, LeadAndClientDataResponse>(
    "http://localhost:8000/api/leads/get_lead/:id/",
    (req, res, ctx) => {
      const getLead = () => {
        const page_number = req.url.searchParams.get("page");
        const team = getTeam(req.params.id);
        const leadData = findLeadsOrClientsByTeam(db.lead, team.id);
        const data = sanitizeLeadsAndClients(leadData);
        return paginate<"LeadAndClient">(data, 17, page_number);
      };

      return responseData<"LeadAndClientData">(
        req,
        res,
        ctx,
        req.params.id,
        getLead
      );
    }
  ),
  rest.post<LeadAndClientValues, IdRequest, CreateResponse>(
    "http://localhost:8000/api/leads/create_lead/:id/",
    (req, res, ctx) => {
      const createLead = (): createMessage => {
        const user = getUser(undefined);
        const team = getTeam(req.params.id);
        const { assigned_to, ...otherData } = req.body;
        const lead = {
          ...otherData,
          created_by: user,
          team: team,
        };
        const assignedToUser = assigned_to !== "" ? getUser(assigned_to) : null;
        create(db.lead, {
          ...lead,
          assigned_to: assignedToUser,
        });
        return { message: "Create" };
      };
      return responseData<"Create">(req, res, ctx, req.params.id, createLead);
    }
  ),
  rest.get<any, IdRequest, LeadAndClientDataResponse>(
    "http://localhost:8000/api/leads/search_lead/:id/",
    (req, res, ctx) => {
      const searchLead = () => {
        const page_number = req.url.searchParams.get("page");
        const team = getTeam(req.params.id);
        const searchParm = req.url.searchParams.get("search")?.split(" ");
        const leadData = findLeadsOrClientsByTeam(db.lead, team.id);
        let leadBySearch: LeadAndClientWithoutSanitize[] = [];
        searchParm?.forEach((search, index) => {
          if (index === 0) {
            leadBySearch = searchLeadsOrClients(leadData, search);
          } else {
            leadBySearch = searchLeadsOrClients(leadBySearch, search);
          }
        });
        const data = sanitizeLeadsAndClients(leadBySearch);
        return paginate<"LeadAndClient">(data, 17, page_number);
      };
      return responseData<"LeadAndClientData">(
        req,
        res,
        ctx,
        req.params.id,
        searchLead
      );
    }
  ),
  rest.put<LeadAndClientValues, UpdateConverAndDeleteLeadRequest, EditResponse>(
    "http://localhost:8000/api/leads/update_lead/:id_lead/:id_team/",
    (req, res, ctx) => {
      const updateLead = (): editMessage => {
        const team = getTeam(req.params.id_team);
        const { assigned_to, ...otherData } = req.body;
        const assignedToUser = assigned_to !== "" ? getUser(assigned_to) : null;
        updateLeadOrClient(db.lead, req.params.id_lead, team.id, {
          ...otherData,
          assigned_to: assignedToUser,
        });
        return { message: "Update" };
      };
      return responseData<"Edit">(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_lead,
        updateLead
      );
    }
  ),
  rest.put<any, UpdateConverAndDeleteLeadRequest, DeleteResponse>(
    "http://localhost:8000/api/leads/delete_lead/:id_lead/:id_team",
    (req, res, ctx) => {
      const deleteLead = (): deleteMessage => {
        const team = getTeam(req.params.id_team);
        deleteLeadOrClient(db.lead, req.params.id_lead, team.id);
        return { message: "Deleted" };
      };
      return responseData<"Delete">(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_lead,
        deleteLead
      );
    }
  ),
  rest.post<any, UpdateConverAndDeleteLeadRequest, ConvertResponse>(
    "http://localhost:8000/api/convert_lead_to_client/:id_lead/:id_team/",
    (req, res, ctx) => {
      const convertLeadToClient = (): convertMessage => {
        const team = getTeam(req.params.id_team);
        const lead = db.lead.findFirst({
          where: {
            id: { equals: Number(req.params.id_lead) },
            team: {
              id: { equals: team.id },
            },
          },
        }) as LeadAndClientWithoutSanitize;
        const { id, ...otherData } = lead;
        create(db.client, otherData);
        deleteLeadOrClient(db.lead, req.params.id_lead, team.id);
        return { message: "Convert" };
      };
      return responseData<"Convert">(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_lead,
        convertLeadToClient
      );
    }
  ),
];
