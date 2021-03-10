import {
  SET_STORY_FAVORITED,
  SET_STORY_UNFAVORITED,
} from "../../constants/actionTypes.js";

import { StoriesApi } from "../../client";
const storiesApi = new StoriesApi();

export const setFavorite = (slug) => {
  return async (dispatch) => {
    const data = await storiesApi.storiesFavorite(slug, {});
    const payload = {
      story: data,
    };
    dispatch({ type: SET_STORY_FAVORITED, payload });
  };
};

export const removeFavorite = (slug) => {
  return async (dispatch) => {
    const data = await storiesApi.storiesUnfavorite(slug, {});
    const payload = {
      story: data,
    };
    dispatch({ type: SET_STORY_UNFAVORITED, payload });
  };
};
