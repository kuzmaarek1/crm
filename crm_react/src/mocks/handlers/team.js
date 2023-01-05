import { rest } from "msw";
import { db } from "mocks/db";
import { authenticateRequest, getUser } from "mocks/helpers";

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
    const members = team.members.map((member) => {
      const { password, ...otherData } = member;
      return otherData;
    });
    const { password, ...otherDataUser } = team.created_by;
    const data = { ...team, members: members, created_by: otherDataUser };
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

export const lead = [
  rest.get("http://localhost:8000/api/teams/", (req, res, ctx) => {
    const user = getUser();

    const team = db.team.findAll({
      where: {
        members: {
          id: { equals: user.id },
        },
      },
    });

    if (authenticateRequest(req)) {
      return res(ctx.status(200), ctx.json(team));
    }
    return res(
      ctx.status(401),
      ctx.json({
        error: "error",
      })
    );
  }),
];
