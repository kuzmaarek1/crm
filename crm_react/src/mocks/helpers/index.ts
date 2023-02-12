// @ts-nocheck
import { db } from "mocks/db";
import { curry } from "ramda";

export const authenticateRequest = (req) => {
  const token = localStorage.getItem("__be_token__") || null;
  const userToken = req.headers
    .get("Authorization")
    ?.replace("Token", "")
    .replace(/\s/g, "");

  return token === userToken;
};

export const getUser = (username) => {
  const data = username ? username : atob(localStorage.getItem("__be_token__"));
  const user = db.user.findFirst({
    where: {
      username: {
        equals: data,
      },
    },
  });
  return user !== null ? user : false;
};
export const sanitizeData = (data) => {
  const { password, ...rest } = data;
  return rest;
};

export const curriedSanitizeData = curry(sanitizeData);

export const sanitizeTeams = (team) => {
  const members = team.members.map(curriedSanitizeData());
  const created_by = sanitizeData(team.created_by);
  const data = { ...team, members: members, created_by: created_by };
  return data;
};

export const curriedSanitizeTeams = curry(sanitizeTeams);

export const sanitizeLeadsAndClients = (persons) => {
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

export const getTeam = (id) => {
  const user = getUser();
  const team = db.team.findFirst({
    where: {
      id: { equals: Number(id) },
      members: {
        id: { equals: user.id },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  return sanitizeTeams(team);
};

export const findLeadsOrClientsByTeam = (db, team) => {
  const data = db.findMany({
    where: {
      team: {
        id: { equals: team },
      },
    },
  });
  return data;
};

export const create = (db, data) => {
  return db.create(data);
};

export const updateLeadOrClient = (db, id, team, data) => {
  const user = db.update({
    where: {
      id: { equals: Number(id) },
      team: {
        id: { equals: team },
      },
    },
    data: data,
  });
  return user;
};

export const deleteLeadOrClient = (db, id, team) => {
  const data = db.delete({
    where: {
      id: { equals: Number(id) },
      team: {
        id: { equals: team },
      },
    },
  });
  return data;
};

export const searchLeadsOrClients = (data, search) => {
  const dataByFilter = data.filter(
    ({ first_name, last_name }) =>
      first_name.toLowerCase().includes(search.toLowerCase()) ||
      last_name.toLowerCase().includes(search.toLowerCase())
  );
  return dataByFilter;
};

export const responseData = (req, res, ctx, conditional, func, data) => {
  if (conditional) {
    if (!authenticateRequest(req)) {
      return res(
        ctx.status(401),
        ctx.json({
          error: "Unauthorized",
        })
      );
    }
    const functionValue = func();
    const responseJson = data ? data : functionValue;
    return res(ctx.status(200), ctx.json(responseJson));
  }
  return res(
    ctx.status(500),
    ctx.json({
      error: "Error",
    })
  );
};

export const paginate = (array, page_size, page_number) => {
  const condition =
    page_number > 0
      ? array.length >= page_number * page_size ||
        array.length + 1 >= page_number * page_size
      : false;

  const startSlice = condition
    ? (page_number - 1) * page_size
    : array.length % page_size === 0
    ? array.length - page_size
    : array.length - (array.length % page_size);
  const endSlice = condition ? page_number * page_size : array.length;

  const paginator = array.slice(startSlice, endSlice);
  const hasNext = condition ? array.at(-1).id !== paginator.at(-1).id : false;
  return { results: paginator, has_next: hasNext, page: page_number };
};
