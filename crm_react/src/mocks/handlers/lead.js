import { rest } from "msw";
import { db } from "mocks/db";
import { authenticateRequest, getTeam } from "mocks/helpers";

export const lead = [
  rest.get("http://localhost:8000/api/leads/get_lead/:id/", (req, res, ctx) => {
    if (req.params.id) {
      const team = getTeam(req.params.id);
      const leadData = db.lead.findMany({
        where: {
          team: { id: { equals: team.id } },
        },
      });
      const data = leadData.map((lead) => {
        const { team, ...otherDataLead } = lead;
        const { password: passwordCeatedUser, ...otherDataCreatedUser } =
          otherDataLead.created_by;
        const { password: passwordAssignedUser, ...otherDataAssignedUser } =
          otherDataLead.assigned_to;
        return {
          ...otherDataLead,
          created_by: otherDataCreatedUser,
          assigned_to: otherDataAssignedUser,
        };
      });
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
