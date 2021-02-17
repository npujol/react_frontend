import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload
          ? action.payload[0].results.map((obj) => obj.tag)
          : [],
        tab: 0,
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
