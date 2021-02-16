import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  STORY_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_STORY,
  STORY_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
} from "../constants/actionTypes";

const defaultState = {
  appName: "My stories",
  token: null,
  viewChangeCounter: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.profile : null,
      };
    case REDIRECT:
      return { ...state, redirectTo: "/" };
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
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error !== undefined ? null : "/",
        token: action.error !== undefined ? null : action.payload.token,
        currentUser: action.error !== undefined ? null : action.payload.profile,
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
