import {
  STORY_PAGE_LOADED,
  STORY_PAGE_UNLOADED,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  // console.log("storyjs", action.payload);
  switch (action.type) {
    case STORY_PAGE_LOADED:
      return {
        ...state,
        story: action.payload[0] ? action.payload[0] : [],
        comments: action.payload[1] ? action.payload[1].results : [],
      };
    case STORY_PAGE_UNLOADED:
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
