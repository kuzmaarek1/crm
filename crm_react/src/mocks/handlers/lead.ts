import { rest } from "msw";
import { db } from "mocks/db";
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
import type { LeadAndClientWithoutSanitize } from "types/mocks";

export const lead = [
  rest.get<any, any, any>(
    "http://localhost:8000/api/leads/get_lead/:id/",
    (req, res, ctx) => {
      const getLead = () => {
        const page_number = req.url.searchParams.get("page");
        const team = getTeam(req.params.id);
        const leadData = findLeadsOrClientsByTeam(db.lead, team.id);
        const data = sanitizeLeadsAndClients(leadData);
        return paginate(data, 17, page_number);
      };

      return responseData(req, res, ctx, req.params.id, getLead, null);
    }
  ),
  rest.post<any, any, any>(
    "http://localhost:8000/api/leads/create_lead/:id/",
    (req, res, ctx) => {
      const createLead = () => {
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
      };
      return responseData(req, res, ctx, req.params.id, createLead, {
        message: "Create",
      });
    }
  ),
  rest.get<any, any, any>(
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
        return paginate(data, 17, page_number);
      };
      return responseData(req, res, ctx, req.params.id, searchLead, null);
    }
  ),
  rest.put<any, any, any>(
    "http://localhost:8000/api/leads/update_lead/:id_lead/:id_team/",
    (req, res, ctx) => {
      const updateLead = () => {
        const team = getTeam(req.params.id_team);
        const { assigned_to, ...otherData } = req.body;
        const assignedToUser = assigned_to !== "" ? getUser(assigned_to) : null;
        updateLeadOrClient(db.lead, req.params.id_lead, team.id, {
          ...otherData,
          assigned_to: assignedToUser,
        });
      };
      return responseData(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_lead,
        updateLead,
        { message: "Update" }
      );
    }
  ),
  rest.put<any, any, any>(
    "http://localhost:8000/api/leads/delete_lead/:id_lead/:id_team",
    (req, res, ctx) => {
      const deleteLead = () => {
        const team = getTeam(req.params.id_team);
        deleteLeadOrClient(db.lead, req.params.id_lead, team.id);
      };
      return responseData(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_lead,
        deleteLead,
        { message: "Deleted" }
      );
    }
  ),
  rest.post<any, any, any>(
    "http://localhost:8000/api/convert_lead_to_client/:id_lead/:id_team/",
    (req, res, ctx) => {
      const convertLeadToClient = () => {
        const team = getTeam(req.params.id_team);
        const lead = db.lead.findFirst({
          where: {
            id: { equals: Number(req.params.id_lead) },
            team: {
              id: { equals: team.id },
            },
          },
        });
        const { id, ...otherData } = lead as any;
        create(db.client, otherData);
        deleteLeadOrClient(db.lead, req.params.id_lead, team.id);
      };
      return responseData(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_lead,
        convertLeadToClient,
        { message: "Convert" }
      );
    }
  ),
];
