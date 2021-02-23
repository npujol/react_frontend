import {
  LOAD_STORY_PAGE,
  UNLOAD_STORY_PAGE,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  // console.log("storyjs", action.payload);
  switch (action.type) {
    case LOAD_STORY_PAGE:
      return {
        ...state,
        story: action.payload[0] ? action.payload[0] : [],
        comments: action.payload[1] ? action.payload[1].results : [],
      };
    case UNLOAD_STORY_PAGE:
      return {};
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error
          ? null
          : (state.comments || []).concat([action.payload]),
      };
    case DELETE_COMMENT:
      const commentId = action.commentId;
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== commentId),
      };
    default:
      return state;
  }
};
