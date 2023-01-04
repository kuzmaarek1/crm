import React from "react";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { Root } from "views";

test("Login", async () => {
  render(<Root />);
  const labelUsername = screen.getByLabelText(/username/i);
  const username = "akuzma5@gmail.com";
  const labelPassword = screen.getByLabelText(/password/i);
  const password = "Krokodyle1v";
  fireEvent.change(labelUsername, {
    target: { value: username },
  });
  fireEvent.change(labelPassword, {
    target: { value: password },
  });
  fireEvent.click(screen.getByRole("button", { name: /login-or-signup/i }));
  await waitFor(() => screen.findByText(/dawid/i));
});
