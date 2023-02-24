import { db } from "mocks/db";
import { curry } from "ramda";
import { RestRequest, ResponseComposition, RestContext } from "msw";
import type { LeadAndClient } from "types/mocks";
import type {
  RegisterValues,
  LeadAndClientValuesWithNull,
  UserWithoutSanitize,
  TeamWithoutSanitize,
  LeadAndClientWithoutSanitize,
  TeamCreateValue,
  DataPaginate,
  Response,
  IdRequest,
  UpdateConverAndDeleteLeadRequest,
  UpdateAndDeleteClientRequest,
  Error,
} from "types/mocks";
import type {
  Team,
  User,
  LoginValues,
  LeadAndClientValues,
  TeamValues,
  MemberValues,
} from "types";

export const authenticateRequest = <T extends { headers: any }>(req: T) => {
  const token = localStorage.getItem("__be_token__") || null;
  const userToken = req.headers
    .get("Authorization")
    ?.replace("Token", "")
    .replace(/\s/g, "");

  return token === userToken;
};

export const getUser = (username?: string) => {
  const data = username
    ? username
    : atob(String(localStorage.getItem("__be_token__")));
  const user = db.user.findFirst({
    where: {
      username: {
        equals: data,
      },
    },
  }) as UserWithoutSanitize;
  return user !== null ? user : { id: undefined };
};

export const sanitizeData = (data: UserWithoutSanitize): User => {
  const { password, ...rest } = data;
  return rest;
};

export const curriedSanitizeData = curry(sanitizeData);

export const sanitizeTeams = (team: TeamWithoutSanitize): Team => {
  const members = team.members.map(curriedSanitizeData);
  const created_by = sanitizeData(team.created_by);
  const data = { ...team, members: members, created_by: created_by };
  return data;
};

export const curriedSanitizeTeams = curry(sanitizeTeams);

export const sanitizeLeadsAndClients = (
  persons: LeadAndClientWithoutSanitize[]
): LeadAndClient[] => {
  const data = persons.map((person) => {
    const { team, ...otherDataPerson } = person;
    const created_by = sanitizeData(otherDataPerson.created_by);
    const assigned_to = otherDataPerson?.assigned_to
      ? sanitizeData(otherDataPerson.assigned_to)
      : null;
    return {
      ...otherDataPerson,
      created_by: created_by,
      assigned_to: assigned_to,
    };
  });
  return data;
};

export const getTeam = (id: string) => {
  const user = getUser();
  const team = db.team.findFirst({
    where: {
      id: { equals: Number(id) },
      members: {
        id: { equals: user.id },
      },
    },
  }) as TeamWithoutSanitize;
  return sanitizeTeams(team);
};

export const findLeadsOrClientsByTeam = (db: any, team: number) => {
  const data = db.findMany({
    where: {
      team: {
        id: { equals: team },
      },
    },
  }) as LeadAndClientWithoutSanitize[];
  return data;
};

export const create = (
  db: any,
  data: LeadAndClientValuesWithNull | TeamCreateValue | RegisterValues
) => {
  return db.create(data);
};

export const updateLeadOrClient = (
  db: any,
  id: string,
  team: number,
  data: LeadAndClientValuesWithNull
) => {
  const user = db.update({
    where: {
      id: { equals: Number(id) },
      team: {
        id: { equals: team },
      },
    },
    data: data,
  }) as LeadAndClientWithoutSanitize;
  return user;
};

export const deleteLeadOrClient = (db: any, id: string, team: number) => {
  const data = db.delete({
    where: {
      id: { equals: Number(id) },
      team: {
        id: { equals: team },
      },
    },
  }) as LeadAndClientWithoutSanitize;
  return data;
};

export const searchLeadsOrClients = (
  data: LeadAndClientWithoutSanitize[],
  search: string
) => {
  const dataByFilter = data.filter(
    ({ first_name, last_name }) =>
      first_name.toLowerCase().includes(search.toLowerCase()) ||
      last_name.toLowerCase().includes(search.toLowerCase())
  );
  return dataByFilter;
};

export const responseData = <T>(
  req: RestRequest<
    LoginValues | LeadAndClientValues | TeamValues | MemberValues,
    IdRequest | UpdateAndDeleteClientRequest | UpdateConverAndDeleteLeadRequest
  >,
  res: ResponseComposition<Response<T> | Error>,
  ctx: RestContext,
  conditional: boolean | string,
  func: () => Response<T> | void | null
) => {
  if (!authenticateRequest(req))
    return res(
      ctx.status(401),
      ctx.json({
        error: "Unauthorized",
      })
    );
  const functionValue = conditional ? func() : null;
  if (functionValue) {
    return res(ctx.status(200), ctx.json(functionValue));
  }
  return res(
    ctx.status(500),
    ctx.json({
      error: "Error",
    })
  );
};

export const paginate = <T>(
  array: T extends "Team" ? Team[] : LeadAndClient[],
  page_size: number,
  page_number: string | null
): DataPaginate<T> => {
  const page = page_number != null ? Number(page_number) : 1;
  const condition =
    page > 0
      ? array.length >= page * page_size || array.length + 1 >= page * page_size
      : false;

  const startSlice = condition
    ? (page - 1) * page_size
    : array.length % page_size === 0
    ? array.length - page_size
    : array.length - (array.length % page_size);
  const endSlice = condition ? page * page_size : array.length;

  const paginator = array.slice(startSlice, endSlice);
  const hasNext = condition ? array.at(-1)?.id !== paginator.at(-1)?.id : false;
  return {
    results: paginator,
    has_next: hasNext,
    page: String(page),
  } as DataPaginate<T>;
};
