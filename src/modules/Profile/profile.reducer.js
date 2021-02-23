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
        ...action.payload[0],
      };
    case UNLOAD_PROFILE_PAGE:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
