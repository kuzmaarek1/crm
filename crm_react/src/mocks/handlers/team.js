import { rest } from "msw";
import { db } from "mocks/db";
import { getUser, sanitizeTems, responseData } from "mocks/helpers";

export const team = [
  rest.get("http://localhost:8000/api/teams/get_team/", (req, res, ctx) => {
    const getTeam = () => {
      const user = getUser();
      const team = db.team.findFirst({
        where: {
          members: {
            id: { equals: user.id },
          },
        },
      });
      const data = sanitizeTems(team);
      return data;
    };
    return responseData(req, res, ctx, true, getTeam, null);
  }),
];
