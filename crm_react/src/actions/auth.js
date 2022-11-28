import * as actionType from "constants/actionTypes";
import * as api from "api/index.js";

export const signIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: actionType.AUTH_START });
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: actionType.AUTH_TOKEN, data });

    const user = await api.getUser();
    dispatch({ type: actionType.AUTH_SUCCESS, data: user.data });
    navigate("/");
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL });
    console.log(error);
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: actionType.AUTH_START });
  try {
    const user = await api.signUp(formData);
    const { data } = await api.signIn(formData);

    dispatch({
      type: actionType.AUTH_TOKEN,
      data,
    });
    dispatch({
      type: actionType.AUTH_SUCCESS,
      data: user.data,
    });
  } catch (error) {
    dispatch({ type: actionType.AUTH_FAIL });
    console.log(error);
  }
};

export const logOut = (navigate) => async (dispatch) => {
  try {
    await api.logOut();
    dispatch({ type: actionType.LOGOUT });
    localStorage.clear();
    navigate("/log-in");
  } catch (error) {
    console.log(error);
  }
};
