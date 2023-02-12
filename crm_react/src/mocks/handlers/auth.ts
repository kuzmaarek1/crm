// @ts-nocheck
import { rest } from "msw";
import { db } from "mocks/db";
import { getUser, sanitizeData, responseData, create } from "mocks/helpers";

export const auth = [
  rest.post("http://localhost:8000/api/token/login/", (req, res, ctx) => {
    const user = db.user.findFirst({
      where: {
        username: {
          equals: req.body.username,
        },
      },
    });
    if (user && user.password === req.body.password) {
      const token = btoa(user.username);
      localStorage.setItem("__be_token__", token);
      return res(ctx.status(200), ctx.json({ auth_token: token }));
    }
    return res(
      ctx.status(403),
      ctx.json({
        error: "Invalid user data",
      })
    );
  }),
  rest.get("http://localhost:8000/api/users/me/", (req, res, ctx) => {
    const getDetailsUser = () => {
      const user = getUser();
      const data = sanitizeData(user);
      return data;
    };
    return responseData(req, res, ctx, true, getDetailsUser, null);
  }),
  rest.post("http://localhost:8000/api/users/", (req, res, ctx) => {
    const password = req.body.password;
    const { re_password, ...otherData } = req.body;
    const user = getUser(req.body.username);
    if (password.length < 8) {
      return res(
        ctx.status(400),
        ctx.json({
          message:
            "Password must contain at least 8 characters special character",
        })
      );
    }
    if (user !== false) {
      return res(
        ctx.status(409),
        ctx.json({
          error: "Conflict",
        })
      );
    }
    create(db.user, otherData);
    return res(
      ctx.status(200),
      ctx.json({
        message: "Create",
      })
    );
  }),

  rest.post("http://localhost:8000/api/token/logout/", (req, res, ctx) => {
    const logout = () => {
      localStorage.removeItem("__be_token__");
    };
    return responseData(req, res, ctx, true, logout, { message: "Logout" });
  }),
];
