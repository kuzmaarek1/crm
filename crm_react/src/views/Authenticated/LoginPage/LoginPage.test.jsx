import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppProviders from "providers";
import { LoginPage } from "views";

test("render log in page", () => {
  render(
    <AppProviders>
      <LoginPage />
    </AppProviders>
  );
  const LogInElements = screen.getAllByText(/log in/i);
  expect(LogInElements).toHaveLength(2);
});
