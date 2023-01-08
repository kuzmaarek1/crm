import { rest } from "msw";
import { db } from "mocks/db";
import {
  getTeam,
  sanitizeLeadsAndClients,
  responseData,
  findLeadsOrClientsByTeam,
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
];
