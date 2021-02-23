import {
  LOAD_HOME_PAGE,
  UNLOAD_HOME_PAGE,
  CHANGE_TAB_REDIRECT,
} from "../../constants/actionTypes.js";

import { TagsApi, StoriesApi } from "../../client";
const storiesApi = new StoriesApi();
const tagsApi = new TagsApi();

export const fetchStoriesGlobal = () => {
  return async (dispatch) => {
    const tags = await tagsApi.tagsList();
    const stories = await storiesApi.storiesFeedList({ offset: 0, limit: 10 });
    const payload = [tags, stories];
    dispatch({ type: LOAD_HOME_PAGE, payload });
  };
};
export const fetchStoriesFavorites = (username) => {
  return async (dispatch) => {
    const tags = await tagsApi.tagsList();
    const stories = await storiesApi.storiesList({
      favoritedByUserUsername: username,
      offset: 0,
      limit: 10,
    });
    const payload = [tags, stories];
    dispatch({ type: LOAD_HOME_PAGE, payload });
  };
};

export const fetchStoriesTag = (tag) => {
  return async (dispatch) => {
    const tags = await tagsApi.tagsList();
    const stories = await storiesApi.storiesList({
      tagsTag: tag,
      offset: 0,
      limit: 10,
    });
    const payload = [tags, stories];
    dispatch({ type: LOAD_HOME_PAGE, payload });
  };
};

export const fetchStoriesYours = (username) => {
  return async (dispatch) => {
    const tags = await tagsApi.tagsList();
    const stories = await storiesApi.storiesList({
      ownerUserUsername: username,
      offset: 0,
      limit: 10,
    });
    const payload = [tags, stories];
    dispatch({ type: LOAD_HOME_PAGE, payload });
  };
};

export const unloadHome = () => {
  return { type: UNLOAD_HOME_PAGE };
};

export const changeTabRedirect = (route) => {
  return { type: CHANGE_TAB_REDIRECT, payload: route };
};
