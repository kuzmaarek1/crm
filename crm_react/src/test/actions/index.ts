import { screen, fireEvent, waitForElementToBeRemoved } from "test-utils";
import type { TForm } from "types/test";

export const handleChangeInputsLogIn = (data: TForm) => {
  data.forEach(({ name, value }) => {
    const label = screen.getByLabelText(name);
    fireEvent.change(label, { target: { value } });
  });
};

export const handleChangeInputsForm = async (data: TForm) => {
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

export const handleChangeInputAssigned = async (value?: string | null) => {
  const assignedToLabel = await screen.findAllByLabelText(/assigned/i);
  fireEvent.change(assignedToLabel[0], {
    target: { value: value ? value : "" },
  });
};

export const loadingData = async () => {
  const loadingElement = await screen.findByTestId(/loading/i);
  expect(loadingElement).toBeInTheDocument();
};

export const checkIsTeamActive = async (team: string, number: number) => {
  const cellElement = await screen.findAllByText(team);
  expect(cellElement).toHaveLength(number);
};

export const displayList = async (number?: number) => {
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
  name: string | RegExp,
  buttonName: RegExp,
  isManyElements?: boolean,
  numberElemenet?: number,
  numberElementsToActions?: number
) => {
  if (!isManyElements || !numberElemenet || !numberElementsToActions) {
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

export const handleSubmitAndDisplayToast = async (toast: RegExp) => {
  const submitButton = await screen.findByRole("button", { name: /submit/i });
  fireEvent.click(submitButton);
  await displayToast(toast);
};

export const displayToast = async (toast: RegExp) => {
  const element = await screen.findByText(toast);
  expect(element).toBeInTheDocument();
};
