import { rest } from "msw";
import { db } from "mocks/db";
import { authenticateRequest, getTeam } from "mocks/helpers";

export const client = [
  rest.get(
    "http://localhost:8000/api/clients/get_client/:id/",
    (req, res, ctx) => {
      if (req.params.id) {
        const team = getTeam(req.params.id);

        const clientData = db.client.findFirst({
          where: {
            team: { id: { equals: team.id } },
          },
        });
        if (authenticateRequest(req)) {
          return res(ctx.status(200), ctx.json(clientData));
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
