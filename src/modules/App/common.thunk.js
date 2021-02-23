import { UsersApi } from "../../client";
import {
  LOAD_APP,
  REDIRECT,
  LOGOUT,
  SET_REDIRECT,
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
      jwtService.setHeader();
      const payload = { user: usersApi.usersRead(jwtService.getUsername()) };
      dispatch({ type: LOAD_APP, payload });
    } else {
      dispatch({ type: LOAD_APP });
    }
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
