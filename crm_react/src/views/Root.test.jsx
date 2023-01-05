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

describe("Login", () => {
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
});

describe("Lead", () => {
  test("Display leads list", async () => {
    render(<Root />);
    fireEvent.click(screen.getByTestId("leads"));
    const loadingElement = await screen.findByTestId(/loading/i);
    expect(loadingElement).toBeInTheDocument();
    const cellElement = await screen.findAllByTestId(/cell/i);
    expect(cellElement).toHaveLength(80);
  });
});

describe("Client", () => {
  test("Display clients list", async () => {
    render(<Root />);
    fireEvent.click(screen.getByTestId("clients"));
    const loadingElement = await screen.findByTestId(/loading/i);
    expect(loadingElement).toBeInTheDocument();
    const cellElement = await screen.findAllByTestId(/cell/i);
    expect(cellElement).toHaveLength(80);
  });
});

describe("Logout", () => {
  test("Display login page after logout", async () => {
    render(<Root />);
    fireEvent.click(screen.getByTestId("my-account"));
    const buttonLogout = screen.getByRole("button", {
      name: /logout-button/i,
    });
    fireEvent.click(buttonLogout);
    const logInElements = await screen.findAllByText(/log in/i);
    expect(logInElements).toHaveLength(2);
  });
});
