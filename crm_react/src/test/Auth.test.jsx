import React from "react";
import { render, screen, fireEvent } from "test-utils";
import { Auth } from "views";

const handleChangePage = () => {
  const switchButton = screen.getByRole("button", { name: /switch-button/i });
  fireEvent.click(switchButton);
};

describe("Render login page", () => {
  test("Render elements button and header on login page", () => {
    render(<Auth />);
    const logInElements = screen.getAllByText(/log in/i);
    expect(logInElements).toHaveLength(2);
  });

  test("Not render input first name on login page", () => {
    render(<Auth />);
    const labelElements = screen.queryByLabelText(/first name/i);
    expect(labelElements).not.toBeInTheDocument();
  });
});

describe("Render signup page", () => {
  test("Render elements button and header on signup page", () => {
    render(<Auth />);
    handleChangePage();
    const signUpElements = screen.getAllByText(/sign up/i);
    expect(signUpElements).toHaveLength(2);
  });
  test("Not render elements with login page", () => {
    render(<Auth />);
    handleChangePage();
    const signUpElements = screen.queryByText(/log in/i);
    expect(signUpElements).not.toBeInTheDocument();
  });
  test("Render input first name on login page", () => {
    render(<Auth />);
    handleChangePage();
    const labelElements = screen.queryByLabelText(/first name/i);
    expect(labelElements).toBeInTheDocument();
  });
});
