import * as constants from "test/constants";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    constants.formDataLogin[1].forEach(({ name, value }) => {
      cy.findByLabelText(name).type(value);
    });
    /*
    cy.findByLabelText(/username/i).type("akuzma5@gmail.com");

   */
    cy.findByRole("button", { name: /login-or-signup/i }).click();
  });
});
