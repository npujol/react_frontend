import {
  LOAD_STORY_PAGE,
  UNLOAD_STORY_PAGE,
  DELETE_STORY,
  SET_STORY_FAVORITED_IN_STORY,
  SET_STORY_UNFAVORITED_IN_STORY,
} from "../../constants/actionTypes.js";

import { StoriesApi } from "../../client";
const storiesApi = new StoriesApi();

export const onloadStory = (slug) => {
  return async (dispatch) => {
    const story = await storiesApi.storiesRead(slug);
    const comments = await storiesApi.storiesCommentsList(slug, {
      limit: 10,
      offset: 0,
    });
    const payload = {
      story: story,
      comments: comments,
    };
    dispatch({ type: LOAD_STORY_PAGE, payload });
  };
};

export const unloadStory = () => {
  return { type: UNLOAD_STORY_PAGE };
};

export const storyDelete = (slug) => {
  return async (dispatch) => {
    const data = await storiesApi.storiesDelete(slug);
    const payload = {
      data,
    };
    dispatch({ type: DELETE_STORY, payload });
  };
};

export const setFavorite = (slug) => {
  return async (dispatch) => {
    const data = await storiesApi.storiesFavorite(slug, {});
    const payload = {
      story: data,
    };
    dispatch({ type: SET_STORY_FAVORITED_IN_STORY, payload });
  };
};

export const removeFavorite = (slug) => {
  return async (dispatch) => {
    const data = await storiesApi.storiesUnfavorite(slug, {});
    const payload = {
      story: data,
    };
    dispatch({ type: SET_STORY_UNFAVORITED_IN_STORY, payload });
  };
};
