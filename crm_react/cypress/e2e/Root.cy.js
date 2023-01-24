import * as constants from "test/constants";

describe("Login", () => {
  it("Login with correct username, password", () => {
    cy.visit("http://localhost:3000/");
    constants.formDataLogin[1].forEach(({ name, value }) => {
      cy.findByLabelText(name).type(value);
    });
    cy.findByRole("button", { name: /login-or-signup/i }).click();
  });
});
