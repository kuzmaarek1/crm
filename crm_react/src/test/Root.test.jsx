import React from "react";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { formDataAddLead, formDataEditLead } from "test/constant.js";
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
const loadingData = async () => {
  const loadingElement = await screen.findByTestId(/loading/i);
  expect(loadingElement).toBeInTheDocument();
};

const displayList = async (number) => {
  await loadingData();
  const cellElement = await screen.findAllByTestId(/cell/i);
  expect(cellElement).toHaveLength(number);
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
    await displayList(80);
  });

  test("Add lead", async () => {
    render(<Root />);
    fireEvent.click(screen.getByRole("button", { name: /add-button/i }));
    handleChangeInputsForm(formDataAddLead);

    const assignedToLabel = await screen.findAllByLabelText(/assigned/i);
    fireEvent.change(assignedToLabel[0], {
      target: { value: "akuzma555@gmail.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    const successElement = await screen.findByText(/Added lead/i);
    expect(successElement).toBeInTheDocument();

    await displayList(85);
  });

  test("Search lead", async () => {
    render(<Root />);
    const searchForm = screen.getByLabelText(/first name and last name/i);
    fireEvent.change(searchForm, { target: { value: "arkadiusz Kuźma" } });
    await displayList(10);
  });

  test("Update lead", async () => {
    render(<Root />);
    await loadingData();
    const lead = await screen.findByText("Arkadiusz");
    fireEvent.click(lead);
    const editButton = await screen.findByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    handleChangeInputsForm(formDataEditLead);
    const assignedToLabel = await screen.findAllByLabelText(/assigned/i);
    fireEvent.change(assignedToLabel[0], {
      target: { value: " " },
    });
    const submitButton = await screen.findByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    const successElement = await screen.findByText(/Updated lead/i);
    expect(successElement).toBeInTheDocument();
    await displayList(85);
    const leadEdit = await screen.findByText("Dawid");
    expect(leadEdit).toBeInTheDocument();
  });
});

describe("Client", () => {
  test("Display clients list", async () => {
    render(<Root />);
    fireEvent.click(screen.getByTestId("clients"));
    await displayList(75);
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
