import { screen, fireEvent, waitFor } from "test-utils";

export const handleChangeInputsLogIn = (data) => {
  data.forEach(({ name, value }) => {
    const label = screen.getByLabelText(name);
    fireEvent.change(label, { target: { value } });
  });
};

export const handleChangeInputsForm = async (data) => {
  for await (const { name, value } of data) {
    if (name !== "Name") {
      const label = await screen.findByLabelText(name);
      fireEvent.change(label, { target: { value } });
    } else {
      const label = await screen.findAllByLabelText(name);
      fireEvent.change(label[1], { target: { value } });
    }
  }
};

export const handleChangeInputAssigned = async (value) => {
  const assignedToLabel = await screen.findAllByLabelText(/assigned/i);
  fireEvent.change(assignedToLabel[0], {
    target: { value: value ? value : "" },
  });
};

export const loadingData = async () => {
  const loadingElement = await screen.findByTestId(/loading/i);
  expect(loadingElement).toBeInTheDocument();
};

export const displayList = async (number) => {
  await loadingData();
  const cellElement = await screen.findAllByTestId(/cell/i);
  expect(cellElement).toHaveLength(number);
};

export const handleOpenDetailsModalAndAction = async (
  name,
  buttonName,
  team
) => {
  if (!team) {
    const element = await screen.findByText(name);
    fireEvent.click(element);
  } else {
    const cellElement = await screen.findAllByTestId(/cell/i);
    expect(cellElement).toHaveLength(3);
    fireEvent.click(cellElement[2]);
  }
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
