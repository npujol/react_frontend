import {
  LOAD_STORY_PAGE,
  UNLOAD_STORY_PAGE,
  ADD_COMMENT,
  DELETE_COMMENT,
  SET_STORY_FAVORITED_IN_STORY,
  SET_STORY_UNFAVORITED_IN_STORY,
} from "../../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_STORY_PAGE:
      return {
        ...state,
        story: action.payload.story,
        comments: action.payload.comments.results,
      };
    case UNLOAD_STORY_PAGE:
      return {};
    case ADD_COMMENT:
      state.comments.push(action.payload.comment);

      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: state.comments,
      };
    case DELETE_COMMENT:
      const commentId = action.payload.commentId;
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== commentId),
      };
    case SET_STORY_FAVORITED_IN_STORY:
    case SET_STORY_UNFAVORITED_IN_STORY:
      return {
        ...state,
        story: action.payload.story,
      };
    default:
      return state;
  }
};
