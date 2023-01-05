import { db } from "mocks/db";

export const authenticateRequest = (req) => {
  const token = localStorage.getItem("__be_token__") || null;
  const userToken = req.headers
    .get("Authorization")
    ?.replace("Token", "")
    .replace(/\s/g, "");

  return token === userToken;
};

export const getUser = () => {
  const username = atob(localStorage.getItem("__be_token__"));
  const user = db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  });
  return user;
};

export const changeDataTems = (team) => {
  const members = team.members.map((member) => {
    const { password, ...otherData } = member;
    return otherData;
  });
  const { password, ...otherDataUser } = team.created_by;
  const data = { ...team, members: members, created_by: otherDataUser };
  return data;
};

export const getTeam = (id) => {
  const team = db.team.findFirst({
    where: {
      id: { equals: Number(id) },
    },
  });
  return changeDataTems(team);
};
