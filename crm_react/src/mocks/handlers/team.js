import { rest } from "msw";
import { db } from "mocks/db";
import { getUser, sanitizeTeams, responseData, create } from "mocks/helpers";

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
      const data = sanitizeTeams(team);
      return data;
    };
    return responseData(req, res, ctx, true, getTeam, null);
  }),
  rest.get("http://localhost:8000/api/teams/", (req, res, ctx) => {
    const getTeams = () => {
      const user = getUser();
      const teams = db.team.findMany({
        where: {
          members: {
            id: { equals: user.id },
          },
        },
      });
      const data = teams.map((team) => sanitizeTeams(team));
      return data;
    };
    return responseData(req, res, ctx, true, getTeams, null);
  }),
  rest.post("http://localhost:8000/api/teams/", (req, res, ctx) => {
    const createTeam = () => {
      const user = getUser();
      const team = create(db.team, {
        ...req.body,
        created_by: user,
        members: user,
      });
      const data = sanitizeTeams(team);
      return data;
    };
    return responseData(req, res, ctx, true, createTeam, null);
  }),
  rest.put(
    "http://localhost:8000/api/teams/update_team/:id/",
    (req, res, ctx) => {
      const updateTeam = () => {
        const user = getUser();
        db.team.update({
          where: {
            id: { equals: Number(req.params.id) },
            created_by: {
              id: { equals: user.id },
            },
          },
          data: { ...req.body },
        });
      };
      return responseData(req, res, ctx, req.params.id, updateTeam, {
        message: "Update",
      });
    }
  ),
];
