import React from "react";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { Root } from "views";

describe("Login and Logout", () => {
  test("Login with correct username, password", async () => {
    render(<Root />);
    const labelUsername = screen.getByLabelText(/username/i);
    const username = "akuzma555@gmail.com";
    const labelPassword = screen.getByLabelText(/password/i);
    const password = "Mrooodyle1eee@";
    fireEvent.change(labelUsername, {
      target: { value: username },
    });
    fireEvent.change(labelPassword, {
      target: { value: password },
    });
    fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
    await waitFor(() => screen.findByText(/dawid/i));
  });
  test("Logout", async () => {
    render(<Root />);
    const buttonLogout = screen.getByRole("button", {
      name: /logout-button/i,
    });
    fireEvent.click(buttonLogout);
    const logInElements = await screen.findAllByText(/log in/i);
    expect(logInElements).toHaveLength(2);
  });
});

test("Login with incorrect username, password", async () => {
  render(<Root />);
  const labelUsername = screen.getByLabelText(/username/i);
  const username = "akuzma5@gmail.com";
  const labelPassword = screen.getByLabelText(/password/i);
  const password = "Mrooodyle1eee@";
  fireEvent.change(labelUsername, {
    target: { value: username },
  });
  fireEvent.change(labelPassword, {
    target: { value: password },
  });
  fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
  const errorElement = await screen.findByText(
    /your username or password is incorrect/i
  );
  expect(errorElement).toBeInTheDocument();
});
