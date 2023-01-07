import { db } from "mocks/db";

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
  return user;
};
export const sanitizeData = (data) => {
  const { password, ...rest } = data;
  return rest;
};

export const sanitizeTems = (team) => {
  const members = team.members.map((member) => sanitizeData(member));
  const created_by = sanitizeData(team.created_by);
  const data = { ...team, members: members, created_by: created_by };
  return data;
};

export const sanitizeLeadsAndClients = (persons) => {
  const data = persons.map((person) => {
    const { team, ...otherDataPerson } = person;
    const created_by = sanitizeData(otherDataPerson.created_by);
    const assigned_to = sanitizeData(otherDataPerson.assigned_to);
    return {
      ...otherDataPerson,
      created_by: created_by,
      assigned_to: assigned_to,
    };
  });
  return data;
};

export const getTeam = (id) => {
  const team = db.team.findFirst({
    where: {
      id: { equals: Number(id) },
    },
  });
  return sanitizeTems(team);
};

export const createLead = (data) => {
  db.lead.create(data);
};

export const searchLeadsOrClients = (data, search) => {
  const dataByFilter = data.filter(
    ({ first_name, last_name }) =>
      first_name.toLowerCase().includes(search.toLowerCase()) ||
      last_name.toLowerCase().includes(search.toLowerCase())
  );
  return dataByFilter;
};
