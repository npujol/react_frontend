import { AuthApi, UsersApi } from "../../client";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  UNLOAD_LOGIN_PAGE,
  UNLOAD_REGISTER_PAGE,
  SET_AUTH_LOAD,
} from "../../constants/actionTypes";
import jwtService from "../../jwt.service";
import { load_app } from "../../modules/App/common.thunk.js";

const authApi = new AuthApi();
const userApi = new UsersApi();

function setAuth({ username, token }) {
  window.localStorage.setItem("jwt", token);
  jwtService.saveCredentials(username, token);
  jwtService.setHeader();
}

export const login = (values) => {
  return async (dispatch) => {
    try {
      const payload = await authApi.authLoginCreate({
        email: values.email,
        password: values.password,
      });
      setAuth(payload);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: payload,
      });
      dispatch(load_app());
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: JSON.parse(error.response.text),
      });
    }
  };
};

export const register = (values) => {
  return async (dispatch) => {
    try {
      const payload = await authApi.authRegistrationCreate({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      setAuth(payload);
      dispatch({ type: REGISTER_SUCCESS, payload });

      dispatch(load_app());
    } catch (error) {
      dispatch({
        type: REGISTER_FAILED,
        payload: JSON.parse(error.response.text),
      });
    }
  };
};

export const unloadLogin = () => {
  return { type: UNLOAD_LOGIN_PAGE };
};

export const unloadRegister = () => {
  return { type: UNLOAD_REGISTER_PAGE };
};

export const setAuthLoad = () => {
  return async (dispatch) => {
    const username = jwtService.getUsername();
    const data = await userApi.usersRead(username);
    const payload = { payload: data };
    dispatch({ type: SET_AUTH_LOAD, payload });

    dispatch(load_app());
  };
};
