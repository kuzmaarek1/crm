import { screen, fireEvent, waitForElementToBeRemoved } from "test-utils";

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

export const checkIsTeamActive = async (team, number) => {
  const cellElement = await screen.findAllByText(team);
  expect(cellElement).toHaveLength(number);
};

export const displayList = async (number) => {
  await loadingData();
  if (number) {
    const cellElement = await screen.findAllByTestId(/cell/i);
    expect(cellElement).toHaveLength(number);
  } else {
    await waitForElementToBeRemoved(screen.getByTestId(/loading/i));
    const notClientsElement = screen.queryByTestId(/cell/i);
    expect(notClientsElement).not.toBeInTheDocument();
  }
};

export const handleOpenDetailsModalAndAction = async (
  name,
  buttonName,
  isManyElements,
  numberElemenet,
  numberElementsToActions
) => {
  if (!isManyElements) {
    const element = await screen.findByText(name);
    fireEvent.click(element);
  } else {
    const cellElement = await screen.findAllByTestId(/cell/i);
    expect(cellElement).toHaveLength(numberElemenet);
    fireEvent.click(cellElement[numberElementsToActions]);
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
  const element = await screen.findByText(toast);
  expect(element).toBeInTheDocument();
};
