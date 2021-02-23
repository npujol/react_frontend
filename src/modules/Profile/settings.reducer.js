import {
  SAVE_SETTINGS,
  UNLOAD_SETTINGS_PAGE,
  ASYNC_START,
} from "../../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_SETTINGS:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
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
