import {
  LOAD_PROFILE_PAGE,
  UNLOAD_PROFILE_PAGE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SAVE_SETTINGS_FAILED,
  SAVE_SETTINGS_SUCCESS,
  UNLOAD_SETTINGS_PAGE,
  ASYNC_START,
} from "../../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_PROFILE_PAGE:
      return {
        ...state,
        yoursStories: action.payload
          ? action.payload.yoursStories.results.map((obj) => obj)
          : [],
        favoriteStories: action.payload
          ? action.payload.favoriteStories.results.map((obj) => obj)
          : [],
        profile: action.payload ? action.payload.profile : null,
      };
    case UNLOAD_PROFILE_PAGE:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...state,
        profile: action.payload.profile,
      };
    
    case SAVE_SETTINGS_FAILED:
      return {
        ...state,
        inProgress: false,
        imageError: action.payload.errors.image,
        bioError: action.payload.errors.bio,
        usernameError: action.payload.errors.username,
      };
    case UNLOAD_SETTINGS_PAGE:
      return {};
    case ASYNC_START:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
};
