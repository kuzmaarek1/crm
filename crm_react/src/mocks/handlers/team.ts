import { rest } from "msw";
import { db } from "mocks/db";
import type { TeamValues, MemberValues } from "types";
import type { editMessage, deleteMessage } from "types/reducers";
import {
  getUser,
  responseData,
  create,
  sanitizeData,
  sanitizeTeams,
  curriedSanitizeTeams,
  paginate,
} from "mocks/helpers";
import type {
  TeamWithoutSanitize,
  IdRequest,
  TeamDataResponse,
  EditResponse,
  DeleteResponse,
  UserResponse,
  TeamResponse,
} from "types/mocks";

export const team = [
  rest.get<any, any, TeamResponse>(
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
        }) as TeamWithoutSanitize;
        const data = sanitizeTeams(team);
        return data;
      };
      return responseData<"Team">(req, res, ctx, true, getTeam);
    }
  ),
  rest.get<any, any, TeamDataResponse>(
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
        }) as TeamWithoutSanitize[];
        const data = teams.map(curriedSanitizeTeams);
        return paginate<"Team">(data, 17, page_number);
      };
      return responseData<"TeamData">(req, res, ctx, true, getTeams);
    }
  ),
  rest.post<TeamValues, any, TeamResponse>(
    "http://localhost:8000/api/teams/",
    (req, res, ctx) => {
      const createTeam = () => {
        const user = getUser(undefined);
        if ("last_name" in user) {
          const team = create(db.team, {
            ...req.body,
            created_by: user,
            members: user,
          });
          const data = sanitizeTeams(team);
          return data;
        }
        return null;
      };
      return responseData<"Team">(req, res, ctx, true, createTeam);
    }
  ),
  rest.put<TeamValues, IdRequest, EditResponse>(
    "http://localhost:8000/api/teams/update_team/:id/",
    (req, res, ctx) => {
      const updateTeam = (): editMessage => {
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
        return { message: "Update" };
      };
      return responseData<"Edit">(req, res, ctx, req.params.id, updateTeam);
    }
  ),
  rest.get<any, any, TeamDataResponse>(
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
        }) as TeamWithoutSanitize[];
        const teamsByFilter = search
          ? teams.filter(({ name }) =>
              name.toLowerCase().includes(search.toLowerCase())
            )
          : [];
        const data = teamsByFilter.map(curriedSanitizeTeams);
        return paginate<"Team">(data, 17, page_number);
      };
      return responseData<"TeamData">(req, res, ctx, true, searchTeam);
    }
  ),
  rest.put<any, IdRequest, DeleteResponse>(
    "http://localhost:8000/api/teams/delete_team/:id/",
    (req, res, ctx) => {
      const deleteTeam = (): deleteMessage => {
        const user = getUser(undefined);
        db.team.delete({
          where: {
            id: { equals: Number(req.params.id) },
            created_by: {
              id: { equals: user.id },
            },
          },
        });
        return { message: "Deleted" };
      };
      return responseData<"Delete">(req, res, ctx, req.params.id, deleteTeam);
    }
  ),
  rest.patch<MemberValues, IdRequest, UserResponse>(
    "http://localhost:8000/api/teams/add_member/:id/",
    (req, res, ctx) => {
      const userMember = getUser(req.body.username);
      const addMember = () => {
        const userCreated = getUser(undefined);
        const editTeam = db.team.findFirst({
          where: {
            id: { equals: Number(req.params.id) },
            created_by: {
              id: { equals: userCreated.id },
            },
          },
        }) as TeamWithoutSanitize;
        const isMemberExist = editTeam.members.filter(
          ({ username }) =>
            "username" in userMember && username === userMember.username
        );
        if (isMemberExist.length === 0 && "username" in userMember) {
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
        return "username" in userMember ? sanitizeData(userMember) : null;
      };
      return responseData<"User">(req, res, ctx, req.params.id, addMember);
    }
  ),
];
