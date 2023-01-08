import { rest } from "msw";
import { db } from "mocks/db";
import {
  authenticateRequest,
  getUser,
  getTeam,
  sanitizeLeadsAndClients,
} from "mocks/helpers";

export const client = [
  rest.get(
    "http://localhost:8000/api/clients/get_client/:id/",
    (req, res, ctx) => {
      if (req.params.id) {
        const team = getTeam(req.params.id);
        const clientData = db.client.findMany({
          where: {
            team: {
              id: { equals: team.id },
            },
          },
        });
        const data = sanitizeLeadsAndClients(clientData);
        if (authenticateRequest(req)) {
          return res(ctx.status(200), ctx.json(data));
        }
        return res(
          ctx.status(401),
          ctx.json({
            error: "error",
          })
        );
      }
      return res(
        ctx.status(500),
        ctx.json({
          error: "error",
        })
      );
    }
  ),
];
