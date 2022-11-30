import * as actionType from "constants/actionTypes";

const clientReducer = (
  state = { clientsData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default clientReducer;
