import { ADD_COMMENT, DELETE_COMMENT } from "../../constants/actionTypes.js";

import { StoriesApi } from "../../client";
const storiesApi = new StoriesApi();

export const addComment = (slug, values) => {
  return async (dispatch) => {
    const comment = await storiesApi.storiesCommentsCreate(slug, values);
    const payload = {
      comment: comment,
    };

    dispatch({ type: ADD_COMMENT, payload });
  };
};

export const removeComment = (id, slug) => {
  return async (dispatch) => {
    await storiesApi.storiesCommentsDelete(id, slug);
    const payload = {
      commentId: id,
    };

    dispatch({ type: DELETE_COMMENT, payload });
  };
};
