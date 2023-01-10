import React from "react";
import { render, screen, fireEvent, waitFor } from "test-utils";
import * as constants from "test/constants";
import * as actions from "test/actions";
import * as actionsOnDatabse from "test/actions/actionsOnDatabase.js";
import { Root } from "views";

describe("Login", () => {
  test("Login with incorrect username, password", async () => {
    render(<Root />);
    actions.handleChangeInputsLogIn(constants.formDataLogin[0]);
    fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
    await actions.displayToast(/your username or password is incorrect/i);
  });

  test("Login with correct username, password", async () => {
    render(<Root />);
    actions.handleChangeInputsLogIn(constants.formDataLogin[1]);
    fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
    await waitFor(() => screen.findByText(/dawid/i));
  });
});

describe("Lead", () => {
  test("Display leads list", async () => {
    render(<Root />);
    fireEvent.click(screen.getByTestId("leads"));
    await actions.displayList(80);
  });

  test("Add lead with field assigned", async () => {
    render(<Root />);
    await actionsOnDatabse.addElement(
      constants.formDataAddLeads[0],
      "akuzma555@gmail.com",
      /added lead/i,
      85
    );
  });

  test("Add lead without field assigned", async () => {
    render(<Root />);
    await actionsOnDatabse.addElement(
      constants.formDataAddLeads[1],
      null,
      /added lead Mateusz/i,
      90
    );
  });

  test("Search lead", async () => {
    render(<Root />);
    await actionsOnDatabse.searchElement(
      /first name and last name/i,
      "arkadiusz Kuźma",
      10
    );
  });

  test("Update lead", async () => {
    render(<Root />);
    await actionsOnDatabse.updateElement(
      "Arkadiusz",
      constants.formDataEditLead,
      /updated lead/i,
      90,
      "Dawid"
    );
  });

  test("Delete lead", async () => {
    render(<Root />);
    await actionsOnDatabse.deleteElement(90, "Dawid", /deleted lead/i, 85);
  });

  test("Convert lead", async () => {
    render(<Root />);
    await actions.loadingData();
    await actions.displayList(85);
    await actions.handleOpenDetailsModalAndAction("Mateusz", /client/i);
    await actions.displayToast(/converted lead/i);
  });
});

describe("Client", () => {
  test("Display clients list", async () => {
    render(<Root />);
    await actions.displayList(70);
  });

  test("Add client with field assigned", async () => {
    render(<Root />);
    await actionsOnDatabse.addElement(
      constants.formDataAddClient,
      "akuzma555@gmail.com",
      /added client/i,
      75
    );
  });

  test("Search client", async () => {
    render(<Root />);
    await actionsOnDatabse.searchElement(
      /first name and last name/i,
      "Amadeusz Kuźma",
      10
    );
  });

  test("Update client", async () => {
    render(<Root />);
    await actionsOnDatabse.updateElement(
      "Amadeusz",
      constants.formDataEditClient,
      /updated client/i,
      75,
      "Dariusz"
    );
  });

  test("Delete client", async () => {
    render(<Root />);
    await actionsOnDatabse.deleteElement(75, "Dariusz", /deleted client/i, 70);
  });
});

describe("Team", () => {
  test("Display team", async () => {
    render(<Root />);
    fireEvent.click(screen.getByTestId("teams"));
    await actions.displayList(2);
  });

  test("Add team", async () => {
    render(<Root />);
    fireEvent.click(screen.getByTestId("teams"));
    await actionsOnDatabse.addElement(
      constants.formDataAddTeam,
      "team",
      /added team/i,
      3
    );
  });

  test("Update team", async () => {
    render(<Root />);
    await actionsOnDatabse.updateElement(
      /zespol testowy/i,
      constants.formDataEditTeam,
      /updated team/i,
      3,
      "Nowy zespół testowy",
      true
    );
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
