import {
  APP_LOAD,
  REDIRECT,
  LOGIN,
  REGISTER,
  LOGOUT,
  STORY_SUBMITTED,
  SETTINGS_SAVED,
  DELETE_STORY,
  STORY_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  CHANGE_TAB,
  CHANGE_TAB_REDIRECT,
} from "../constants/actionTypes";

const defaultState = {
  appName: "My stories",
  token: null,
  viewChangeCounter: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  console.log("payload in common", action.payload);
  switch (action.type) {
    case APP_LOAD:
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
    case STORY_SUBMITTED:
      const redirectUrl = `/story/${action.payload.slug}`;
      return { ...state, redirectTo: redirectUrl };
    case SETTINGS_SAVED:
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
    case STORY_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};
