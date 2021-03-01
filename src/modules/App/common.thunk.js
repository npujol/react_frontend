import { UsersApi } from "../../client";
import {
  LOAD_APP,
  REDIRECT,
  LOGOUT,
  SET_REDIRECT,
  SET_AUTH_LOAD,
} from "../../constants/actionTypes";
import jwtService from "../../jwt.service";

const usersApi = new UsersApi();

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.setItem("jwt", "");
    jwtService.destroyCredentials();
    dispatch({ type: LOGOUT });
  };
};

export const load_app = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("jwt");
    console.log("token in load_app", token);
    if (token) {
      try {
        jwtService.setHeader();
        const data = await usersApi.usersRead(jwtService.getUsername());
        const payload = { user: data, token: token };
        dispatch({ type: SET_AUTH_LOAD, payload });
      } catch (error) {
        window.localStorage.setItem("jwt", "");
        jwtService.destroyCredentials();
      }
    }
    dispatch({ type: LOAD_APP });
  };
};

export const redirect = () => {
  return async (dispatch) => {
    dispatch({ type: REDIRECT });
  };
};

export const setRedirect = (route) => {
  return async (dispatch) => {
    const payload = { route: route };
    dispatch({ type: SET_REDIRECT, payload });
  };
};
