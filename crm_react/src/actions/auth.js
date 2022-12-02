import * as api from "api/index.js";
import {
  authStart,
  authToken,
  authSuccess,
  authFail,
  logout,
} from "reducers/auth";

export const signIn = (formData, navigate) => async (dispatch) => {
  dispatch(authStart());
  try {
    const { data } = await api.signIn(formData);
    dispatch(authToken({ data }));

    const user = await api.getUser();
    dispatch(authSuccess({ data: user.data }));
    navigate("/");
  } catch (error) {
    dispatch(authFail());
    console.log(error);
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch(authStart());
  try {
    const user = await api.signUp(formData);
    const { data } = await api.signIn(formData);

    dispatch(authToken({ data }));
    dispatch(authSuccess({ data: user.data }));
  } catch (error) {
    dispatch(authFail());
    console.log(error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await api.logOut();
    dispatch(logout());
    //dispatch({ type: actionType.LOGOUT_TEAM });
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
