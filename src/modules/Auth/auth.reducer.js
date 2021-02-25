import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  ASYNC_START,
  UPDATE_FIELD_AUTH,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  UNLOAD_LOGIN_PAGE,
  UNLOAD_REGISTER_PAGE,
  SET_AUTH_LOAD,
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
        token: action.payload.user.token,
        currentUser: action.payload.user.profile,
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
    case SET_AUTH_LOAD:
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.user.profile,
      };
    case LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    case UNLOAD_LOGIN_PAGE:
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1,
        errors: null,
      };
    case UNLOAD_REGISTER_PAGE:
      return {
        ...state,
        viewChangeCounter: state.viewChangeCounter + 1,
        usernameError: null,
        emailError: null,
      };
    default:
      return state;
  }

  return state;
};
