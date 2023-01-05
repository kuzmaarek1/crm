import React from "react";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { Root } from "views";

const handleChangeInputsAuth = (username, password) => {
  [username, password].forEach((items, index) => {
    const label =
      index === 0
        ? screen.getByLabelText(/username/i)
        : screen.getByLabelText(/password/i);
    fireEvent.change(label, {
      target: { value: items },
    });
  });
};

describe("Login and Logout", () => {
  test("Login with incorrect username, password", async () => {
    render(<Root />);
    handleChangeInputsAuth("akuzma5@gmail.com", "Mrooodyle1eee@");
    fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
    const errorElement = await screen.findByText(
      /your username or password is incorrect/i
    );
    expect(errorElement).toBeInTheDocument();
  });

  test("Login with correct username, password", async () => {
    render(<Root />);
    handleChangeInputsAuth("akuzma555@gmail.com", "Mrooodyle1eee@");
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
