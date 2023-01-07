import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "test-utils";
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
const handleChangeInputsForm = (data) => {
  data.forEach(async ({ name, value }) => {
    const label = await screen.findByLabelText(name);
    fireEvent.change(label, { target: { value } });
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

  test("Add lead", async () => {
    render(<Root />);
    const formData = [
      { name: "First name", value: "Arkadiusz" },
      { name: "Last name", value: "Kuźma" },
      { name: /email/i, value: "akuzma503@gmail.com" },
      { name: /phone/i, value: "546789998" },
      { name: /description/i, value: "To jest test" },
    ];

    fireEvent.click(screen.getByRole("button", { name: /add-button/i }));
    handleChangeInputsForm(formData);

    const assignedToLabel = await screen.findAllByLabelText(/assigned/i);
    fireEvent.change(assignedToLabel[0], {
      target: { value: "akuzma555@gmail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    const successElement = await screen.findByText(/Added lead/i);
    expect(successElement).toBeInTheDocument();
    const loadingElement = await screen.findByTestId(/loading/i);
    expect(loadingElement).toBeInTheDocument();

    for (const data of formData) {
      if (String(data.name) !== "/description/i") {
        const element = await screen.findByText(data.value);
        expect(element).toBeInTheDocument();
      }
    }
  });

  test("Search lead", async () => {
    render(<Root />);
    const searchForm = screen.getByLabelText(/first name and last name/i);
    fireEvent.change(searchForm, { target: { value: "arkadiusz Kuźma" } });

    const loadingElement = screen.getByTestId(/loading/i);
    expect(loadingElement).toBeInTheDocument();

    const elements = await screen.findAllByTestId(/cell/i);
    expect(elements).toHaveLength(10);
    screen.debug(undefined, 1000000);
  });
});
/*
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
*/
