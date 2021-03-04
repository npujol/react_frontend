import {
  SAVE_STORY_FAILED,
  SAVE_STORY_SUCCESS,
  SAVE_SETTINGS_SUCCESS,
  ADD_TAG,
  LOAD_EDITOR_PAGE,
  REMOVE_TAG,
  SUBMIT_STORY,
  UNLOAD_EDITOR_PAGE,
  REDIRECT,
} from "../../constants/actionTypes.js";

import { StoriesApi } from "../../client";
const storiesApi = new StoriesApi();

export const loadEditor = (slug) => {
  return async (dispatch) => {
    const story = await storiesApi.storiesRead({
      slug,
    });

    const payload = {
      story: story,
    };
    dispatch({ type: LOAD_EDITOR_PAGE, payload });
  };
};

export const unloadEditor = () => {
  return { type: UNLOAD_EDITOR_PAGE };
};

export const createStory = (values) => {
  return async (dispatch) => {
    try {
      const { title, description, body, tagList } = values;

      const data = {
        title: title,
        description: description,
        body_markdown: body,
        tags: tagList,
      };
      const payload = await storiesApi.storiesCreate(data);
      dispatch({ type: SUBMIT_STORY, payload });
    } catch (error) {
      dispatch({
        type: SAVE_STORY_FAILED,
        payload: JSON.parse(error.response.text),
      });
    }
  };
};

export const updateStory = (slug, values) => {
  return async (dispatch) => {
    try {
      const payload = await storiesApi.storiesPartialUpdate(slug, values);
      dispatch({ type: SUBMIT_STORY, payload });
    } catch (error) {
      dispatch({
        type: SAVE_STORY_FAILED,
        payload: JSON.parse(error.response.text),
      });
    }
  };
};
export const saveImage = (slug, image) => {
  return async (dispatch) => {
    const payload = await storiesApi.storiesChangeImage(slug, image);
    dispatch({ type: SAVE_SETTINGS_SUCCESS, payload });
  };
};

export const addTag = () => {
  return async (dispatch) => {
    dispatch({ type: ADD_TAG });
  };
};

export const removeTag = (tag) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_TAG, tag });
  };
};
