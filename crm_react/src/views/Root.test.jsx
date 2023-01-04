import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { Root } from "views";

export const handlers = [
  rest.post("http://localhost:8000/api/token/login/", (req, res, ctx) => {
    if (
      "Krokodyle1v" === req.body.password &&
      "akuzma5@gmail.com" === req.body.username
    ) {
      localStorage.setItem("token", "f6080be980b6e7b7b9c34c43a12fd27e2d32cb67");
      return res(
        ctx.status(200),
        ctx.json({ auth_token: "f6080be980b6e7b7b9c34c43a12fd27e2d32cb67" })
      );
    } else {
      res(ctx.status(500));
    }
  }),
  rest.get("http://localhost:8000/api/users/me/", (req, res, ctx) => {
    if (localStorage.getItem("token")) {
      return res(
        ctx.status(200),
        ctx.json({
          id: "1",
          username: "akuzma5@gmail.com",
          first_name: "Dawid",
          last_name: "Kuźma",
        })
      );
    } else {
      res(ctx.status(500));
    }
  }),
  rest.get("http://localhost:8000/api/teams/get_team/", (req, res, ctx) => {
    if (localStorage.getItem("token")) {
      return res(
        ctx.status(200),
        ctx.json({
          id: "1",
          name: "To jest moj zespoł",
        })
      );
    } else {
      res(ctx.status(500));
    }
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test("Login", async () => {
  render(<Root />);
  const labelUsername = screen.getByLabelText(/username/i);
  const username = "akuzma5@gmail.com";
  const labelPassword = screen.getByLabelText(/password/i);
  const password = "Krokodyle1v";
  fireEvent.change(labelUsername, {
    target: { value: username },
  });
  fireEvent.change(labelPassword, {
    target: { value: password },
  });
  fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
  await waitFor(() => screen.findByText(/dawid/i));
});
