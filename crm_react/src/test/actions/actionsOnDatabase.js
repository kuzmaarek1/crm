import { screen, fireEvent } from "test-utils";
import * as actions from "test/actions/index.js";

export const addElement = async (dataForm, assigned, toast, numberElements) => {
  fireEvent.click(screen.getByRole("button", { name: /add-button/i }));
  await actions.handleChangeInputsForm(dataForm);
  assigned !== "team" && (await actions.handleChangeInputAssigned(assigned));
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
  updatedElement,
  isManyElements
) => {
  await actions.loadingData();
  await actions.handleOpenDetailsModalAndAction(
    updateElement,
    /edit/i,
    isManyElements,
    3,
    2
  );
  await actions.handleChangeInputsForm(formDataEdit);
  if (!isManyElements) await actions.handleChangeInputAssigned();
  await actions.handleSubmitAndDisplayToast(toast);
  await actions.displayList(numberElements);
  if (!isManyElements) {
    const element = await screen.findByText(updatedElement);
    expect(element).toBeInTheDocument();
  } else {
    const element = await screen.findAllByText(updatedElement);
    expect(element).toHaveLength(2);
  }
};

export const deleteElement = async (
  numberElementBeforeDelete,
  deleteElement,
  toast,
  numberElementAfterDelete,
  isManyElements
) => {
  await actions.displayList(numberElementBeforeDelete);
  await actions.handleOpenDetailsModalAndAction(
    deleteElement,
    /delete/i,
    isManyElements,
    3,
    1
  );
  await actions.displayToast(toast);
  await actions.displayList(numberElementAfterDelete);
};
