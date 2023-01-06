import { rest } from "msw";
import { db } from "mocks/db";
import {
  authenticateRequest,
  getTeam,
  getUser,
  sanitizeLeadsAndClients,
  createLead,
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
  rest.post(
    "http://localhost:8000/api/leads/create_lead/:id/",
    (req, res, ctx) => {
      if (req.params.id) {
        if (authenticateRequest(req)) {
          const user = getUser();
          const team = getTeam(req.params.id);
          const { assigned_to, ...otherData } = req.body;
          const lead = {
            ...otherData,
            created_by: user,
            team: team,
          };
          if (assigned_to !== "") {
            const assignedToUser = getUser(assigned_to);
            createLead({
              ...lead,
              assigned_to: assignedToUser,
            });
          } else {
            createLead({
              ...lead,
            });
          }
          return res(ctx.status(200), ctx.json({ message: "Create" }));
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
