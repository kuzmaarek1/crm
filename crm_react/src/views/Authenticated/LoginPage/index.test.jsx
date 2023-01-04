import React from "react";
import { render, screen, fireEvent } from "test-utils";
import { LoginPage } from "views";

test("render log in page", () => {
  render(<LoginPage />);
  const logInElements = screen.getAllByText(/log in/i);
  expect(logInElements).toHaveLength(2);
});

test("render log in page - 2", () => {
  render(<LoginPage />);
  const labelElements = screen.queryByLabelText(/first name/i);
  expect(labelElements).not.toBeInTheDocument();
});

test("render sign up page", () => {
  render(<LoginPage />);
  const switchButton = screen.getByRole("button", { name: /switch-button/i });
  fireEvent.click(switchButton);
  const signUpElements = screen.getAllByText(/sign up/i);
  expect(signUpElements).toHaveLength(2);
});

test("render sign up page-2", () => {
  render(<LoginPage />);
  const switchButton = screen.getByRole("button", { name: /switch-button/i });
  fireEvent.click(switchButton);
  const signUpElements = screen.queryByText(/log in/i);
  expect(signUpElements).not.toBeInTheDocument();
});

test("render sign up page - 3", () => {
  render(<LoginPage />);
  const switchButton = screen.getByRole("button", { name: /switch-button/i });
  fireEvent.click(switchButton);
  const labelElements = screen.queryByLabelText(/first name/i);
  expect(labelElements).toBeInTheDocument();
});
