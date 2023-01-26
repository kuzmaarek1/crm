import * as constants from "test/constants";

const handleScrollElements = () => {
  cy.findByTestId(/loading/i);
  for (let i = 1; i < 6; i++) {
    cy.findAllByTestId(/cell/i).eq(-2).scrollIntoView({
      duration: 500,
      easing: "linear",
    });
    cy.get("#list_conatainer").scrollTo("top", {
      duration: 500,
      easing: "linear",
    });
  }
  cy.findAllByTestId(/cell/i).should("have.length", 505);
};

const login = () => {
  cy.visit("http://localhost:3000/");
  constants.formDataLogin[1].forEach(({ name, value }) => {
    cy.findByLabelText(name).type(value);
  });
  cy.findByRole("button", { name: /login-or-signup/i }).click();
  cy.findByText(/dawid/i);
  cy.findByTestId("teams").click();
  cy.findByTestId(/loading/i);
  cy.findByLabelText(/name/i).type("Moj zespol");
  cy.findByText(/activate/i).click();
};

beforeEach(() => {
  login();
});

describe("Leads", () => {
  it("Scroll elements on leads page", () => {
    cy.findByTestId("leads").click();
    handleScrollElements();
  });
});

describe("Clients", () => {
  it("Scroll elements on clients page", () => {
    cy.findByTestId("clients").click();
    handleScrollElements();
  });
});
/*
describe("Teams", () => {
  it("Scroll elements on teams page", () => {
    cy.findByTestId("teams").click();
    //    handleScrollElements();
  });
});
*/
