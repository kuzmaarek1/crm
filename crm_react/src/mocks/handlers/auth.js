import { rest } from "msw";
import { db } from "mocks/db";
import { authenticateRequest, getUser } from "mocks/helpers";

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
    const user = getUser();
    if (authenticateRequest(req)) {
      return res(ctx.status(200), ctx.json(user));
    }
    return res(
      ctx.status(401),
      ctx.json({
        error: "error",
      })
    );
  }),
];
