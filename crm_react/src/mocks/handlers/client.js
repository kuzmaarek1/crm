import { rest } from "msw";
import { db } from "mocks/db";
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
} from "mocks/helpers";

export const client = [
  rest.get(
    "http://localhost:8000/api/clients/get_client/:id/",
    (req, res, ctx) => {
      const getClient = () => {
        const team = getTeam(req.params.id);
        const clientData = findLeadsOrClientsByTeam(db.client, team.id);
        const data = sanitizeLeadsAndClients(clientData);
        return data;
      };

      return responseData(req, res, ctx, req.params.id, getClient, null);
    }
  ),
  rest.post(
    "http://localhost:8000/api/clients/create_client/:id/",
    (req, res, ctx) => {
      const createClient = () => {
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
      };
      return responseData(req, res, ctx, req.params.id, createClient, {
        message: "Create",
      });
    }
  ),
  rest.get(
    "http://localhost:8000/api/clients/search_client/:id/",
    (req, res, ctx) => {
      const searchClient = () => {
        const team = getTeam(req.params.id);
        const searchParm = req.url.searchParams.get("search").split(" ");
        const clientData = findLeadsOrClientsByTeam(db.client, team.id);
        let clientBySearch = [];
        searchParm.forEach((search, index) => {
          if (index === 0) {
            clientBySearch = searchLeadsOrClients(clientData, search);
          } else {
            clientBySearch = searchLeadsOrClients(clientBySearch, search);
          }
        });
        const data = sanitizeLeadsAndClients(clientBySearch);
        return data;
      };
      return responseData(req, res, ctx, req.params.id, searchClient, null);
    }
  ),
  rest.put(
    "http://localhost:8000/api/clients/update_client/:id_client/:id_team/",
    (req, res, ctx) => {
      const updateClient = () => {
        const team = getTeam(req.params.id_team);
        const { assigned_to, ...otherData } = req.body;
        const assignedToUser = assigned_to !== "" ? getUser(assigned_to) : null;
        updateLeadOrClient(db.client, req.params.id_client, team.id, {
          ...otherData,
          assigned_to: assignedToUser,
        });
      };
      return responseData(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_client,
        updateClient,
        { message: "Update" }
      );
    }
  ),
  rest.put(
    "http://localhost:8000/api/clients/delete_client/:id_client/:id_team",
    (req, res, ctx) => {
      const deleteClient = () => {
        const team = getTeam(req.params.id_team);
        deleteLeadOrClient(db.client, req.params.id_client, team.id);
      };
      return responseData(
        req,
        res,
        ctx,
        req.params.id_team && req.params.id_client,
        deleteClient,
        { message: "Deleted" }
      );
    }
  ),
];
