import React from "react";
import { render, screen, fireEvent, waitFor } from "test-utils";
import {
  formDataAddLeads,
  formDataEditLead,
  formDataLoginIncorrect,
  formDataLoginCorrect,
} from "test/constant.js";
import { Root } from "views";

const handleChangeInputsAuth = (data) => {
  data.forEach(({ name, value }) => {
    const label = screen.getByLabelText(name);
    fireEvent.change(label, { target: { value } });
  });
};

const handleChangeInputsForm = (data) => {
  data.forEach(async ({ name, value }) => {
    const label = await screen.findByLabelText(name);
    fireEvent.change(label, { target: { value } });
  });
};

const handleChangeInputAssigned = async (value) => {
  const assignedToLabel = await screen.findAllByLabelText(/assigned/i);
  fireEvent.change(assignedToLabel[0], {
    target: { value: value ? value : " " },
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

export const handleOpenDetailsModalAndAction = async (name, buttonName) => {
  const element = await screen.findByText(name);
  fireEvent.click(element);
  const button = await screen.findByRole("button", { name: buttonName });
  fireEvent.click(button);
};

export const handleSubmitAndDisplayToast = async (toast) => {
  const submitButton = await screen.findByRole("button", { name: /submit/i });
  fireEvent.click(submitButton);
  await displayToast(toast);
};

export const displayToast = async (toast) => {
  const successElement = await screen.findByText(toast);
  expect(successElement).toBeInTheDocument();
};

describe("Login", () => {
  test("Login with incorrect username, password", async () => {
    render(<Root />);
    handleChangeInputsAuth(formDataLoginIncorrect);
    fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
    await displayToast(/your username or password is incorrect/i);
  });
  test("Login with correct username, password", async () => {
    render(<Root />);
    handleChangeInputsAuth(formDataLoginCorrect);
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

  test("Add lead with field assigned", async () => {
    render(<Root />);
    fireEvent.click(screen.getByRole("button", { name: /add-button/i }));
    handleChangeInputsForm(formDataAddLeads[0]);
    await handleChangeInputAssigned("akuzma555@gmail.com");
    await handleSubmitAndDisplayToast(/added lead/i);
    await displayList(85);
  });
  test("Add lead without field assigned", async () => {
    render(<Root />);
    fireEvent.click(screen.getByRole("button", { name: /add-button/i }));
    handleChangeInputsForm(formDataAddLeads[1]);
    await handleChangeInputAssigned(null);
    await handleSubmitAndDisplayToast(/added lead Mateusz/i);
    await displayList(90);
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
    await handleOpenDetailsModalAndAction("Arkadiusz", /edit/i);
    handleChangeInputsForm(formDataEditLead);
    await handleChangeInputAssigned();
    await handleSubmitAndDisplayToast(/updated lead/i);
    await displayList(90);
    const leadEdit = await screen.findByText("Dawid");
    expect(leadEdit).toBeInTheDocument();
  });

  test("Delete lead", async () => {
    render(<Root />);
    await loadingData();
    await displayList(90);
    await handleOpenDetailsModalAndAction("Dawid", /delete/i);
    await displayToast(/deleted lead/i);
    await displayList(85);
  });
  test("Convert lead", async () => {
    render(<Root />);
    await loadingData();
    await displayList(85);
    await handleOpenDetailsModalAndAction("Mateusz", /client/i);
    await displayToast(/converted lead/i);
  });
});

describe("Client", () => {
  test("Display clients list", async () => {
    render(<Root />);
    //   fireEvent.click(screen.getByTestId("clients"));
    await displayList(80);
    screen.debug(undefined, 8000000);
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
