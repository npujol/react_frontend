import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  ASYNC_START,
  UPDATE_FIELD_AUTH,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    case LOGIN_SUCCESS:
      return {
        ...state,
        redirectTo: "/",
        token: action.payload.token,
        currentUser: action.payload.profile,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        redirectTo: null,
        token: null,
        currentUser: null,
        errors: action.payload.errors.error,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        redirectTo: "/",
        token: action.payload.token,
        currentUser: action.payload.profile,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        redirectTo: null,
        token: null,
        currentUser: null,
        usernameError: action.payload.errors.username,
        emailError: action.payload.errors.email,
      };
    case LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    default:
      return state;
  }

  return state;
};
