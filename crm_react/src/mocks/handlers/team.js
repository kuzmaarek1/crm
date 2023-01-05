import { rest } from "msw";
import { db } from "mocks/db";
import { authenticateRequest, getUser, changeDataTems } from "mocks/helpers";

export const team = [
  rest.get("http://localhost:8000/api/teams/get_team/", (req, res, ctx) => {
    const user = getUser();

    const team = db.team.findFirst({
      where: {
        members: {
          id: { equals: user.id },
        },
      },
    });
    const data = changeDataTems(team);
    if (authenticateRequest(req)) {
      return res(ctx.status(200), ctx.json(data));
    }
    return res(
      ctx.status(401),
      ctx.json({
        error: "error",
      })
    );
  }),
];
