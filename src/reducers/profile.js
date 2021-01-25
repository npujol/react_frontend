import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  // console.log("profile reducer", action.payload);
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...action.payload[0]
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};
