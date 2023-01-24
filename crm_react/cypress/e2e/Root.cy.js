import * as constants from "test/constants";

describe("Login", () => {
  it("Login with correct username, password", async () => {
    cy.visit("http://localhost:3000/");
    constants.formDataLogin[1].forEach(({ name, value }) => {
      cy.findByLabelText(name).type(value);
    });
    cy.findByRole("button", { name: /login-or-signup/i }).click();
    cy.findByText(/dawid/i);

    cy.findByTestId("leads").click();
    cy.findByTestId(/loading/i);
    cy.findAllByTestId(/cell/i).should("have.length", 80);
  });
});
