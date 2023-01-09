import React from "react";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { formDataSignUp } from "test/constants";
import { handleChangeInputsForm, displayToast } from "test/actions";
import { Auth } from "views";

const handleChangePage = () => {
  const switchButton = screen.getByRole("button", { name: /switch-button/i });
  fireEvent.click(switchButton);
};

const createUser = async (data, toast, loadingToast) => {
  render(<Auth />);
  handleChangePage();
  const firstNameInput = await screen.findByLabelText(/first name/i);
  expect(firstNameInput).toBeInTheDocument();
  await handleChangeInputsForm(data);
  fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
  if (loadingToast) {
    const loadingElement = await screen.findByText(/creating new user/i);
    expect(loadingElement).toBeInTheDocument();
    await waitFor(() => expect(screen.queryAllByText(toast)).toHaveLength(2));
  } else {
    await displayToast(toast);
  }
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

  test("Render input first name on signup page", () => {
    render(<Auth />);
    handleChangePage();
    const labelElements = screen.queryByLabelText(/first name/i);
    expect(labelElements).toBeInTheDocument();
  });

  test("Create user", async () => {
    await createUser(formDataSignUp[0], /created new user/i, false);
  });

  test("Not create user, because user is exist", async () => {
    await createUser(formDataSignUp[0], /probability user is exist/i, false);
  });

  test("Not create user, because password is too short", async () => {
    await createUser(formDataSignUp[1], /probability user is exist/i, true);
  });
});
