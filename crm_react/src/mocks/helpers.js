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

export const getTeam = (id) => {
  const user = db.user.findFirst({
    where: {
      id: id,
    },
  });
  return user;
};
