import { LOAD_HOME_PAGE, UNLOAD_HOME_PAGE } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_HOME_PAGE:
      return {
        ...state,
        tags: action.payload
          ? action.payload[0].results.map((obj) => obj.tag)
          : [],
        tab: 0,
      };
    case UNLOAD_HOME_PAGE:
      return {};
    default:
      return state;
  }
};
