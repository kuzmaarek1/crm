import { screen, fireEvent } from "test-utils";
import * as actions from "test/actions/index.js";

export const addElement = async (dataForm, assigned, toast, numberElements) => {
  fireEvent.click(screen.getByRole("button", { name: /add-button/i }));
  await actions.handleChangeInputsForm(dataForm);
  await actions.handleChangeInputAssigned(assigned);
  await actions.handleSubmitAndDisplayToast(toast);
  await actions.displayList(numberElements);
};

export const searchElement = async (labelText, value, numberElements) => {
  const searchForm = screen.getByLabelText(labelText);
  fireEvent.change(searchForm, { target: { value: value } });
  await actions.displayList(numberElements);
};

export const updateElement = async (
  updateElement,
  formDataEdit,
  toast,
  numberElements,
  updatedElement
) => {
  await actions.loadingData();
  await actions.handleOpenDetailsModalAndAction(updateElement, /edit/i);
  await actions.handleChangeInputsForm(formDataEdit);
  await actions.handleChangeInputAssigned();
  await actions.handleSubmitAndDisplayToast(toast);
  await actions.displayList(numberElements);
  const element = await screen.findByText(updatedElement);
  expect(element).toBeInTheDocument();
};

export const deleteElement = async (
  numberElementBeforeDelete,
  deleteElement,
  toast,
  numberElementAfterDelete
) => {
  await actions.loadingData();
  await actions.displayList(numberElementBeforeDelete);
  await actions.handleOpenDetailsModalAndAction(deleteElement, /delete/i);
  await actions.displayToast(toast);
  await actions.displayList(numberElementAfterDelete);
};
