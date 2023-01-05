import { rest } from "msw";
import { db } from "mocks/db";
import {
  authenticateRequest,
  getTeam,
  sanitizeLeadsAndClients,
} from "mocks/helpers";

export const lead = [
  rest.get("http://localhost:8000/api/leads/get_lead/:id/", (req, res, ctx) => {
    if (req.params.id) {
      const team = getTeam(req.params.id);
      const leadData = db.lead.findMany({
        where: {
          team: { id: { equals: team.id } },
        },
      });
      const data = sanitizeLeadsAndClients(leadData);
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
  }),
];
