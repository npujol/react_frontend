import { UsersApi } from "../../client";
import { LOAD_APP, REDIRECT, LOGOUT } from "../../constants/actionTypes";
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
    if (token) {
      jwtService.setHeader();
    }
    const payload = token ? usersApi.usersRead(JwtService.getUsername()) : null;
    dispatch({ type: LOAD_APP, payload, token, skipTracking: true });
  };
};

export const redirect = () => {
  return async (dispatch) => {
    window.localStorage.setItem("jwt", "");
    jwtService.destroyCredentials();
    dispatch({ type: LOGOUT });
  };
};
