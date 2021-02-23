import {
  LOAD_APP,
  REDIRECT,
  LOGIN,
  REGISTER,
  LOGOUT,
  SUBMIT_STORY,
  SAVE_SETTINGS,
  DELETE_STORY,
  UNLOAD_STORY_PAGE,
  UNLOAD_EDITOR_PAGE,
  UNLOAD_HOME_PAGE,
  UNLOAD_PROFILE_PAGE,
  UNLOAD_PROFILE_FAVORITES_PAGE,
  UNLOAD_SETTINGS_PAGE,
  UNLOAD_LOGIN_PAGE,
  UNLOAD_REGISTER_PAGE,
  CHANGE_TAB_REDIRECT,
} from "../../constants/actionTypes";

const defaultState = {
  appName: "My stories",
  token: null,
  viewChangeCounter: 0,
  offline: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  // console.log("payload in common", action.payload);
  switch (action.type) {
    case LOAD_APP:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.profile : null,
        offline: action.payload ? true : false,
        redirectTo: "/",
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    case SUBMIT_STORY:
      const redirectUrl = `/story/${action.payload.slug}`;
      return { ...state, redirectTo: redirectUrl };
    case SAVE_SETTINGS:
      return {
        ...state,
        redirectTo: action.error !== undefined ? null : "/",
        currentUser: action.error !== undefined ? null : action.payload,
      };
    case CHANGE_TAB_REDIRECT:
      return {
        ...state,
        redirectTo: action.payload.route,
      };
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error !== undefined ? null : "/",
        token: action.error !== undefined ? null : action.payload.token,
        currentUser: action.error !== undefined ? null : action.payload.profile,
        errors: action.error ? action.payload.errors.error : undefined,
        inProgress: true,
      };
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error !== undefined ? null : "/",
        token: action.error !== undefined ? null : action.payload.token,
        currentUser: action.error !== undefined ? null : action.payload.profile,
        usernameError: action.error
          ? action.payload.errors.username
          : undefined,
        emailError: action.error ? action.payload.errors.email : undefined,
        inProgress: true,
      };

    case DELETE_STORY:
      return { ...state, redirectTo: "/" };
    case UNLOAD_STORY_PAGE:
    case UNLOAD_EDITOR_PAGE:
    case UNLOAD_HOME_PAGE:
    case UNLOAD_PROFILE_PAGE:
    case UNLOAD_PROFILE_FAVORITES_PAGE:
    case UNLOAD_SETTINGS_PAGE:
    case UNLOAD_LOGIN_PAGE:
    case UNLOAD_REGISTER_PAGE:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};
