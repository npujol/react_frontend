import {
  LOAD_PROFILE_PAGE,
  UNLOAD_PROFILE_PAGE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  // console.log("profile reducer", action.payload);
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
    default:
      return state;
  }
};
