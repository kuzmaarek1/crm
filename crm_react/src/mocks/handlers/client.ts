import { rest } from "msw";
import { db } from "mocks/db";
import type { LeadAndClientValues } from "types";
import type { createMessage, editMessage, deleteMessage } from "types/reducers";
import {
  getTeam,
  sanitizeLeadsAndClients,
  responseData,
  findLeadsOrClientsByTeam,
  getUser,
  create,
  searchLeadsOrClients,
  updateLeadOrClient,
  deleteLeadOrClient,
  paginate,
} from "mocks/helpers";
import type {
  LeadAndClientWithoutSanitize,
  IdRequest,
  UpdateAndDeleteClientRequest,
  LeadAndClientDataResponse,
  CreateResponse,
  EditResponse,
  DeleteResponse,
} from "types/mocks";

export const client = [
  rest.get<any, IdRequest, LeadAndClientDataResponse>(
    "http://localhost:8000/api/clients/get_client/:id/",
    (req, res, ctx) => {
      const getClient = () => {
        const team = getTeam(req.params.id);
        const page_number = req.url.searchParams.get("page");
        if (!page_number) return null;
        const clientData = findLeadsOrClientsByTeam(db.client, team.id);
        const data = sanitizeLeadsAndClients(clientData);
        return paginate<"LeadAndClient">(data, 17, page_number);
      };
      return responseData<"LeadAndClientData">(
        req,
        res,
        ctx,
        req.params.id,
        getClient
      );
    }
  ),
  rest.post<LeadAndClientValues, IdRequest, CreateResponse>(
    "http://localhost:8000/api/clients/create_client/:id/",
    (req, res, ctx) => {
      const createClient = (): createMessage => {
        const user = getUser();
        const team = getTeam(req.params.id);
        const { assigned_to, ...otherData } = req.body;
        const client = {
          ...otherData,
          created_by: user,
          team: team,
        };
        const assignedToUser = assigned_to !== "" ? getUser(assigned_to) : null;
        create(db.client, {
          ...client,
          assigned_to: assignedToUser,
        });
        return { message: "Create" };
      };
      return responseData<"Create">(req, res, ctx, req.params.id, createClient);
    }
  ),
  rest.get<any, IdRequest, LeadAndClientDataResponse>(
    "http://localhost:8000/api/clients/search_client/:id/",
    (req, res, ctx) => {
      const searchClient = () => {
        const team = getTeam(req.params.id);
        const page_number = req.url.searchParams.get("page");
        const searchParm = req.url.searchParams.get("search")?.split(" ");
        if (!page_number || !searchParm) return null;
        const clientData = findLeadsOrClientsByTeam(db.client, team.id);
        let clientBySearch: LeadAndClientWithoutSanitize[] = [];
        searchParm?.forEach((search, index) => {
          if (index === 0) {
            clientBySearch = searchLeadsOrClients(clientData, search);
          } else {
            clientBySearch = searchLeadsOrClients(clientBySearch, search);
          }
        });
        const data = sanitizeLeadsAndClients(clientBySearch);
        return paginate<"LeadAndClient">(data, 17, page_number);
      };
      return responseData<"LeadAndClientData">(
        req,
        res,
        ctx,
        req.params.id,
        searchClient
      );
    }
  ),
  rest.put<LeadAndClientValues, UpdateAndDeleteClientRequest, EditResponse>(
    "http://localhost:8000/api/clients/update_client/:id_client/:id_team/",
    (req, res, ctx) => {
      const updateClient = (): editMessage => {
        const team = getTeam(req.params.id_team);
        const { assigned_to, ...otherData } = req.body;
        const assignedToUser = assigned_to !== "" ? getUser(assigned_to) : null;
        updateLeadOrClient(db.client, req.params.id_client, team.id, {
          ...otherData,
          assigned_to: assignedToUser,
        });
        return { message: "Update" };
      };
      return responseData<"Edit">(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_client,
        updateClient
      );
    }
  ),
  rest.put<any, UpdateAndDeleteClientRequest, DeleteResponse>(
    "http://localhost:8000/api/clients/delete_client/:id_client/:id_team",
    (req, res, ctx) => {
      const deleteClient = (): deleteMessage => {
        const team = getTeam(req.params.id_team);
        deleteLeadOrClient(db.client, req.params.id_client, team.id);
        return { message: "Deleted" };
      };
      return responseData<"Delete">(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_client,
        deleteClient
      );
    }
  ),
];
