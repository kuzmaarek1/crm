// @ts-nocheck
import { rest } from "msw";
import { db } from "mocks/db";
import {
  getUser,
  responseData,
  create,
  sanitizeData,
  sanitizeTeams,
  curriedSanitizeTeams,
  paginate,
} from "mocks/helpers";

export const team = [
  rest.get<any, any, any>(
    "http://localhost:8000/api/teams/get_team/",
    (req, res, ctx) => {
      const getTeam = () => {
        const user = getUser(undefined);
        const team = db.team.findFirst({
          where: {
            members: {
              id: { equals: user.id },
            },
          },
          orderBy: {
            id: "desc",
          },
        });
        const data = sanitizeTeams(team);
        return data;
      };
      return responseData(req, res, ctx, true, getTeam, null);
    }
  ),
  rest.get<any, any, any>(
    "http://localhost:8000/api/teams/get_teams/",
    (req, res, ctx) => {
      const getTeams = () => {
        const page_number = req.url.searchParams.get("page");
        const user = getUser(undefined);
        const teams = db.team.findMany({
          where: {
            members: {
              id: { equals: user.id },
            },
          },
          orderBy: {
            id: "desc",
          },
        });
        const data = teams.map(curriedSanitizeTeams());
        return paginate(data, 17, page_number);
      };
      return responseData(req, res, ctx, true, getTeams, null);
    }
  ),
  rest.post<any, any, any>(
    "http://localhost:8000/api/teams/",
    (req, res, ctx) => {
      const createTeam = () => {
        const user = getUser(undefined);
        const team = create(db.team, {
          ...req.body,
          created_by: user,
          members: user,
        });
        const data = sanitizeTeams(team);
        return data;
      };
      return responseData(req, res, ctx, true, createTeam, null);
    }
  ),
  rest.put<any, any, any>(
    "http://localhost:8000/api/teams/update_team/:id/",
    (req, res, ctx) => {
      const updateTeam = () => {
        const user = getUser(undefined);
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
  rest.get<any, any, any>(
    "http://localhost:8000/api/teams/search_team/",
    (req, res, ctx) => {
      const searchTeam = () => {
        const page_number = req.url.searchParams.get("page");
        const user = getUser(undefined);
        const search = req.url.searchParams.get("search");
        const teams = db.team.findMany({
          where: {
            members: {
              id: { equals: user.id },
            },
          },
          orderBy: {
            id: "desc",
          },
        });
        const teamsByFilter = teams.filter(({ name }) =>
          name.toLowerCase().includes(search.toLowerCase())
        );
        const data = teamsByFilter.map(curriedSanitizeTeams());
        return paginate(data, 17, page_number);
      };
      return responseData(req, res, ctx, true, searchTeam, null);
    }
  ),
  rest.put<any, any, any>(
    "http://localhost:8000/api/teams/delete_team/:id/",
    (req, res, ctx) => {
      const deleteTeam = () => {
        const user = getUser(undefined);
        db.team.delete({
          where: {
            id: { equals: Number(req.params.id) },
            created_by: {
              id: { equals: user.id },
            },
          },
        });
      };
      return responseData(req, res, ctx, req.params.id, deleteTeam, {
        message: "Deleted",
      });
    }
  ),
  rest.patch<any, any, any>(
    "http://localhost:8000/api/teams/add_member/:id/",
    (req, res, ctx) => {
      const addMember = () => {
        const userCreated = getUser(undefined);
        const userMember = getUser(req.body.username);
        const editTeam = db.team.findFirst({
          where: {
            id: { equals: Number(req.params.id) },
            created_by: {
              id: { equals: userCreated.id },
            },
          },
        });
        const isMemberExist = editTeam.members.filter(
          ({ username }) => username === userMember.username
        );
        if (isMemberExist.length === 0) {
          db.team.update({
            where: {
              id: { equals: Number(req.params.id) },
              created_by: {
                id: { equals: userCreated.id },
              },
            },
            data: {
              members: [...editTeam.members, userMember],
            },
          });
        }
        return sanitizeData(userMember);
      };
      return responseData(req, res, ctx, req.params.id, addMember, null);
    }
  ),
];
