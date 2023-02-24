import { rest } from "msw";
import { db } from "mocks/db";
import { getUser, sanitizeData, responseData, create } from "mocks/helpers";
import type { LoginValues, RegisterValues } from "types";
import type {
  LoginResponse,
  RegisterResponse,
  UserResponse,
  LogoutResponse,
  LogoutMessage,
} from "types/mocks";

export const auth = [
  rest.post<LoginValues, any, LoginResponse>(
    "http://localhost:8000/api/token/login/",
    (req, res, ctx) => {
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
    }
  ),
  rest.get<any, any, UserResponse>(
    "http://localhost:8000/api/users/me/",
    (req, res, ctx) => {
      const getDetailsUser = () => {
        const user = getUser(undefined);
        const data = user.id ? sanitizeData(user) : null;
        return data;
      };
      return responseData<"User">(req, res, ctx, true, getDetailsUser);
    }
  ),
  rest.post<RegisterValues, any, RegisterResponse>(
    "http://localhost:8000/api/users/",
    (req, res, ctx) => {
      const password = req.body.password;
      const { re_password, ...otherData } = req.body;
      const user = getUser(req.body.username);
      if (password.length < 8) {
        return res(
          ctx.status(400),
          ctx.json({
            error:
              "Password must contain at least 8 characters special character",
          })
        );
      }
      if (user.id) {
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
    }
  ),

  rest.post<any, any, LogoutResponse>(
    "http://localhost:8000/api/token/logout/",
    (req, res, ctx) => {
      const logout = (): LogoutMessage | null => {
        const user = getUser(undefined);
        localStorage.removeItem("__be_token__");
        if ("last_name" in user) {
          return { message: "Logout" };
        }
        return null;
      };
      return responseData<"LogoutResponse">(req, res, ctx, true, logout);
    }
  ),
];
