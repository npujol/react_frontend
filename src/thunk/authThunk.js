import { AuthApi } from "../client";
import {
  LOGIN_PAGE_UNLOADED,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../constants/actionTypes";
import jwtService from "../jwt.service";

const authApi = new AuthApi();

function setAuth({ username, token }) {
  window.localStorage.setItem("jwt", token);
  jwtService.saveCredentials(username, token);
  jwtService.setHeader();
}

export const login = (values) => {
  return async (dispatch) => {
    const payload = await authApi.authLoginCreate({
      email: values.email,
      password: values.password,
    });
    setAuth(payload);

    dispatch({
      type: LOGIN,
      payload: payload,
    });
  };
};

export const register = (values) => {
  return async (dispatch) => {
    const payload = await authApi.authRegistrationCreate({
      email: values.email,
      password: values.password,
      username: values.username,
    });
    setAuth(payload);

    dispatch({ type: REGISTER, payload });
  };
};

export const unloadLogin = () => {
  return { type: LOGIN_PAGE_UNLOADED };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.setItem("jwt", "");
    jwtService.destroyCredentials();
    dispatch({ type: LOGOUT });
  };
};
