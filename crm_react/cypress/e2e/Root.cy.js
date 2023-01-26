import * as constants from "test/constants";

const handleScrollElements = (teams) => {
  for (let i = 1; i < 6; i++) {
    const number = teams ? 17 * i + 1 : 17 * 5 * i + 5;
    cy.findAllByTestId(/cell/i)
      .should("have.length", number)
      .eq(-2)
      .scrollIntoView({
        duration: 500,
        easing: "linear",
      });
    cy.get("#list_conatainer").scrollTo("top", {
      duration: 500,
      easing: "linear",
    });
  }
  const number = teams ? 101 : 505;
  cy.findAllByTestId(/cell/i).should("have.length", number);
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
    cy.findByTestId(/loading/i);
    handleScrollElements();
  });
});

describe("Clients", () => {
  it("Scroll elements on clients page", () => {
    cy.findByTestId("clients").click();
    cy.findByTestId(/loading/i);
    handleScrollElements();
  });
});

describe("Teams", () => {
  it("Scroll elements on teams page", () => {
    cy.findByLabelText(/name/i).clear();
    handleScrollElements(true);
  });
});
